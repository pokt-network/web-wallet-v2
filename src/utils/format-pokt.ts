export const UPOKT = BigInt(1_000_000);

export function formatPOKT(uPokt: bigint): string {
  if (uPokt < UPOKT) {
    return uPokt.toString() + " uPOKT";
  }

  const pokt = uPokt / UPOKT;
  return pokt.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " POKT";
}
