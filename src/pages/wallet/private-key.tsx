import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { ReactNode, useEffect, useState } from "react";
import { Loader2, LockOpen } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/error-message";
import { toast } from "sonner";
import { usePrivateKey, WalletSecret } from "@/wallet";

const showPrivateKeySchema = z.object({
  password: z.string(),
});

type SendForm = z.infer<typeof showPrivateKeySchema>;

export function ShowPrivateKey(): ReactNode {
  const showPrivateKey = usePrivateKey();

  const [open, setOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState<WalletSecret | null>(null);

  const form = useForm<SendForm>({
    resolver: zodResolver(showPrivateKeySchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (open) {
      setPrivateKey(null);
      form.reset();
      showPrivateKey.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2" variant="ghost">
          Show private Key
          <LockOpen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md">
        <DialogHeader>
          {privateKey ? (
            <DialogTitle>Your Private Key</DialogTitle>
          ) : (
            <DialogTitle>Show Private Key</DialogTitle>
          )}
        </DialogHeader>

        {showPrivateKey.error && (
          <div className="bg-red-50 p-4 rounded text-xs text-red-500 break-all">
            {showPrivateKey.error.message}
          </div>
        )}

        {privateKey ? (
          <div>
            <div className="text-sm bg-pocket-gray/10 rounded p-4 font-mono">
              {privateKey.value}
            </div>
            <Button
              className="w-full gap-2 mt-4"
              onClick={() => {
                navigator.clipboard.writeText(privateKey.value);
                toast.success("Private key copied to clipboard");
              }}
            >
              Copy Private Key
            </Button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(async (data) => {
              try {
                const result = await showPrivateKey.mutateAsync(data);
                setPrivateKey(result);
              } catch {
                toast.error("Failed to display private key");
              }
            })}
          >
            <div className="flex flex-col gap-2">
              <label className="block">
                <span className="text-sm font-medium text-pocket-gray">Password</span>
                <p className="text-xs text-pocket-gray">
                  The password you set when creating/importing your wallet.
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

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={showPrivateKey.isPending || !form.formState.isValid}
            >
              {showPrivateKey.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Show Private Key"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
