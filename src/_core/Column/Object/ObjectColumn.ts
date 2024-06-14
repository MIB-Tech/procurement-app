import { ObjectSchema } from "yup";
import { ColumnTypeEnum } from "../../types/types";

export enum ObjectFormat {
  File = "File",
  Image = "Image",
}

export type ObjectColumn = {
  type: ColumnTypeEnum.Object;
  format: ObjectFormat;
  schema?: ObjectSchema<any>;
};
