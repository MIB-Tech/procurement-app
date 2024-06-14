import { ArraySchema } from "yup";
import { ColumnTypeEnum } from "../../types/types";

export type ArrayColumn = {
  type: ColumnTypeEnum.Array;
  separator?: string;
  schema?: ArraySchema<any>;
};
