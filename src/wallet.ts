import { create } from "zustand";
import { navigate } from "wouter/use-browser-location";
import { AccountData, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";

type Wallet = {
  wallet: DirectSecp256k1HdWallet | null;
  serializedWallet: string | null;
};

export const useWalletStore = create<Wallet>()(() => ({
  wallet: null,
  serializedWallet: null,
}));

type SerializedWallet = {
  serialization: string;
  password: string;
};

export function useImportWallet(): UseMutationResult<
  DirectSecp256k1HdWallet,
  Error,
  SerializedWallet
> {
  return useMutation({
    mutationFn: async ({ serialization, password }) => {
      return await DirectSecp256k1HdWallet.deserialize(serialization, password);
    },
    onSuccess: (wallet) => {
      useWalletStore.setState({ wallet });
      navigate("/wallet");
    },
  });
}

export function useCreateWallet(): UseMutationResult<Wallet, Error, { password: string }> {
  return useMutation({
    mutationFn: async ({ password }) => {
      const wallet = await DirectSecp256k1HdWallet.generate(24, { prefix: "pokt" });
      const serializedWallet = await wallet.serialize(password);
      useWalletStore.setState({ wallet, serializedWallet });
      return { wallet, serializedWallet };
    },
    onSuccess: () => {
      navigate("/download-wallet");
    },
  });
}

export function useAccount(): UseQueryResult<AccountData, Error> {
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const { wallet } = useWalletStore.getState();

      if (wallet === null) {
        throw new Error("No wallet");
      }

      const [account] = await wallet.getAccounts();

      if (account === undefined) {
        throw new Error("No accounts");
      }

      return account;
    },
  });
}
