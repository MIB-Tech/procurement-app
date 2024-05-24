import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

export const GridCard: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div>
    <div className='card card-bordered h-100'>
      <div
        className={clsx("card-body", className)}
        {...props}
      />
    </div>
  </div>
);
