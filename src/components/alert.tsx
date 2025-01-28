import { PropsWithChildren } from "react";

export function Alert({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="text-left mx-auto bg-pocket-yellow/5 text-pocket-yellow p-4 rounded-lg border border-pocket-yellow/20">
      {children}
    </div>
  );
}
