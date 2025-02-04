import React from "react";
import { Eye, Upload } from "lucide-react";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function PortablePrivateKey(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center text-left gap-8 p-8 border border-pocket-blue/20 bg-pocket-blue/5 rounded-md border-dashed">
        <div>
          <Upload className="w-8 h-8 text-pocket-blue" />
        </div>

        <p className="text-sm mx-auto">
          Drag and drop your portable private key file here or{" "}
          <span className="text-pocket-blue underline">click here</span> to browse your files.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Password</p>
        <div className="relative">
          <Input placeholder="Password" />
          <Eye className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 text-pocket-gray/50" />
        </div>
      </div>

      <p className="text-sm pt-2">
        When you created the portable private key, you set a password. Enter it here to import
      </p>

      <Button className="w-full">Import wallet</Button>
    </div>
  );
}
