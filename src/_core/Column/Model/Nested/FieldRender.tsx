import { ModelEnum } from "../../../../app/modules/types";
import { FormField } from "../../../types/ModelMapping";
import { getIn, useFormikContext } from "formik";
import { FormValue } from "../../../FormView/FormCard";
import React from "react";

export const FieldRender = <M extends ModelEnum>({
  render,
  objFieldName,
  nestedName,
}: { objFieldName?: string; nestedName: string } & Required<
  Pick<FormField<M>, "render">
>) => {
  const formik = useFormikContext<FormValue<M>>();

  return (
    <>
      {render({
        inputProps: { name: nestedName },
        metaProps: {
          value: objFieldName
            ? getIn(formik.values, objFieldName)
            : formik.values,
        },
      })}
    </>
  );
};
