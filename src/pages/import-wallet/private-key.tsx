import React from "react";
import { Eye } from "lucide-react";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function PrivateKey(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Private key</p>
        <div className="relative">
          <Input placeholder="Private key" />
          <Eye className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 text-pocket-gray/50" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Session password</p>
        <div className="relative">
          <Input placeholder="Session password" />
          <Eye className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 text-pocket-gray/50" />
        </div>
      </div>

      <p className="text-sm">
        Please create a temporary password to encrypt your private key during this session. It will
        be required to confirm transactions.
      </p>

      <Button className="w-full">Import wallet</Button>
    </div>
  );
}
