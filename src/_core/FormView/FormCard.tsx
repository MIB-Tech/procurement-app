import { ColumnMapping, FormViewType, Model } from "../types/ModelMapping";
import { useMapping } from "../hooks/UseMapping";
import { useAuth } from "../hooks/UseAuth";
import clsx from "clsx";
import { TitleContent } from "../ListingView/views/Table/HeaderCell";
import React from "react";
import { getDefaultFields } from "../utils";
import { ModelEnum } from "../../app/modules/types";
import { Grid } from "@mui/material";
import { HydraItem } from "../types/hydra.types";
import { ValueField } from "../Column/ValueField";
import { FieldRender } from "../Column/Model/Nested/FieldRender";

export type FormValue<M extends ModelEnum> = Partial<HydraItem<M>>;
export type FormCardProps<M extends ModelEnum> = {
  modelName: M;
  formView: FormViewType<M>;
  formValue: FormValue<M>;
  className?: string;
  namePrefix?: string;
};

export const FormCard = <M extends ModelEnum>({
  modelName,
  formView,
  formValue,
  namePrefix,
  className,
  ...props
}: FormCardProps<M>) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { isGranted } = useAuth();
  const { inlineForm, fields = getDefaultFields(columnDef) } = formView;
  const columnNames = (
    Object.keys(fields) as Array<keyof Model<M> | string>
  ).filter((columnName) => {
    const field = fields[columnName];
    if (typeof field === "boolean") {
      return field;
    }

    const display = field?.display;
    const grantedRoles = field?.grantedRoles;

    return (
      (!display || display({ item: formValue })) &&
      (!grantedRoles || isGranted(grantedRoles))
    );
  });

  return (
    <div className={clsx("card", className)}>
      <div className='card-body'>
        <Grid
          container
          spacing={1}
          {...formView.slotProps?.root}
        >
          {columnNames.map((columnName, index) => {
            const field = fields[columnName];
            const columnMapping = columnDef[columnName] as
              | ColumnMapping<M>
              | undefined;
            if (!field || !columnMapping) {
              return <></>;
            }

            const render = typeof field === "object" && field?.render;
            const gridProps =
              typeof field === "object" && field?.slotProps?.root;
            const helperText =
              typeof field === "object" ? field?.helperText : undefined;

            const objFieldName = namePrefix;
            const nestedName = `${
              objFieldName ? `${objFieldName}.` : ""
            }${columnName.toString()}`;

            return (
              <Grid
                key={index}
                item
                xs={12}
                {...formView.slotProps?.item}
                {...gridProps}
              >
                <div className={clsx(inlineForm && "row")}>
                  <label
                    className={clsx(
                      "d-flex fw-semibold text-truncate text-muted",
                      inlineForm && "col-sm-3 mt-2",
                      !("multiple" in columnMapping) &&
                        !columnMapping.nullable &&
                        "required"
                    )}
                  >
                    <TitleContent
                      columnName={columnName}
                      {...columnMapping}
                    />
                  </label>
                  <div className={clsx(inlineForm && "col-sm-9")}>
                    {render ? (
                      <FieldRender
                        render={render}
                        objFieldName={objFieldName}
                        nestedName={nestedName}
                      />
                    ) : (
                      columnMapping && (
                        <ValueField
                          name={nestedName}
                          column={columnMapping}
                          size='sm'
                          feedbackLabel={helperText}
                        />
                      )
                    )}
                    {/*{render ? (*/}
                    {/*  "formik" in props ? (*/}
                    {/*    <>TODO</>*/}
                    {/*  ) : (*/}
                    {/*    render(props.fieldProps)*/}
                    {/*  )*/}
                    {/*) : (*/}
                    {/*  <ValueField*/}
                    {/*    name={nestedName}*/}
                    {/*    column={columnMapping}*/}
                    {/*    size='sm'*/}
                    {/*    feedbackLabel={helperText}*/}
                    {/*  />*/}
                    {/*)}*/}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};
