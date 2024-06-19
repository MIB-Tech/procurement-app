import { NumberColumn, NumberFormat } from "./NumberColumn";
import { NumberUnit } from "../../components/NumberUnit";
import { bytesToSize } from "../../components/File/File.utils";
import React from "react";

export const NumberCell = ({
  columnMapping,
  value,
  ...props
}: {
  value: number;
  columnMapping: NumberColumn<any>;
}) => {
  switch (columnMapping.format) {
    case NumberFormat.Amount:
      return (
        <NumberUnit
          {...columnMapping}
          {...props}
          value={value}
        />
      );
    case NumberFormat.Percent:
      return (
        <NumberUnit
          {...columnMapping}
          {...props}
          value={value * 100}
          unit='%'
        />
      );
    case NumberFormat.DecimalUnit:
      return <>{bytesToSize(value)}</>;
    default:
      return <>{value}</>;
  }
};
