import { forwardRef } from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cx } from "@/cx";

const buttonVariants = tv({
  base: [
    "relative flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-in-out h-10 px-4 cursor-pointer",
    "disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      default: ["text-white", "bg-pocket-blue", "hover:bg-pocket-blue/90", "disabled:opacity-50"],
      outline: [
        "text-pocket-blue",
        "border border-pocket-blue",
        "hover:border-pocket-blue/90",
        "disabled:opacity-50",
      ],
      ghost: [
        "text-pocket-blue",
        "hover:bg-pocket-blue/5",
        "disabled:opacity-50",
        "bg-transparent",
      ],
      yellow: [
        "text-white",
        "bg-pocket-yellow",
        "hover:bg-pocket-yellow/90",
        "disabled:opacity-50",
      ],
      red: "bg-red-500/10 text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }: ButtonProps, forwardedRef) => {
    return (
      <button ref={forwardedRef} className={cx(buttonVariants({ variant }), className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
