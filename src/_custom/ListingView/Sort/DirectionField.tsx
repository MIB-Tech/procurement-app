import { Direction } from "../ListingView.types";
import { StringFormat } from "../../Column/String/StringColumn";
import { RadioField } from "../../Column/controls/fields/RadioField/RadioField";
import React from "react";
import { TypeColum } from "../../types/ModelMapping";
import { ColumnTypeEnum } from "../../types/types";

export type DirectionFieldProps<T extends {}> = {
  name: keyof T;
} & TypeColum;
export const DirectionField = <T extends {}>(
  column: DirectionFieldProps<T>
) => {
  const name = column.name.toString();
  const { type } = column;
  let labels: Record<Direction, string> = { asc: "A - Z", desc: "Z - A" };

  switch (type) {
    case ColumnTypeEnum.String:
      switch (column.format) {
        case StringFormat.Datetime:
        case StringFormat.Date:
        case StringFormat.Time:
          labels.asc = "1 - 9";
          labels.desc = "9 - 1";
          break;
      }
      break;
    case ColumnTypeEnum.Number:
      labels.asc = "1 - 9";
      labels.desc = "9 - 1";
  }

  return (
    <RadioField
      size='sm'
      name={name}
      getOptionLabel={(option) => labels[option]}
      options={["asc", "desc"] as Direction[]}
      scrollDisabled
    />
  );
};
