import { usePrice } from "@/use-price";
import { useBalance } from "./use-balance";
import { formatPOKT } from "@/utils/format-pokt";

export function Balanace(): React.ReactNode {
  const { data: balance, isLoading: balanceIsLoading } = useBalance();
  const { price, isLoading: priceIsLoading } = usePrice({ uPOKT: balance || BigInt(0) });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-xs text-center">Current balance</p>
        {balanceIsLoading || balance === undefined ? (
          <div className="animate-pulse bg-[#ccc] rounded-full h-8 w-64 max-w-full mx-auto" />
        ) : (
          <div className="flex items-center justify-center gap-2 font-bold text-center">
            <div className="text-5xl">{formatPOKT(balance)}</div>
            <div className="font-mono text-2xl">POKT</div>
          </div>
        )}
      </div>

      {priceIsLoading || price === undefined ? (
        <div className="animate-pulse bg-[#ccc] rounded-full h-3 w-32 mx-auto" />
      ) : (
        <div className="flex items-center justify-center font-medium">${price} USD</div>
      )}
    </div>
  );
}
