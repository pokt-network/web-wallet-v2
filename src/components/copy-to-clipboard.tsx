import { useState } from "react";
import { CheckIcon, Copy } from "lucide-react";
import { Tooltip } from "@/components/tooltip";

export function CopyToClipboard({ value }: { value: string }): React.ReactNode {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  const handleChange = (open: boolean): void => {
    if (open === false) {
      setIsCopied(false);
    }
  };

  return (
    <Tooltip
      onClick={handleClick}
      onChange={handleChange}
      tooltipContent={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? <CheckIcon className="size-4" /> : <Copy className="size-4" />}
    </Tooltip>
  );
}
