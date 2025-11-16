import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { navigate } from "wouter/use-browser-location";
import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import * as WalletEncryption from "./wallet-encryption";
import { fromHex, toHex } from "@cosmjs/encoding";

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
      const wallet = await DirectSecp256k1Wallet.fromKey(fromHex(privateKey), "pokt");
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

type MnemonicImport = {
  mnemonic: string;
  password: string;
};

export function useImportWalletMnemonic(): UseMutationResult<void, Error, MnemonicImport> {
  return useMutation({
    mutationFn: async ({ mnemonic, password }) => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "pokt" });
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

export type WalletSecret =
  | {
      type: "private-key";
      privateKey: string;
    }
  | {
      type: "mnemonic";
      privateKey: string;
      mnemonic: string;
    };

export function usePrivateKey(): UseMutationResult<WalletSecret, Error, { password: string }> {
  return useMutation({
    mutationFn: async ({ password }) => {
      const walletState = useWalletStore.getState();

      if (walletState.type === "hd") {
        const wallet = await DirectSecp256k1HdWallet.deserialize(
          walletState.serializedWallet,
          password
        );

        const [account] = await wallet["getAccountsWithPrivkeys"]();

        return {
          type: "mnemonic",
          privateKey: toHex(account.privkey),
          mnemonic: wallet.mnemonic,
        };
      }

      if (walletState.type === "private-key") {
        const privateKey = await WalletEncryption.decrypt(walletState.serializedWallet, password);

        return {
          type: "private-key",
          privateKey,
        };
      }

      throw new Error("Unsupported wallet type");
    },
  });
}
