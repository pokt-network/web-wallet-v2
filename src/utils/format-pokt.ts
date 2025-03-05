export const UPOKT = BigInt(1_000_000);

export function formatPOKT(uPokt: bigint): string {
  const pokt = uPokt / UPOKT;
  return pokt.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}
