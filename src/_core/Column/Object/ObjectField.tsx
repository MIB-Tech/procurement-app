import { FC } from "react";
import { FieldProps } from "../controls/fields";
import { ObjectColumn, ObjectFormat } from "./ObjectColumn";
import { FileField } from "../controls/fields/FileField";

type ObjectFieldProps = {
  columnMapping: ObjectColumn;
} & FieldProps;

export const ObjectField: FC<ObjectFieldProps> = ({
  columnMapping,
  ...props
}) => {
  switch (columnMapping.format) {
    case ObjectFormat.Image:
      return (
        <FileField
          {...props}
          accept='image/*'
        />
      );
    case ObjectFormat.File:
      return <FileField {...props} />;
  }

  return <>TODO Array Object</>;
};
