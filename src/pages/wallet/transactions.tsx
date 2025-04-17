// import { usePrice } from "@/use-price";
import { Button } from "@/components/button";
import { formatPOKT } from "@/utils/format-pokt";
import { formatAddress } from "@/utils/format-address";
import { useTransactions } from "./use-transactions";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CircleCheck,
  ExternalLink,
  Loader2,
  XCircle,
} from "lucide-react";
import { TypedTransaction } from "@/rpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { FC, ReactNode } from "react";
import { useBlock } from "@/hooks/use-block";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { secondsToTimeString } from "@/utils/seconds-to-time-string";

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
  const { data: block } = useBlock({ height: transaction.height });

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
      <DialogContent className="max-w-4xl max-h-[100dvh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Transaction details</DialogTitle>
        </DialogHeader>

        <div className="break-all">
          <div className="flex flex-col items-center justify-start gap-4 md:gap-2">
            <Row
              label="From:"
              value={
                <div className="flex items-center gap-2 font-mono">
                  {transaction.fromAddress}
                  <CopyToClipboard value={transaction.fromAddress} />
                </div>
              }
            />
            <Row
              label="To:"
              value={
                <div className="flex items-center gap-2 font-mono">
                  {transaction.toAddress}
                  <CopyToClipboard value={transaction.toAddress} />
                </div>
              }
            />
            <Row
              label="Status:"
              value={
                <div className="flex items-center">
                  {transaction.code === 0 ? (
                    <div className="flex items-center w-auto gap-2 px-2 py-1 font-sans text-xs font-medium text-pocket-blue border rounded-lg bg-pocket-blue/10 border-pocket-blue/50">
                      <CircleCheck className="size-4" />
                      Success
                    </div>
                  ) : (
                    <div className="flex items-center w-auto gap-2 px-2 py-1 font-sans text-xs font-medium text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
                      <XCircle className="size-4" />
                      Failed
                    </div>
                  )}
                </div>
              }
            />
            <Row label="Height:" value={transaction.height.toLocaleString()} />
            {block && (
              <Row
                label="Time:"
                value={
                  <div className="flex items-center gap-2">
                    {secondsToTimeString(
                      (Date.now() - new Date(block.header.time).getTime()) / 1000
                    )}
                    {" ago"}
                    <div>
                      {`(${new Date(block.header.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })})`}
                    </div>
                  </div>
                }
              />
            )}

            <Row
              label="Tx hash:"
              value={
                <div className="flex items-center gap-2 font-mono">
                  {transaction.hash}
                  <CopyToClipboard value={transaction.hash} />
                </div>
              }
            />
            <Row label="Tx index:" value={transaction.txIndex.toString()} />

            <Row
              label="Gas:"
              value={
                <div className="flex items-center gap-2">
                  {`${transaction.gasUsed.toLocaleString()} / ${transaction.gasWanted.toLocaleString()}`}
                  <ProgressBar
                    progress={(Number(transaction.gasUsed) / Number(transaction.gasWanted)) * 100}
                  />
                </div>
              }
            />
          </div>

          <div className="mt-4">
            <b>Events</b>
            <div className="overflow-hidden border rounded border-pocket-gray/10 bg-pocket-gray/5">
              <div className="w-full h-64 max-w-full p-2 overflow-auto font-mono text-xs whitespace-break-spaces ">
                {JSON.stringify(transaction.events, null, 2)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end w-full mt-6">
            <a
              href={`https://shannon.beta.testnet.pokt.network/pocket-beta/tx/${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-pocket-blue underline"
            >
              View in explorer
              <ExternalLink className="size-4" />
            </a>
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
  <div className="flex flex-col items-center justify-start w-full text-sm md:gap-2 md:flex-row">
    <div className="w-full font-medium md:w-64 opacity-80">{label}</div>
    <div className="w-full break-all">{value}</div>
  </div>
);

const ProgressBar: FC<{
  progress: number;
}> = ({ progress }) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-32 h-2 overflow-hidden rounded bg-pocket-gray/10">
        <div
          className="absolute top-0 left-0 h-full bg-pocket-blue"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-xs font-medium text-pocket-blue">{progressPercentage.toFixed(2)}%</div>
    </div>
  );
};
