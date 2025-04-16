// import { usePrice } from "@/use-price";
import { Button } from "@/components/button";
import { formatPOKT } from "@/utils/format-pokt";
import { formatAddress } from "@/utils/format-address";
import { useTransactions } from "./use-transactions";
import { ArrowDownToLine, ArrowUpRight, CircleCheck, Loader2, XCircle } from "lucide-react";
import { TypedTransaction } from "@/rpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { FC, ReactNode } from "react";

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
    <div className="flex flex-col overflow-hidden text-black border rounded-lg bg-pocket-gray/3 border-pocket-gray/10 ">
      <div className="overflow-y-auto max-h-[400px]">
        {transactions.map((transaction, index) => (
          <Transaction key={transaction.hash} transaction={transaction} border={index !== 0} />
        ))}
      </div>
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex  justify-between items-center p-4 cursor-pointer duration-300 hover:bg-white/80 ${
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
                From: {formatAddress(transaction.fromAddress)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium">
              {transaction.type === "recv" ? "" : "-"}
              {formatPOKT(transaction.amount)}
            </p>
            {/* <p className="text-xs text-right text-pocket-gray">
          {isLoading || price === undefined ? "Loading..." : `$${price} USD`}
        </p> */}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Transaction details</DialogTitle>
        </DialogHeader>

        <div className="break-all">
          <div className="flex items-center justify-start gap-2 flex-col">
            <Row label="From:" value={transaction.fromAddress} />
            <Row label="To:" value={transaction.toAddress} />
            <Row
              label="Status:"
              value={
                <div className="flex items-center">
                  {transaction.code === 0 ? (
                    <div className="text-green-500 bg-green-500/10 border border-green-500/50 rounded-lg px-2 py-1 text-xs font-medium w-auto font-sans flex items-center gap-2">
                      <CircleCheck className="size-4" />
                      Success
                    </div>
                  ) : (
                    <div className="text-red-500 bg-red-500/10 border border-red-500/50 rounded-lg px-2 py-1 text-xs font-medium w-auto font-sans flex items-center gap-2">
                      <XCircle className="size-4" />
                      Failed
                    </div>
                  )}
                </div>
              }
            />
            <Row label="Tx hash:" value={transaction.hash} />
            <Row label="Tx index:" value={transaction.txIndex.toString()} />
            <Row label="Height:" value={transaction.height.toLocaleString()} />

            <Row
              label="Gas:"
              value={`${transaction.gasUsed.toLocaleString()} / ${transaction.gasWanted.toLocaleString()}`}
            />
          </div>

          <div className="mt-4">
            <b>Events</b>
            <div className=" rounded overflow-hidden border border-pocket-gray/10 bg-pocket-gray/5">
              <div className="font-mono max-w-full w-full h-64 p-2 text-xs overflow-auto whitespace-break-spaces ">
                {JSON.stringify(transaction.events, null, 2)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Row: FC<{
  label: ReactNode;
  value: ReactNode;
}> = ({ label, value }) => (
  <div className="flex items-center justify-start gap-2 w-full text-sm">
    <div className="w-64 font-medium opacity-80">{label}</div>
    <div className="break-all w-full">{value}</div>
  </div>
);
