import React from "react";
import { Link } from "wouter";

import { Title } from "@/components/title";
import { Container } from "@/components/container";
import { PortablePrivateKey } from "./portable-private-key";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { PrivateKey } from "./private-key";
import { HardwareWallet } from "./hardware-wallet";

export function ImportWallet(): React.ReactNode {
  return (
    <Container>
      <Title>Import Wallet</Title>
      <p className="text-center">Select a method to access your account</p>

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        <AccordionItem value="portable-private-key">
          <AccordionTrigger>Portable Private Key</AccordionTrigger>
          <AccordionContent className="pt-4">
            <PortablePrivateKey />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="private-key">
          <AccordionTrigger>Private Key</AccordionTrigger>
          <AccordionContent className="pt-4">
            <PrivateKey />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hardware-wallet">
          <AccordionTrigger>Hardware Wallet (Ledger)</AccordionTrigger>
          <AccordionContent className="pt-4">
            <HardwareWallet />
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
