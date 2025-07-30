import React from "react";
import { Link } from "wouter";

import { Title } from "@/components/title";
import { Container } from "@/components/container";
import { PortablePrivateKey } from "./portable-private-key";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/accordion";
import { PrivateKey } from "./private-key";
import { MnemonicImport } from "./mnemonic";

export function ImportWallet(): React.ReactNode {
  return (
    <Container>
      <Title>Import Wallet</Title>
      <p className="text-center">
        You can import your existing wallet using either a portable private key or a private key.
      </p>

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        <AccordionItem value="portable-private-key">
          <AccordionTrigger>Use portable Private Key</AccordionTrigger>
          <AccordionContent className="pt-2">
            <PortablePrivateKey />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="private-key">
          <AccordionTrigger>Use private Key</AccordionTrigger>
          <AccordionContent className="pt-2">
            <PrivateKey />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mnemonic">
          <AccordionTrigger>Use Mnemonic</AccordionTrigger>
          <AccordionContent className="pt-2">
            <MnemonicImport />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-center">
        {"Don't have a wallet? "}
        <Link to="/create-wallet" className="text-pocket-blue underline">
          {"Create Wallet"}
        </Link>
      </p>
    </Container>
  );
}
