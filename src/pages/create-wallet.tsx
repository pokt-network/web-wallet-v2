import { Link } from "wouter";
import { useState } from "react";
import { navigate } from "wouter/use-browser-location";

import { Input } from "@/components/input";
import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { useAccount } from "@/context/account-context";
import { KeyManager } from "@pokt-foundation/pocketjs-signer";

export function CreateWallet(): JSX.Element {
  const { setAccount, setPortablePrivateKey } = useAccount();

  const [password, setPassword] = useState("");
  const [creatingWallet, setCreatingWallet] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function createWallet(): Promise<void> {
    setCreatingWallet(true);

    const account = await KeyManager.createRandom();
    const portablePrivateKey = await account.exportPPK({ password });
    setAccount(account);
    setPortablePrivateKey(portablePrivateKey);

    setCreatingWallet(false);
    navigate("/download-wallet");
  }

  return (
    <div className="max-w-md mx-auto text-pocket-gray flex flex-col gap-4">
      <Title>Create Wallet</Title>

      <p>Create a passphrase to protect your wallet.</p>

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Input
        type="password"
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

      <Button className="w-full" onClick={createWallet} disabled={creatingWallet}>
        {creatingWallet ? "Creating wallet" : "Create wallet"}
      </Button>

      <p className="text-center">
        Already have a wallet?{" "}
        <Link to="/import" className="text-pocket-blue underline">
          Import Wallet
        </Link>
      </p>
    </div>
  );
}
