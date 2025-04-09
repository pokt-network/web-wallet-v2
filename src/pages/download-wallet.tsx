import React, { useState } from "react";
import { ArrowLeft, FileDown } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/alert-dialong";
import { useWalletStore } from "@/wallet";
import { downloadFile } from "@/utils/download-file";

export function DownloadWallet(): React.ReactNode {
  const serializedWallet = useWalletStore((state) => state.serializedWallet);
  const [keyFileDownloaded, setKeyFileDownloaded] = useState(false);

  if (serializedWallet === null) {
    navigate("/create-wallet");
    return null;
  }

  async function handleDownload(): Promise<void> {
    if (!serializedWallet) {
      return;
    }

    downloadFile(serializedWallet, "keyfile.json");
    setKeyFileDownloaded(true);
  }

  return (
    <Container>
      <Title>Download Key File</Title>

      <p className="text-left">Download the key file to continue</p>

      <div
        className="text-pocket-blue font-mono font-medium border border-pocket-blue/20 p-4 rounded-lg bg-pocket-blue/5 flex items-center justify-between cursor-pointer hover:bg-pocket-blue/10 duration-300"
        onClick={handleDownload}
      >
        keyfile.json
        <FileDown className="w-6 h-6" />
      </div>

      <p className="text-left">
        If you lose the key file or password, your only other method of accessing the wallet will be
        to use the private key. Be sure to Reveal Private Key on the next page and save it securely.
      </p>

      <Alert>
        <p className="font-medium">Save your key file</p>
        To import this wallet elsewhere, you will need this key file and the password that you have
        just created, so please back it up securely.
      </Alert>

      <Button disabled={!keyFileDownloaded} onClick={() => navigate("/wallet")}>
        Continue
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Are you sure you want to go back?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              If you go back, you will lose the wallet you have created
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center justify-center gap-2">
            <AlertDialogCancel className="w-full mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-full mt-0" onClick={() => window.history.back()}>
              Go back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}
