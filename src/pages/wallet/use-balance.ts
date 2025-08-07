import * as RPC from "@/rpc";
import { useWalletStore } from "@/wallet";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

class InvalidWalletState extends Error {
  constructor() {
    super("Invalid wallet state");
  }
}

export function useBalance(): UseQueryResult<bigint, InvalidWalletState> {
  const data = useWalletStore();

  return useQuery({
    queryKey: data.address ? ["balance", data.address] : ["balance"],
    queryFn: async () => {
      if (data.address === null) {
        throw new InvalidWalletState();
      }

      return await RPC.getBalance(data.address);
    },
  });
}
