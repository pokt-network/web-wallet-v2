import React from "react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/button";
import { Transactions } from "./transactions";
import { Container } from "@/components/container";
import { Address } from "./address";
import { Balanace } from "./balance";
import { Send } from "./send";

export function Wallet(): React.ReactNode {
  return (
    <Container>
      <Balanace />
      <Address />
      <Send />
      <Transactions />

      <Button className="gap-2" variant="yellow">
        Logout
        <LogOut className="w-4 h-4" />
      </Button>
    </Container>
  );
}
