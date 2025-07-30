import React, { useState } from "react";

import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { useImportWalletMnemonic } from "@/wallet";
import { Loader2 } from "lucide-react";

export function MnemonicImport(): React.ReactNode {
  const importWallet = useImportWalletMnemonic();

  const [state, setState] = useState({
    mnemonic: "",
    sessionPassword: "",
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Mnemonic</p>
        <PasswordInput
          placeholder="Mnemonic"
          value={state.mnemonic}
          onChange={(event) => setState({ ...state, mnemonic: event.target.value })}
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
        disabled={!state.mnemonic || !state.sessionPassword || importWallet.isPending}
        onClick={async () => {
          importWallet.mutate({
            mnemonic: state.mnemonic,
            password: state.sessionPassword,
          });
        }}
      >
        {importWallet.isPending ? <Loader2 className="size-6 animate-spin" /> : "Import Wallet"}
      </Button>
    </div>
  );
}
