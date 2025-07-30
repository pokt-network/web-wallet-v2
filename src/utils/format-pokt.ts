export const UPOKT = BigInt(1_000_000);

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPOKT(uPokt: bigint): string {
  if (uPokt < UPOKT) {
    return uPokt.toString() + " uPOKT";
  }

  const pokt = uPokt / UPOKT;

  const remainder = uPokt % UPOKT;
  const decimalPart = (remainder * BigInt(100)) / UPOKT;

  let formatted = formatter.format(pokt);

  if (decimalPart > 0) {
    formatted += `.${decimalPart.toString().padStart(2, "0")}`;
  }

  return formatted + " POKT";
}
