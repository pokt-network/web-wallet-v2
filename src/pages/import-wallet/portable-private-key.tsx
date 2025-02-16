import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileKey2, Upload, XIcon } from "lucide-react";

import { cx } from "@/cx";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/password-input";
import { navigate } from "wouter/use-browser-location";
import { KeyManager } from "@pokt-foundation/pocketjs-signer";
import { useAccount } from "@/context/account-context";

export function PortablePrivateKey(): React.ReactNode {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [importingWallet, setImportingWallet] = useState(false);
  const { setAccount, setPortablePrivateKey } = useAccount();

  async function importWallet(): Promise<void> {
    if (!file) return;
    setImportingWallet(true);

    const ppk = await file.text();
    const account = await KeyManager.fromPPK({ ppk, password });

    setAccount(account);
    setPortablePrivateKey(ppk);

    setImportingWallet(false);
    navigate("/wallet");
  }

  if (importingWallet) {
    return (
      <div className="flex flex-col gap-2">
        <p>Importing wallet...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <UploadFile file={file} setFile={setFile} />

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Password</p>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <p className="text-sm pt-2">
        When you created the portable private key, you set a password. Enter it here to import
      </p>

      <Button className="w-full" disabled={!file || !password} onClick={importWallet}>
        Import wallet
      </Button>
    </div>
  );
}

function UploadFile({
  file,
  setFile,
}: {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
}): React.ReactNode {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    accept: {
      "application/json": [".json"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
  });

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 border-dashed border border-pocket-gray/20 rounded-md">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-white rounded-md p-2 border border-pocket-gray/20">
            <FileKey2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs">{file.size} bytes</p>
          </div>
        </div>
        <button className="text-sm cursor-pointer" onClick={() => setFile(undefined)}>
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cx(
        "flex items-center justify-center text-left gap-8 p-8 border border-pocket-blue/20 bg-pocket-blue/5 rounded-md border-dashed duration-200 cursor-pointer hover:border-pocket-blue/30",
        isDragAccept && "border-pocket-blue bg-pocket-blue/10"
      )}
    >
      <input {...getInputProps()} />
      <Upload className={`w-8 h-8 text-pocket-blue duration-200 ${isDragAccept && "scale-110"}`} />
      <p className="text-sm mx-auto">
        Drag and drop your portable private key file here or{" "}
        <span className="text-pocket-blue underline">click here</span> to browse your files.
      </p>
    </div>
  );
}
