import { useAccount } from "@/context/account-context";
import { formatAddress } from "@/utils/format-address";
import { CopyToClipboard } from "@/components/copy-to-clipboard";

export function Address(): React.ReactNode {
  const { account } = useAccount();

  if (!account) {
    return null;
  }

  const address = account.getAddress();

  return (
    <div className="flex items-center justify-center">
      <div className="flex px-4 py-2 rounded-full bg-pocket-blue/5 text-pocket-blue gap-2">
        <p className="text-sm font-medium">{formatAddress(address)}</p>
        <CopyToClipboard value={address} />
      </div>
    </div>
  );
}
