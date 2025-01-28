import React from "react";
import {
  ArrowUpRight,
  Coins,
  Copy,
  Eye,
  FileDown,
  Fingerprint,
  HandCoins,
  Landmark,
  LogOut,
  Router,
} from "lucide-react";

import { Button } from "@/components/button";

export function Wallet(): React.ReactNode {
  return (
    <div className="max-w-md w-full mx-auto text-pocket-gray py-16">
      <div className="flex flex-col gap-4 w-full">
        <div className="">
          <p className="opacity-80 text-xs text-center">Current balance</p>
          <div className="font-bold text-center flex gap-2 items-center justify-center">
            <div className="font-mono text-4xl">0.00</div>
            <div className="opacity-80 text-xl">POKT</div>
          </div>
        </div>
        <div className="flex gap-4 w-full justify-between">
          <div className="flex flex-gap items-center justify-between gap-2">
            <Landmark className="w-6 h-6" />
            <div>
              <p className="font-medium text-lg">Unstaked</p>
              <p className="opacity-80 text-xs">Staking Status</p>
            </div>
          </div>

          <div className="flex flex-gap items-center justify-between gap-2">
            <Coins className="w-6 h-6" />
            <div>
              <p className="font-mono font-medium text-lg">00.00</p>
              <p className="opacity-80 text-xs">POKT Staked</p>
            </div>
          </div>

          <div className="flex flex-gap items-center justify-between gap-2">
            <Fingerprint className="w-6 h-6" />
            <div>
              <p className="font-medium text-lg">None</p>
              <p className="opacity-80 text-xs">Account Type</p>
            </div>
          </div>
        </div>

        <Button className="w-full gap-2">
          Send
          <ArrowUpRight className="w-4 h-4" />
        </Button>

        <div className="flex gap-4">
          <Button className="w-full gap-2" variant="outline">
            Stake
            <HandCoins className="w-4 h-4" />
          </Button>
          <Button className="w-full gap-2" variant="outline">
            <p>Manage node</p>
            <Router className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div>
            <div className="p-4 rounded-lg bg-pocket-blue/10 relative">
              <p className="text-xs text-pocket-blue font-medium">Address</p>
              <p className="font-mono">0x1234567890abcdef34567890abcdef</p>
              <Copy className="w-5 h-5 absolute top-1/2 right-6  transform -translate-y-1/2 text-pocket-blue" />
            </div>
          </div>

          <div>
            <div className="p-4 rounded-lg bg-pocket-blue/10 relative">
              <p className="text-xs text-pocket-blue font-medium">Public Key</p>
              <p className="font-mono">0x1234567890abcdef34567890abcdef</p>
              <Copy className="w-5 h-5 absolute top-1/2 right-6  transform -translate-y-1/2 text-pocket-blue" />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="w-full gap-2" variant="outline">
            <p>Reveal private key</p>
            <Eye className="w-4 h-4" />
          </Button>
          <Button className="w-full gap-2" variant="outline">
            <p>Export key file</p>
            <FileDown className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-pocket-gray p-4 bg-pocket-gray/5 flex items-center justify-center rounded-lg">
          <div className="flex flex-col">
            <p className="font-medium">No transactions found</p>
            <p>Once you start making transactions, they will appear here.</p>
          </div>
        </div>
        <Button className="gap-2" variant="yellow">
          Logout
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
