import React, { useState } from "react";
import { ArrowLeft, FileDown } from "lucide-react";
import { navigate } from "wouter/use-browser-location";

import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { useAccount } from "@/context/account-context";
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

export function DownloadWallet(): React.ReactNode {
  const { portablePrivateKey } = useAccount();
  const [keyFileDownloaded, setKeyFileDownloaded] = useState(false);

  async function handleDownload(): Promise<void> {
    if (portablePrivateKey === null) return;
    downloadFile(portablePrivateKey, "keyfile.json");
    setKeyFileDownloaded(true);
  }

  return (
    <div className="max-w-md mx-auto text-pocket-gray text-center flex flex-col gap-4">
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
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            <AlertDialogAction className="w-full" onClick={() => window.history.back()}>
              Go back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function downloadFile(content: string, fileName: string): void {
  const data = "data:text/json;charset=utf-8," + encodeURIComponent(content);
  const downloadAnchorNode = document.createElement("a");

  downloadAnchorNode.setAttribute("href", data);
  downloadAnchorNode.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchorNode);

  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
