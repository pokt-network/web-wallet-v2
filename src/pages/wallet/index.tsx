import React from "react";

import { Transactions } from "./transactions";
import { Container } from "@/components/container";
import { Address } from "./address";
import { Balanace } from "./balance";
import { Send } from "./send";
import { Logout } from "./logout-button";
import { useWalletStore } from "@/wallet";
import { navigate } from "wouter/use-browser-location";
import { ShowPrivateKey } from "./private-key";

export function Wallet(): React.ReactNode {
  const data = useWalletStore();

  if (data.address === null) {
    navigate("/create-wallet");
    return null;
  }

  return (
    <Container>
      <Address />
      <Balanace />
      <Send />
      <Transactions />
      <Logout />
      <ShowPrivateKey />
    </Container>
  );
}
