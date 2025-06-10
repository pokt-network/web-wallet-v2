export const UPOKT = BigInt(1_000_000);

export function formatPOKT(uPokt: bigint): string {
  if (uPokt < UPOKT) {
    return uPokt.toString() + " uPOKT";
  }

  const pokt = uPokt / UPOKT;

  const remainder = uPokt % UPOKT;
  const decimalPart = (remainder * BigInt(100)) / UPOKT;

  let formatted = pokt.toString();

  if (decimalPart > 0) {
    formatted += `.${decimalPart.toString().padStart(2, "0")}`;
  }

  return formatted + " POKT";
}
