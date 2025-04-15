import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { ReactNode } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { env } from "@/env";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient, coins, DeliverTxResponse } from "@cosmjs/stargate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useWalletStore } from "@/wallet";
import { ErrorMessage } from "@/components/error-message";

const sendSchema = z.object({
  address: z.string().min(1, "Address is required"),
  amount: z.number().positive().int().min(1, "Amount must be greater than 0"),
  password: z.string(),
  memo: z.string().optional(),
});

type SendForm = z.infer<typeof sendSchema>;

export function Send(): ReactNode {
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

  const send = useSendTransaction();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          Send
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
          onSubmit={async (e) => {
            e.preventDefault();
            const data = form.getValues();

            send.mutate({
              amount: data.amount,
              toAddress: data.address,
              memo: data.memo,
              password: data.password,
            });
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
              type="number"
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

          <Button
            className="w-full gap-2"
            type="submit"
            disabled={!form.formState.isValid || send.isPending}
          >
            {send.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Send
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function useSendTransaction(): UseMutationResult<DeliverTxResponse, Error, SendTransaction> {
  return useMutation({
    mutationFn: sendTransaction,
    onSuccess: () => {
      console.log("Transaction sent successfully");
    },
    onError: (error) => {
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

  const wallet = await DirectSecp256k1HdWallet.deserialize(walletState.serializedWallet, password);

  const client = await SigningStargateClient.connectWithSigner(env.RPC_URL, wallet);

  const fee = {
    amount: coins(200, "upokt"),
    gas: "200000",
  };

  const sendMessage = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: walletState.address,
      toAddress,
      amount: coins(amount * 1_000_000, "upokt"),
    },
  };

  const result = await client.signAndBroadcast(walletState.address, [sendMessage], fee, memo);

  if (result.code === 0) {
    return result;
  } else {
    throw new Error(`Transaction failed: ${JSON.stringify(result.events, null, 2)}`);
  }
}
