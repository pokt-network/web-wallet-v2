import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { navigate } from "wouter/use-browser-location";
import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import * as WalletEncryption from "./wallet-encryption";

type WalletState =
  | {
      address: string;
      serializedWallet: string;
      type: "hd" | "private-key";
    }
  | {
      address: null;
      serializedWallet: null;
      type: null;
    };

export const useWalletStore = create<WalletState>()(
  persist<WalletState>(
    () => ({
      address: null,
      serializedWallet: null,
      type: null,
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type HDWalletImport = {
  serialization: string;
  password: string;
};

export function useImportHDWallet(): UseMutationResult<void, Error, HDWalletImport> {
  return useMutation({
    mutationFn: async ({ serialization, password }) => {
      const wallet = await DirectSecp256k1HdWallet.deserialize(serialization, password);
      const address = await getAddress(wallet);
      const serializedWallet = await wallet.serialize(password);
      useWalletStore.setState({
        address,
        serializedWallet,
        type: "hd",
      });
    },
    onSuccess: () => {
      navigate("/wallet");
    },
  });
}

type PrivateKeyImport = {
  privateKey: string;
  password: string;
};

export function useImportWallet(): UseMutationResult<void, Error, PrivateKeyImport> {
  return useMutation({
    mutationFn: async ({ privateKey, password }) => {
      const wallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, "hex"), "pokt");
      const address = await getAddress(wallet);
      const serializedWallet = await WalletEncryption.encrypt(privateKey, password);
      useWalletStore.setState({
        address,
        serializedWallet,
        type: "private-key",
      });
    },
    onSuccess: () => {
      navigate("/wallet");
    },
  });
}

export function useCreateWallet(): UseMutationResult<void, Error, { password: string }> {
  return useMutation({
    mutationFn: async ({ password }) => {
      const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "pokt" });
      const address = await getAddress(wallet);
      const serializedWallet = await wallet.serialize(password);
      useWalletStore.setState({
        address,
        serializedWallet,
        type: "hd",
      });
    },
    onSuccess: () => {
      navigate("/download-wallet");
    },
  });
}

async function getAddress(
  wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet
): Promise<string> {
  const [account] = await wallet.getAccounts();

  if (account === undefined) {
    throw new Error("No accounts");
  }

  return account.address;
}
