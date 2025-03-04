import React from "react";
import {
  ArrowUpRight,
  Coins,
  Copy,
  FileDown,
  Fingerprint,
  HandCoins,
  Key,
  Landmark,
  Loader2,
  LogOut,
  Router,
} from "lucide-react";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { useBalance } from "./use-balance";
import { Transactions } from "./transactions";

export function Wallet(): React.ReactNode {
  const { data, isLoading } = useBalance();

  return (
    <Container>
      <div>
        <p className="opacity-80 text-xs text-center">Current balance</p>
        {isLoading ? (
          <div className="flex items-center justify-center h-16">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : (
          <div className="font-bold text-center flex gap-2 items-center justify-center">
            <div className="text-4xl">{data}</div>
            <div className="text-xl">POKT</div>
          </div>
        )}
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
          <p>Private key</p>
          <Key className="w-4 h-4" />
        </Button>
        <Button className="w-full gap-2" variant="outline">
          <p>Export key file</p>
          <FileDown className="w-4 h-4" />
        </Button>
      </div>

      <Transactions />

      <Button className="gap-2" variant="yellow">
        Logout
        <LogOut className="w-4 h-4" />
      </Button>
    </Container>
  );
}
