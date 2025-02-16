const UPOKT = 1_000_000;

export function formatPOKT(uPokt: number): string {
  const pokt = uPokt / UPOKT;
  return pokt.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}
