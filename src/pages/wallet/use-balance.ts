import * as RPC from "@/rpc";
import { useWalletStore } from "@/wallet";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useBalance(): UseQueryResult<bigint, Error> {
  const data = useWalletStore();

  return useQuery({
    queryKey: data ? ["balance", data.address] : ["balance"],
    queryFn: async () => {
      if (!data) {
        return null;
      }

      return await RPC.getBalance(data.address);
    },
  });
}
