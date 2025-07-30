import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { FC, ReactNode, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "@/env";

import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import { SigningStargateClient, coins, DeliverTxResponse, GasPrice } from "@cosmjs/stargate";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useWalletStore } from "@/wallet";
import { ErrorMessage } from "@/components/error-message";
import { toast } from "sonner";
import * as WalletEncryption from "../../wallet-encryption";
import { fromHex } from "@cosmjs/encoding";

const sendSchema = z.object({
  address: z.string().min(1, "Address is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0")
    .safe(),
  password: z.string(),
  memo: z.string().optional(),
});

type SendForm = z.infer<typeof sendSchema>;

export function Send(): ReactNode {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<SendForm>({
    mode: "all",
    resolver: zodResolver(sendSchema),
    defaultValues: {
      address: "",
      amount: 0,
      memo: "",
      password: "",
    },
  });

  const send = useSendTransaction({
    onSuccess: () => {
      toast.success("Transaction sent successfully");
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          Send
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md">
        <DialogHeader>
          <DialogTitle>Send</DialogTitle>
        </DialogHeader>

        {send.error && (
          <div className="bg-red-50 p-4 rounded text-xs text-red-500 break-all">
            {send.error.message}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div className="flex flex-col gap-2">
            <label className="block">
              <span className="text-sm font-medium text-pocket-gray">Address</span>
              <p className="text-xs text-pocket-gray">
                The address you want to send POKT to. Make sure it is correct.
              </p>
            </label>
            <Input
              placeholder="Enter the address"
              {...form.register("address")}
              className={form.formState.errors.address ? "border-red-500" : ""}
            />
            {form.formState.errors.address && (
              <ErrorMessage>{form.formState.errors.address.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="block">
              <span className="text-sm font-medium text-pocket-gray">Amount</span>
              <p className="text-xs text-pocket-gray">The amount of POKT you want to send.</p>
            </label>
            <Input
              placeholder="Enter the amount"
              {...form.register("amount", {
                valueAsNumber: true,
              })}
              className={form.formState.errors.amount ? "border-red-500" : ""}
            />
            {form.formState.errors.amount && (
              <ErrorMessage>{form.formState.errors.amount.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="block">
              <span className="text-sm font-medium text-pocket-gray">Password</span>
              <p className="text-xs text-pocket-gray">
                The password you set when creating the wallet.
              </p>
            </label>
            <Input
              type="password"
              placeholder="Enter the password"
              {...form.register("password")}
              className={form.formState.errors.password ? "border-red-500" : ""}
            />
            {form.formState.errors.password && (
              <ErrorMessage>{form.formState.errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="block">
              <span className="text-sm font-medium text-pocket-gray">Memo</span>
              <p className="text-xs text-pocket-gray">A memo to include with the transaction.</p>
            </label>
            <Input
              placeholder="Enter the memo"
              {...form.register("memo")}
              className={form.formState.errors.memo ? "border-red-500" : ""}
            />
            {form.formState.errors.memo && (
              <ErrorMessage>{form.formState.errors.memo.message}</ErrorMessage>
            )}
          </div>

          <ConfirmSendButton
            isValid={form.formState.isValid}
            isPending={send.isPending}
            address={form.watch("address")}
            amount={form.watch("amount")}
            memo={form.watch("memo")}
            onClick={async () => {
              const formIsValid = await form.trigger();

              if (send.isPending) {
                toast.error("Transaction is already pending");
                return;
              }

              if (!formIsValid) {
                toast.error("Please fill in all required fields");
                return;
              }

              const data = form.getValues();

              send.mutate({
                amount: data.amount,
                toAddress: data.address,
                memo: data.memo,
                password: data.password,
              });
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

const ConfirmSendButton: FC<{
  isValid: boolean;
  isPending: boolean;
  address: string;
  amount: number;
  memo?: string;
  onClick: () => void;
}> = ({ isPending, isValid, address, amount, memo, onClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="submit" className="w-full gap-2" disabled={!isValid || isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Send
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Transaction</DialogTitle>
        </DialogHeader>

        <div className="text-sm w-full">
          <p className="text-pocket-gray">
            You are about to send <span className="font-bold">{amount} POKT</span> to:
          </p>
          <div className="flex items-center justify-center">
            <input
              className="text-pocket-gray px-2 font-mono border rounded-md border-pocket-gray/20 w-full bg-pocket-gray/5 h-10"
              value={address}
              readOnly
            />
          </div>
          {memo && <p className="text-pocket-gray">Memo: {memo}</p>}
        </div>

        <Button
          type="submit"
          className="w-full gap-2"
          disabled={isPending || !isValid}
          onClick={(event) => {
            setOpen(false);
            event.preventDefault();
            event.stopPropagation();
            setTimeout(() => onClick());
          }}
        >
          Send
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export function useSendTransaction({
  onSuccess,
}: {
  onSuccess?: () => void;
}): UseMutationResult<DeliverTxResponse, Error, SendTransaction> {
  return useMutation({
    mutationFn: sendTransaction,
    onSuccess,
    onError: (error) => {
      toast.error("Transaction failed: " + error.message);
      console.error("Transaction failed:", error);
    },
    retry: false,
  });
}

type SendTransaction = {
  amount: number;
  toAddress: string;
  memo?: string;
  password: string;
};

async function sendTransaction({
  amount,
  toAddress,
  memo,
  password,
}: SendTransaction): Promise<DeliverTxResponse> {
  const walletState = useWalletStore.getState();

  if (walletState.serializedWallet === null) {
    throw new Error("No wallet found");
  }

  let wallet: OfflineSigner;

  if (walletState.type === "hd") {
    wallet = await DirectSecp256k1HdWallet.deserialize(walletState.serializedWallet, password);
  } else if (walletState.type === "private-key") {
    const privateKey = await WalletEncryption.decrypt(walletState.serializedWallet, password);
    wallet = await DirectSecp256k1Wallet.fromKey(fromHex(privateKey), "pokt");
  } else {
    throw new Error("Unsupported wallet type");
  }

  const client = await SigningStargateClient.connectWithSigner(env.RPC_URL, wallet, {
    gasPrice: GasPrice.fromString("0.001upokt"),
  });

  const sendMessage = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: walletState.address,
      toAddress,
      amount: coins(amount * 1_000_000, "upokt"),
    },
  };

  const result = await client.signAndBroadcast(walletState.address, [sendMessage], "auto", memo);

  if (result.code === 0) {
    return result;
  } else {
    throw new Error(`Transaction failed: ${JSON.stringify(result.events, null, 2)}`);
  }
}
