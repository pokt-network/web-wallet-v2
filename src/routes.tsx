import { Route, Switch } from "wouter";
import { Layout } from "@/components/layout";

import { Home } from "./pages/home";
import { Wallet } from "./pages/wallet";
import { ImportWallet } from "./pages/import-wallet";
import { CreateWallet } from "./pages/create-wallet";
import { DownloadWallet } from "./pages/download-wallet";

export function Routes(): JSX.Element {
  return (
    <Layout>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/create-wallet">
          <CreateWallet />
        </Route>
        <Route path="/download-wallet">
          <DownloadWallet />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/import-wallet">
          <ImportWallet />
        </Route>
      </Switch>
    </Layout>
  );
}
