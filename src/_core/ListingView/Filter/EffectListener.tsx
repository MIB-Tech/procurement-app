import React, { FC, useEffect } from "react";

export const EffectListener: FC<{ execute: boolean; handler: () => void }> = ({
  execute,
  handler,
}) => {
  useEffect(() => {
    if (execute) {
      handler();
    }
  }, [execute]);

  return <></>;
};
