import React from "react";

import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";

export function PrivateKey(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Private key</p>
        <PasswordInput placeholder="Private key" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Session password</p>
        <PasswordInput placeholder="Session password" />
      </div>

      <p className="text-sm">
        Please create a temporary password to encrypt your private key during this session. It will
        be required to confirm transactions.
      </p>

      <Button className="w-full">Import wallet</Button>
    </div>
  );
}
