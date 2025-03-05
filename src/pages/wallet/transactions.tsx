import { Button } from "@/components/button";
import { formatPOKT } from "@/utils/format-pokt";
import { formatAddress } from "@/utils/format-address";
import { TransactionType, useTransactions } from "./use-transactions";
import { ArrowDownToLine, ArrowUpRight, Loader2 } from "lucide-react";

export function Transactions(): React.ReactNode {
  const { data: transactions, error, isLoading, refetch } = useTransactions();

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100/50 rounded-lg flex items-center gap-4">
        <div className="w-full">
          <p>An error occurred while fetching transactions:</p>
          <p>
            <b>{error.name}:</b> {error.message}
          </p>
        </div>
        <Button variant="red" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-16">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
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
          <Transaction
            key={transaction.hash}
            type={transaction.type}
            amount={transaction.stdTx.msg.value.amount}
            from={transaction.stdTx.msg.value.from_address}
            border={index !== 0}
          />
        );
      })}
    </div>
  );
}

function Transaction({
  type,
  amount,
  from,
  border,
}: {
  type: TransactionType;
  amount: bigint;
  from: string;
  border: boolean;
}): React.ReactNode {
  return (
    <div
      className={`flex justify-between items-center p-4 cursor-pointer duration-300 hover:bg-white/80 ${
        border ? "border-t border-pocket-gray/10" : ""
      }`}
    >
      <div className="flex gap-4 items-center">
        {type === "received" ? (
          <ArrowDownToLine className="size-6" />
        ) : (
          <ArrowUpRight className="size-6" />
        )}

        <div>
          <p className="text-xs font-medium capitalize">{type}</p>
          <p className="text-xs truncate max-w-32 text-pocket-gray">
            From: {<span className="hover:text-pocket-blue">{formatAddress(from)}</span>}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium">
          {type === "received" ? "" : "-"}
          {formatPOKT(amount)} POKT
        </p>
        <p className="text-xs text-pocket-gray text-right">$1,000.00 USD</p>
      </div>
    </div>
  );
}
