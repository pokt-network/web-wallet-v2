import React, { useState } from "react";

import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { useImportWallet } from "@/wallet";
import { Loader2 } from "lucide-react";

export function PrivateKey(): React.ReactNode {
  const importWallet = useImportWallet();

  const [state, setState] = useState({
    privateKey: "",
    sessionPassword: "",
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Private key</p>
        <PasswordInput
          placeholder="Private key"
          value={state.privateKey}
          onChange={(event) => setState({ ...state, privateKey: event.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Session password</p>
        <PasswordInput
          placeholder="Session password"
          value={state.sessionPassword}
          onChange={(event) => setState({ ...state, sessionPassword: event.target.value })}
        />
      </div>

      <p className="text-sm">
        Please create a temporary password to encrypt your private key during this session. It will
        be required to confirm transactions.
      </p>

      {importWallet.error && <p className="text-sm text-red-500">{importWallet.error.message}</p>}

      <Button
        className="w-full"
        disabled={!state.privateKey || !state.sessionPassword || importWallet.isPending}
        onClick={async () => {
          importWallet.mutate({
            privateKey: state.privateKey,
            password: state.sessionPassword,
          });
        }}
      >
        {importWallet.isPending ? <Loader2 className="size-6 animate-spin" /> : "Import Wallet"}
      </Button>
    </div>
  );
}
