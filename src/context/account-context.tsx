import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { KeyManager } from "@pokt-foundation/pocketjs-signer";

type AccountContextType = {
  account: KeyManager | null;
  setAccount: Dispatch<SetStateAction<KeyManager | null>>;
  portablePrivateKey: string | null;
  setPortablePrivateKey: Dispatch<SetStateAction<string | null>>;
};

const AccountContext = createContext<AccountContextType | null>(null);

export function useAccount(): AccountContextType {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount cannot be used without declaring the provider");
  }

  return context;
}

export function AccountContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [account, setAccount] = useState<KeyManager | null>(null);
  const [portablePrivateKey, setPortablePrivateKey] = useState<string | null>(null);

  return (
    <AccountContext.Provider
      value={{
        account,
        portablePrivateKey,
        setAccount,
        setPortablePrivateKey,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
