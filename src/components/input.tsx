import { forwardRef } from "react";

import { cx } from "@/cx";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, forwardedRef) => {
    return (
      <input
        ref={forwardedRef}
        className={cx(
          "border border-pocket-gray/20 placeholder:text-pocket-gray/60 h-10 w-full px-4 rounded-md",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
