import React from "react";
import {
  ArrowUpRight,
  Coins,
  FileDown,
  Fingerprint,
  HandCoins,
  Key,
  Landmark,
  LogOut,
  Router,
} from "lucide-react";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Transactions } from "./transactions";
import { Address } from "./address";
import { Balanace } from "./balance";

export function Wallet(): React.ReactNode {
  return (
    <Container>
      <Balanace />
      <Address />

      <div className="flex justify-between w-full gap-4">
        <div className="flex items-center justify-between gap-2 flex-gap">
          <Landmark className="size-5" />
          <div>
            <p className="text-lg font-medium">Unstaked</p>
            <p className="text-xs opacity-80">Staking Status</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 flex-gap">
          <Coins className="size-5" />
          <div>
            <p className="font-mono text-lg font-medium">00.00</p>
            <p className="text-xs opacity-80">POKT Staked</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 flex-gap">
          <Fingerprint className="size-5" />
          <div>
            <p className="text-lg font-medium">None</p>
            <p className="text-xs opacity-80">Account Type</p>
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
