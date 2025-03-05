import { Link } from "wouter";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";

export function Home(): JSX.Element {
  return (
    <div className="flex flex-col max-w-sm gap-4 px-4 py-16 mx-auto text-center lg:px-0">
      <Title>
        Welcome to
        <br />
        Pocket Wallet
      </Title>

      <p className="text-pocket-gray">
        This is an open-source wallet to provide easy access and management of your POKT
        cryptocurrency.
      </p>

      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/create-wallet" className="w-full">
          <Button className="w-full">Create wallet</Button>
        </Link>

        <Link to="/import-wallet" className="w-full">
          <Button variant="outline" className="w-full">
            Import wallet
          </Button>
        </Link>
      </div>

      <Alert>
        <p className="font-medium">Now supporting Unstoppable Domains!</p>
        You can now use an unstoppable domain to send transactions. For more information, check out
        our{" "}
        <a
          target="_blank"
          className="underline"
          rel="noopener noreferrer"
          href="https://twitter.com/POKTnetwork/status/1625948417888292871"
        >
          announcement
        </a>
        .
      </Alert>
    </div>
  );
}
