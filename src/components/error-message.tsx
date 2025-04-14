import { FC, ReactNode } from "react";

export const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => (
  <p className="text-xs text-red-500">{children}</p>
);
