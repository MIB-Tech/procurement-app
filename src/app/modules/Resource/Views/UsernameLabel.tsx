import { Reference } from "./Reference";
import React from "react";

import { Audit } from "./Audits.types";

export const UsernameLabel = ({
  userId,
  username,
}: Pick<Audit<any>, "userId" | "username">) => {
  const id =
    userId && !isNaN(parseInt(userId || "")) ? parseInt(userId) : undefined;

  return (
    <Reference
      refId={id}
      label={username}
      className='text-black fw-bold'
    />
  );
};
