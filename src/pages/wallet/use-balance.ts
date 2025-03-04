import { provider } from "@/rpc";
import { formatPOKT } from "@/utils/format-pokt";
import { useAccount } from "@/context/account-context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useBalance(): UseQueryResult<string, Error> {
  const { account } = useAccount();

  if (account === null) {
    throw new Error("No account");
  }

  const address = account.getAddress();

  return useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      const balance = await provider.getBalance(address);
      return formatPOKT(balance);
    },
  });
}
