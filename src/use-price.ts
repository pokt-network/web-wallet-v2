import { UPOKT } from "@/utils/format-pokt";
import { usePOKTPrice } from "./use-pokt-price";

export function usePrice({ uPOKT }: { uPOKT: bigint }): {
  price: string | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  const { data: poktPrice, isLoading, error } = usePOKTPrice();

  let price;

  if (poktPrice !== undefined) {
    const pokt = Number(uPOKT / UPOKT);
    price = (pokt * poktPrice).toLocaleString();
  }

  return {
    price,
    isLoading,
    error,
  };
}
