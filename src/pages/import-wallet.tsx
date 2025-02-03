import React from "react";
import { Link } from "wouter";
import { ChevronDown, Eye, Upload } from "lucide-react";

import { Input } from "@/components/input";
import { Title } from "@/components/title";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

export function ImportWallet(): React.ReactNode {
  return (
    <Container>
      <Title>Import Wallet</Title>

      <p className="text-center">Select a method to access your account</p>

      <div className="text-pocket-gray p-4 bg-pocket-gray/5 flex items-center justify-between rounded-lg">
        <div>Portable Private Key</div>
        <ChevronDown className="w-4 h-4" />
      </div>

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
        <div>
          <p className="text-sm text-pocket-gray font-medium">Password</p>
          <div className="relative">
            <Input placeholder="Password" />
            <Eye className="absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 text-pocket-gray/50" />
          </div>
          <p className="text-sm text-pocket-gray pt-2">
            When you created the portable private key, you set a password. Enter it here to import
          </p>
        </div>
        <Button className="w-full">Import wallet</Button>
      </div>

      <div className="text-pocket-gray p-4 bg-pocket-gray/5 hover:bg-pocket-blue hover:text-white duration-300 flex items-center justify-between rounded-lg">
        <div>Private Key</div>
        <ChevronDown className="w-4 h-4" />
      </div>

      <div className="text-pocket-gray p-4 bg-pocket-gray/5 flex items-center justify-between rounded-lg">
        <div>Hardware Wallet (Ledger)</div>
        <ChevronDown className="w-4 h-4" />
      </div>

      <p className="text-center">
        {"Don't have a wallet? "}
        <Link to="/create-wallet" className="text-pocket-blue underline">
          {"Create Wallet"}
        </Link>
      </p>
    </Container>
  );
}
