import { useAccount } from "@/wallet";
import { formatAddress } from "@/utils/format-address";
import { CopyToClipboard } from "@/components/copy-to-clipboard";

export function Address(): React.ReactNode {
  const { data } = useAccount();

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex px-4 py-2 rounded-full bg-pocket-blue/5 text-pocket-blue gap-2">
        <p className="text-sm font-medium">{formatAddress(data.address)}</p>
        <CopyToClipboard value={data.address} />
      </div>
    </div>
  );
}
