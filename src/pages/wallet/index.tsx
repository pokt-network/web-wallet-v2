import React from "react";
import {
  ArrowUpRight,
  Coins,
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
import { usePrice } from "@/use-price";
import { formatPOKT } from "@/utils/format-pokt";
import { Address } from "./address";

export function Wallet(): React.ReactNode {
  const { data, isLoading } = useBalance();
  const { price, isLoading: priceIsLoading } = usePrice({ uPOKT: data || BigInt(0) });

  return (
    <Container>
      <div>
        <div>
          <p className="opacity-80 text-xs text-center">Current balance</p>
          {isLoading || data === undefined ? (
            <div className="flex items-center justify-center h-16">
              <Loader2 className="size-8 animate-spin" />
            </div>
          ) : (
            <div className="font-bold text-center flex gap-2 items-center justify-center">
              <div className="text-5xl">{formatPOKT(data)}</div>
              <div className="text-2xl font-mono">POKT</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center font-medium">
          ${priceIsLoading ? <Loader2 className="size-4 animate-spin" /> : price} USD
        </div>
      </div>

      <Address />

      <div className="flex gap-4 w-full justify-between">
        <div className="flex flex-gap items-center justify-between gap-2">
          <Landmark className="size-5" />
          <div>
            <p className="font-medium text-lg">Unstaked</p>
            <p className="opacity-80 text-xs">Staking Status</p>
          </div>
        </div>

        <div className="flex flex-gap items-center justify-between gap-2">
          <Coins className="size-5" />
          <div>
            <p className="font-mono font-medium text-lg">00.00</p>
            <p className="opacity-80 text-xs">POKT Staked</p>
          </div>
        </div>

        <div className="flex flex-gap items-center justify-between gap-2">
          <Fingerprint className="size-5" />
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
