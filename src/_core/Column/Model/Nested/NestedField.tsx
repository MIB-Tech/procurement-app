import React from "react";
import { FieldProps } from "../../controls/fields";
import { CreateViewType, Model, ViewEnum } from "../../../types/ModelMapping";
import { useField } from "formik";
import { useMapping } from "../../../hooks/UseMapping";
import { FormCard, FormValue } from "../../../FormView/FormCard";
import { ModelEnum } from "../../../../app/modules/types";

export const NestedField = <M extends ModelEnum>({
  name,
  modelName,
}: FieldProps & { modelName: M }) => {
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField<
    FormValue<M>
  >({
    name,
  });
  const { views } = useMapping<M>({ modelName });

  const view = views?.find((view) => view.type === ViewEnum.Create) as
    | CreateViewType<M>
    | undefined;

  if (!view) {
    return <>VIEW NOT FOUND</>;
  }

  return (
    <FormCard
      modelName={modelName}
      formView={view}
      formValue={fieldInputProps.value}
      className='card-bordered'
    />
  );
};
