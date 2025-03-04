import { provider, Transaction } from "@/rpc";
import { useAccount } from "@/context/account-context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

enum TransactionType {
  sent = "sent",
  received = "received",
}

type TransactionWithType = Transaction & { type: TransactionType };

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
    type: TransactionType.received,
  }));

  const sentTransactions = sent.txs.map((transaction) => ({
    ...transaction,
    type: TransactionType.sent,
  }));

  const transactions = [...receivedTransactions, ...sentTransactions];
  return transactions.sort((a, b) => b.height - a.height);
}

export function useTransactions(): UseQueryResult<TransactionWithType[], Error> {
  const { account } = useAccount();

  if (account === null) {
    throw new Error("No account");
  }

  const address = account.getAddress();

  return useQuery({
    queryKey: ["transactions", address],
    queryFn: async () => getTransactions(address),
  });
}
