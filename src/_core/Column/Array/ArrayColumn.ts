import { ArraySchema } from "yup";
import { ColumnTypeEnum } from "../../types/types";
import { StringSelectOption } from "../String/StringColumn";

export type ArrayColumn = {
  type: ColumnTypeEnum.Array;
  options: Array<StringSelectOption>;
  separator?: string;
  schema?: ArraySchema<any>;
};
