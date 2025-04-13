import * as RPC from "@/rpc";
import { useWalletStore } from "@/wallet";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useTransactions(): UseQueryResult<RPC.TypedTransaction[], Error> {
  const data = useWalletStore();

  return useQuery({
    queryKey: data ? ["transactions", data.address] : ["transactions"],
    queryFn: async () => {
      if (!data) {
        return [];
      }
      return await RPC.getTransactions(data.address);
    },
  });
}
