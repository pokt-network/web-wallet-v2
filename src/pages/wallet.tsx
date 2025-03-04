import React, { useEffect, useState } from "react";
import {
  ArrowDownToLine,
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
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { provider, Transaction } from "@/rpc";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { useAccount } from "@/context/account-context";
import { formatPOKT } from "@/utils/format-pokt";
import { formatAddress } from "@/utils/format-address";

function useBalance(): UseQueryResult<string, Error> {
  const { account } = useAccount();

  if (account === null) {
    throw new Error("No account");
  }

  const address = account.getAddress();

  return useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      const balance = await provider.getBalance(address);
      return formatPOKT(balance);
    },
  });
}

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

type TransactionWithType = Transaction & { type: "received" | "sent" };
async function getTransactions(address: string): Promise<TransactionWithType[]> {
  const [received, sent] = await Promise.all([
    provider.getTransactions({
      address,
      page: 0,
      per_page: 10,
      received: true,
      order: "desc",
    }),
    provider.getTransactions({
      address,
      page: 0,
      per_page: 10,
      received: false,
      order: "desc",
    }),
  ]);

  const receivedTransactions = received.txs.map((transaction) => ({
    ...transaction,
    type: "received" as const,
  }));

  const sentTransactions = sent.txs.map((transaction) => ({
    ...transaction,
    type: "sent" as const,
  }));

  const transactions = [...receivedTransactions, ...sentTransactions];
  return transactions.sort((a, b) => b.height - a.height);
}

function Transactions(): React.ReactNode {
  const { account } = useAccount();
  const [transactions, setTransactions] = useState<TransactionWithType[] | null>(null);

  useEffect(() => {
    if (!account) return;

    getTransactions(account.getAddress()).then((result) => setTransactions(result));
  }, [account]);

  if (!transactions) {
    return (
      <div className="text-pocket-gray p-4 bg-pocket-gray/5 flex items-center justify-center rounded-lg">
        <div className="flex flex-col">
          <p className="font-medium">No transactions found</p>
          <p>Once you start making transactions, they will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-col bg-pocket-gray/3 rounded-lg border border-pocket-gray/10 overflow-hidden">
      {transactions.map((transaction, index) => {
        if (transaction.stdTx.msg.type !== "pos/Send") {
          return null;
        }

        return (
          <div
            key={transaction.hash}
            className={`flex justify-between items-center p-4 cursor-pointer duration-300 hover:bg-white/80 ${
              index === 0 ? "" : "border-t border-pocket-gray/10"
            }`}
          >
            <div className="flex gap-4 items-center">
              {transaction.type === "received" ? (
                <ArrowDownToLine className="w-6 h-6e" />
              ) : (
                <ArrowUpRight className="w-6 h-6" />
              )}

              <div className="flex flex-col">
                <p className="text-xs font-medium capitalize">{transaction.type}</p>
                <p className="text-xs truncate max-w-32 text-pocket-gray">
                  From:{" "}
                  {
                    <span className="hover:text-pocket-blue cursor-pointer">
                      {formatAddress(transaction.stdTx.msg.value.from_address)}
                    </span>
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-medium">
                {transaction.type === "received" ? "" : "-"}
                {formatPOKT(transaction.stdTx.msg.value.amount)} POKT
              </p>
              <p className="text-xs text-pocket-gray text-right">$1,000.00 USD</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
