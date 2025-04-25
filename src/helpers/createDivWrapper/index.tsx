import React, { forwardRef, ComponentPropsWithoutRef } from "react";

export function createDivWrapper(displayName?: string) {
  const Wrapper = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
    ({ children, ...rest }, ref) => {
      return (
        <div ref={ref} {...rest}>
          {children}
        </div>
      );
    }
  );
  Wrapper.displayName = displayName || "DivWrapper";
  return Wrapper;
}
