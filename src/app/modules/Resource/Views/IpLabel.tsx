import React from "react";

import { Audit } from "./Audits.types";

export const IpLabel = ({ ip }: Pick<Audit<any>, "ip">) => (
  <span className='fw-bold'>{ip}</span>
);
