import { Link } from "wouter";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";

export function Home(): JSX.Element {
  return (
    <div className="flex flex-col max-w-[400px] gap-4 px-4 py-16 mx-auto text-center lg:px-0">
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
        <p className="font-medium">Pocket Network is now running on the Shannon upgrade.</p>

        <div className="mt-2">
          This wallet will not connect to Morse version accounts. If you have not yet upgraded your
          account to Shannon, you may use the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
            href="https://migration.shannon.nodefleet.net/wallet"
          >
            Soothe Wallet upgrade process
          </a>{" "}
          or the web based migration tool to claim your Morse account on Shannon.
        </div>
      </Alert>
    </div>
  );
}
