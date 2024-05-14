import { number, NumberSchema } from "yup";
import { ColumnTypeEnum } from "../../types/types";
import { Model } from "../../types/ModelMapping";
import { ModelEnum } from "../../../app/modules/types";

import { getReference } from "../../getReference";

//
export enum NumberFormat {
  Amount = "AMOUNT",
  Percent = "PERCENT",
  DecimalUnit = "DECIMAL_UNIT",
  // Percent = 'PERCENT',
  // Rating = 'RATING',
  // Duration = 'DURATION',
}

export type NumberValidation<M extends ModelEnum> = {
  min?: Limit<M>;
  max?: Limit<M>;
  lessThan?: Limit<M>;
  moreThan?: Limit<M>;
  positive?: boolean;
  negative?: boolean;
};
export type Limit<M extends ModelEnum> = number | string | keyof Model<M>;
export type NumberColumn<M extends ModelEnum> = {
  type: ColumnTypeEnum.Number;
  format?: NumberFormat;
  schema?: NumberSchema | ((schema: NumberSchema) => NumberSchema);
  unit?: string;
  precision?: number;
  validation?: NumberValidation<M>;
  // step?: number
  // symbol: string => PERCENT
  // max?: number => RATING
  // durationFormat?: 'h:mm' | 'h:mm:ss' | 'h:mm:ss.S' | 'h:mm:ss.SS' | 'h:mm:ss.SSS'
};

export const NUMBER_FORMAT_CONFIG: Record<NumberFormat, { icon: string }> = {
  [NumberFormat.Amount]: { icon: "/finance/fin010.svg" },
  [NumberFormat.Percent]: { icon: "/finance/fin010.svg" },
  [NumberFormat.DecimalUnit]: { icon: "/finance/fin010.svg" },
};

export const getNumberValidation = <M extends ModelEnum>({
  validation,
  schema = number(),
}: {
  validation: NumberValidation<M>;
  schema?: NumberSchema;
}) => {
  const { min, max, lessThan, moreThan, positive, negative } = validation;
  if (min) schema = schema.min(getReference(min.toString()));
  if (max) schema = schema.max(getReference(max.toString()));
  if (lessThan) schema = schema.lessThan(getReference(lessThan.toString()));
  if (moreThan) schema = schema.lessThan(getReference(moreThan.toString()));
  if (positive) schema = schema.positive();
  if (negative) schema = schema.negative();

  return schema;
};
