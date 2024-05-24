import React from "react";
import { TogglerProps } from "../../components/RouteAction";

export const DivToggle = React.forwardRef<HTMLDivElement, TogglerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={className?.replace("dropdown-toggle", "")}
      {...props}
    />
  )
);
