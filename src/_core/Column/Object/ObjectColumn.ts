import { ObjectSchema } from "yup";
import { ColumnTypeEnum } from "../../types/types";

export enum ObjectFormat {
  File = "File",
  Image = "Image",
}

export type FileColumn = {
  format: ObjectFormat.File | ObjectFormat.Image;
  schema?: ObjectSchema<any>;
  fileContentUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileMimeType?: string;
  fileDimensions?: string;
};

export type ObjectColumn = {
  type: ColumnTypeEnum.Object;
  format: ObjectFormat;
  schema?: ObjectSchema<any>;
} & FileColumn;
