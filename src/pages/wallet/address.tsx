import { formatAddress } from "@/utils/format-address";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { useWalletStore } from "@/wallet";
import { navigate } from "wouter/use-browser-location";

export function Address(): React.ReactNode {
  const state = useWalletStore();

  if (state.address === null) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex px-4 py-2 rounded-full border border-pocket-blue/10 bg-pocket-blue/5 text-pocket-blue gap-2">
        <p className="text-sm font-medium">{formatAddress(state.address)}</p>
        <CopyToClipboard value={state.address} />
      </div>
    </div>
  );
}
