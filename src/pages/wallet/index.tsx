import React from "react";

import { Transactions } from "./transactions";
import { Container } from "@/components/container";
import { Address } from "./address";
import { Balanace } from "./balance";
import { Send } from "./send";
import { Logout } from "./logout-button";

export function Wallet(): React.ReactNode {
  return (
    <Container>
      <Address />
      <Balanace />
      <Send />
      <Transactions />
      <Logout />
    </Container>
  );
}
