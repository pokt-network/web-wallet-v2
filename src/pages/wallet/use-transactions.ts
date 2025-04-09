import * as RPC from "@/rpc";
import { useAccount } from "@/wallet";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useTransactions(): UseQueryResult<RPC.TypedTransaction[], Error> {
  const { data } = useAccount();

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
