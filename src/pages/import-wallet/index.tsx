import React from "react";
import { Link } from "wouter";

import { Title } from "@/components/title";
import { Container } from "@/components/container";
import { PortablePrivateKey } from "./portable-private-key";

export function ImportWallet(): React.ReactNode {
  return (
    <Container>
      <Title>Import Wallet</Title>
      <p className="text-center">Upload your portable private key to import your wallet.</p>

      <PortablePrivateKey />

      <p className="text-center">
        {"Don't have a wallet? "}
        <Link to="/create-wallet" className="text-pocket-blue underline">
          {"Create Wallet"}
        </Link>
      </p>
    </Container>
  );
}
