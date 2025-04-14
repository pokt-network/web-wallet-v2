import { Link } from "wouter";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PasswordInput } from "@/components/password-input";
import { useCreateWallet } from "@/wallet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage } from "@/components/error-message";

const createWalletSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateWallet = z.infer<typeof createWalletSchema>;

export function CreateWallet(): JSX.Element {
  const createWallet = useCreateWallet();

  const form = useForm<CreateWallet>({
    mode: "all",
    resolver: zodResolver(createWalletSchema),
  });

  return (
    <Container>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const isValid = await form.trigger();

          if (!isValid) {
            return;
          }

          const data = form.getValues();
          await createWallet.mutateAsync({ password: data.password });
        }}
      >
        <Title>Create Wallet</Title>

        <p>Create a passphrase to protect your wallet.</p>

        <div className="flex flex-col gap-2">
          <PasswordInput placeholder="Password" {...form.register("password")} />
          {form.formState.errors.password && (
            <ErrorMessage>{form.formState.errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput placeholder="Confirm password" {...form.register("confirmPassword")} />
          {form.formState.errors.confirmPassword && (
            <ErrorMessage>{form.formState.errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>

        <p>
          Make sure your password has minimum 8 characters, a mixture of letters and numbers
          including at least one uppercase letter and include at least one special character, e.g.,
          ! @ #
        </p>

        <Alert>
          <p className="font-medium">Save your passphrase</p>
          Please back it up securely. It can not be recovered if you lose it.
        </Alert>

        <Button className="w-full" disabled={createWallet.isPending}>
          {createWallet.isPending ? "Creating wallet" : "Create wallet"}
        </Button>

        <p className="text-center">
          Already have a wallet?{" "}
          <Link to="/import" className="text-pocket-blue underline">
            Import Wallet
          </Link>
        </p>
      </form>
    </Container>
  );
}
