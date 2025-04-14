import { forwardRef } from "react";
import { Input } from "@/components/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, forwardedRef) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input ref={forwardedRef} {...props} type={isVisible ? "text" : "password"} />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setIsVisible((prevState) => !prevState)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
