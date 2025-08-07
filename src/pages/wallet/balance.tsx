import { useBalance } from "./use-balance";
import { formatPOKT } from "@/utils/format-pokt";

export function Balanace(): React.ReactNode {
  const { data: balance, error, isLoading: balanceIsLoading } = useBalance();

  if (error) {
    return (
      <div className="text-xs text-red-500">
        <p className="font-medium">Error: {error.message}</p>
        <p>Unable to load the balance. Please try importing the wallet again</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-center">Current balance</p>

      {balanceIsLoading || balance === undefined ? (
        <div className="animate-pulse bg-[#ccc] rounded-full h-8 w-64 max-w-full mx-auto" />
      ) : (
        <div className="flex items-center justify-center font-bold">
          <div className="text-5xl">{formatPOKT(balance)}</div>
        </div>
      )}
    </div>
  );
}
