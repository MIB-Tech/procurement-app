import { Bullet } from "../../../../_core/components/Bullet";
import { CellContent } from "../../../../_core/ListingView/views/Table/BodyCell";
import { ColumnTypeEnum } from "../../../../_core/types/types";
import { Reference } from "./Reference";
import React from "react";

import { getModelNameFromClass } from "./Audits.utils";

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
        {typeof value === "boolean" && (
          <CellContent
            value={value}
            type={ColumnTypeEnum.Boolean}
          />
        )}
        {typeof value === "string" && (
          <CellContent
            value={value}
            type={ColumnTypeEnum.String}
          />
        )}
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
