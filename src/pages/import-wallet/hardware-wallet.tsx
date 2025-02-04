import { Button } from "@/components/button";
import React from "react";

export function HardwareWallet(): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <p>Connect your hardware Wallet directly to your computer.</p>
      <Button className="w-full">Connect</Button>
    </div>
  );
}
