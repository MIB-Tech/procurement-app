import React from "react";
import {
  FormControlProps,
  InputBackground,
} from "./String/InputBase/Input.types";
import { TypeColum } from "../types/ModelMapping";
import { StringField } from "./String/StringField";
import { BooleanField } from "./Boolean/BooleanField";
import { ArrayField } from "./Array/ArrayField";
import { ModelField } from "./Model/ModelField";
import { NumberColumnField } from "./Number/NumberColumnField";
import { ColumnTypeEnum } from "../types/types";
import { FieldProps } from "./controls/fields";
import { ObjectField } from "./Object/ObjectField";

export type ValueFieldProps = {
  column: TypeColum;
  className?: string;
  placeholder?: string;
  icon?: boolean;
} & FieldProps &
  FormControlProps;
export const ValueField = ({
  column,
  name,
  size,
  className,
  placeholder,
  icon,
  feedbackLabel,
}: ValueFieldProps) => {
  const _props = {
    size,
    className,
    background: "solid" as InputBackground,
    name,
    placeholder,
    icon,
    feedbackLabel,
  };
  const { type } = column;

  switch (type) {
    case ColumnTypeEnum.Number:
      return (
        <NumberColumnField
          format={column.format}
          {..._props}
          precision={column.precision}
        />
      );
    case ColumnTypeEnum.Boolean:
      return <BooleanField {..._props} />;
    case ColumnTypeEnum.String:
      return (
        <StringField
          column={column}
          {..._props}
        />
      );
    case ColumnTypeEnum.Array:
      return (
        <ArrayField
          {..._props}
          column={column}
        />
      );
    case ColumnTypeEnum.Object:
      return (
        <ObjectField
          columnMapping={column}
          {..._props}
        />
      );
    default:
      return (
        <ModelField
          modelName={type}
          column={column}
          {..._props}
        />
      );
  }
};
