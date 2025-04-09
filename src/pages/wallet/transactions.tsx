// import { usePrice } from "@/use-price";
import { Button } from "@/components/button";
import { formatPOKT } from "@/utils/format-pokt";
import { formatAddress } from "@/utils/format-address";
import { useTransactions } from "./use-transactions";
import { ArrowDownToLine, ArrowUpRight, Loader2 } from "lucide-react";
import { TypedTransaction } from "@/rpc";

export function Transactions(): React.ReactNode {
  const { data: transactions, error, isLoading, refetch } = useTransactions();

  if (error) {
    return (
      <div className="flex items-center gap-4 p-4 text-red-500 rounded-lg bg-red-100/50">
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
      <div className="flex items-center justify-center p-4 rounded-lg text-pocket-gray bg-pocket-gray/5">
        <div className="flex flex-col">
          <p className="font-medium">No transactions found</p>
          <p>Once you start making transactions, they will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden text-black border rounded-lg bg-pocket-gray/3 border-pocket-gray/10">
      {transactions.map((transaction, index) => {
        return (
          <Transaction key={transaction.hash} transaction={transaction} border={index !== 0} />
        );
      })}
    </div>
  );
}

function Transaction({
  transaction,
  border,
}: {
  transaction: TypedTransaction;
  border: boolean;
}): React.ReactNode {
  // const { price, isLoading } = usePrice({ uPOKT: amount });

  return (
    <div
      className={`flex justify-between items-center p-4 cursor-pointer duration-300 hover:bg-white/80 ${
        border ? "border-t border-pocket-gray/10" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {transaction.type === "recv" ? (
          <ArrowDownToLine className="size-6" />
        ) : (
          <ArrowUpRight className="size-6" />
        )}

        <div>
          <p className="text-xs font-medium capitalize">{transaction.type}</p>
          <p className="text-xs truncate max-w-32 text-pocket-gray">
            From:{" "}
            {
              <span className="hover:text-pocket-blue">
                {formatAddress(transaction.fromAddress)}
              </span>
            }
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium">
          {transaction.type === "recv" ? "" : "-"}
          {formatPOKT(transaction.amount)} POKT
        </p>
        {/* <p className="text-xs text-right text-pocket-gray">
          {isLoading || price === undefined ? "Loading..." : `$${price} USD`}
        </p> */}
      </div>
    </div>
  );
}
