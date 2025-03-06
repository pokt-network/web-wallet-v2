import { provider } from "@/rpc";
import { useAccount } from "@/context/account-context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useBalance(): UseQueryResult<bigint, Error> {
  const { account } = useAccount();

  if (account === null) {
    throw new Error("No account");
  }

  const address = account.getAddress();

  return useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      return provider.getBalance(address);
    },
  });
}
