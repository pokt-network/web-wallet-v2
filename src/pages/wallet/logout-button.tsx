import { Button } from "@/components/button";
import { useWalletStore } from "@/wallet";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { navigate } from "wouter/use-browser-location";

export const Logout: FC = () => (
  <Button
    variant="outline"
    className="gap-2"
    onClick={() => {
      useWalletStore.setState(null);
      navigate("/");
    }}
  >
    Logout
    <LogOut className="size-4" />
  </Button>
);
