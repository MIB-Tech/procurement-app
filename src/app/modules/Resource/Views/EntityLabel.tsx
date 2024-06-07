import { Reference } from "./Reference";
import { getModelNameFromClass } from "./Audits.utils";
import React from "react";

import { AssociateDiff } from "./Audits.types";

export const EntityLabel = ({
  id,
  class: entityClassName,
}: Partial<Pick<AssociateDiff, "id">> & Pick<AssociateDiff, "class">) => (
  <span className='text-primary fw-bold'>
    <Reference
      refId={id}
      label={getModelNameFromClass(entityClassName)}
    />
  </span>
);
