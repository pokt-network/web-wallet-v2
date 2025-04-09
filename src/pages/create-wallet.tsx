import { Link } from "wouter";
import { useState } from "react";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PasswordInput } from "@/components/password-input";
import { useCreateWallet } from "@/wallet";

export function CreateWallet(): JSX.Element {
  const createWallet = useCreateWallet();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container>
      <Title>Create Wallet</Title>

      <p>Create a passphrase to protect your wallet.</p>

      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <PasswordInput
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      <p>
        Make sure your password has minimum 8 characters, a mixture of letters and numbers including
        at least one uppercase letter and include at least one special character, e.g., ! @ #
      </p>

      <Alert>
        <p className="font-medium">Save your passphrase</p>
        Please back it up securely. It can not be recovered if you lose it.
      </Alert>

      <Button
        className="w-full"
        disabled={createWallet.isPending}
        onClick={() => createWallet.mutate({ password })}
      >
        {createWallet.isPending ? "Creating wallet" : "Create wallet"}
      </Button>

      <p className="text-center">
        Already have a wallet?{" "}
        <Link to="/import" className="text-pocket-blue underline">
          Import Wallet
        </Link>
      </p>
    </Container>
  );
}
