import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { navigate } from "wouter/use-browser-location";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type WalletState = {
  address: string;
  serializedWallet: string;
} | null;

export const useWalletStore = create<WalletState>()(
  persist<WalletState>(() => null, {
    name: "wallet-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

type SerializedWallet = {
  serialization: string;
  password: string;
};

export function useImportWallet(): UseMutationResult<void, Error, SerializedWallet> {
  return useMutation({
    mutationFn: async ({ serialization, password }) => {
      const wallet = await DirectSecp256k1HdWallet.deserialize(serialization, password);

      const address = await getAddress(wallet);
      const serializedWallet = await wallet.serialize(password);

      useWalletStore.setState({
        address,
        serializedWallet,
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
      });
    },
    onSuccess: () => {
      navigate("/download-wallet");
    },
  });
}

async function getAddress(wallet: DirectSecp256k1HdWallet): Promise<string> {
  const [account] = await wallet.getAccounts();

  if (account === undefined) {
    throw new Error("No accounts");
  }

  return account.address;
}
