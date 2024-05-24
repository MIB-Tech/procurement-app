import { ModelFileField } from "./File/ModelFileField";
import { NestedArrayField } from "./Nested/NestedArrayField";
import { NestedField } from "./Nested/NestedField";
import { ModelAutocompleteField } from "./Autocomplete/ModelAutocompleteField";
import React from "react";
import { FieldProps } from "../controls/fields";
import { ModelColumn } from "./ModelColumn";
import { useMapping } from "../../hooks/UseMapping";
import { ModelEnum } from "../../../app/modules/types";

export const ModelField = <M extends ModelEnum>({
  modelName,
  column,
  ...props
}: { modelName: M; column: ModelColumn<M> } & FieldProps) => {
  const { uploadable } = useMapping<M>({ modelName });

  if (uploadable) {
    return (
      <ModelFileField
        modelName={modelName}
        {...props}
      />
    );
  }

  const { embeddedForm, autoSelect, getAutocompleteParams } = column;
  const multiple = "multiple" in column;

  if (embeddedForm) {
    return multiple ? (
      <NestedArrayField
        modelName={modelName}
        {...props}
        disableInsert={column.disableInsert}
      />
    ) : (
      <NestedField
        modelName={modelName}
        {...props}
      />
    );
  }

  return (
    <ModelAutocompleteField
      multiple={multiple}
      autoSelect={autoSelect}
      modelName={modelName}
      getParams={getAutocompleteParams}
      {...props}
    />
  );
};
