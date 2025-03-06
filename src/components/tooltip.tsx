import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";

type TooltipOptions = {
  children: ReactNode;
  tooltipContent: ReactNode;
  onChange?: (isOpen: boolean) => void;
  onClick?: () => void;
};

export function Tooltip({
  children,
  tooltipContent,
  onClick,
  onChange,
}: TooltipOptions): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      shift(),
      offset(10),
      flip({ fallbackAxisSideDirection: "start" }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  useEffect(() => {
    if (onChange) {
      onChange(isOpen);
    }
  }, [isOpen, onChange]);

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={onClick}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </button>

      <FloatingPortal>
        {isOpen && (
          <div style={{ ...floatingStyles }} ref={refs.setFloating} {...getFloatingProps()}>
            <div className="rounded-lg bg-pocket-gray px-2 py-1 text-xs font-normal text-white">
              {tooltipContent}
            </div>

            <FloatingArrow ref={arrowRef} context={context} className="fill-pocket-gray" />
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
