import { Bullet } from "../../../../_core/components/Bullet";
import { Reference } from "./Reference";
import React from "react";

import { getModelNameFromClass } from "./Audits.utils";
import { Trans } from "../../../../_core/components/Trans";

export const DiffValue = ({
  value,
}: {
  value:
    | string
    | boolean
    | { class: string; id: number; label: string; table: string };
}) => (
  <>
    {value === null || value === undefined ? (
      <Bullet />
    ) : (
      <>
        {typeof value === "boolean" && <Trans id={value ? "YES" : "NO"} />}
        {typeof value === "string" && value}
        {typeof value === "object" && (
          <Reference
            refId={value.id}
            label={getModelNameFromClass(value.class)}
          />
        )}
      </>
    )}
  </>
);
