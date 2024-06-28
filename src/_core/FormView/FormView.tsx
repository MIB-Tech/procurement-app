import React, { useEffect, useMemo } from "react";
import { useMapping } from "../hooks/UseMapping";
import { Trans, useTrans } from "../components/Trans";
import { GoBackButton } from "../components/Button/GoBackButton";
import { Button } from "../components/Button";
import {
  FormField,
  FormFields,
  Model,
  MutationMode,
  ViewEnum,
} from "../types/ModelMapping";
import { useAuth } from "../hooks/UseAuth";
import { FormikProvider, useFormik } from "formik";
import { FormViewProps, Input } from "./FormView.types";
import { FormCard, FormValue } from "./FormCard";
import {
  getDefaultFields,
  getInitialValues,
  getRoutePrefix,
  getValidationSchema,
} from "../utils";
import { useCustomMutation } from "../hooks/UseCustomMutation";
import { useCustomQuery } from "../hooks/UseCustomQuery";
import { ModelEnum } from "../../app/modules/types";
import { getColumnMapping } from "../ListingView/Filter/Filter.utils";
import { get } from "lodash";
import { HydraItem } from "../types/hydra.types";
import { isTenantColumn } from "../ListingView/ListingView.utils";
import { ColumnTypeEnum } from "../types/types";
import { ObjectFormat } from "../Column/Object/ObjectColumn";

export const FormView = <M extends ModelEnum>({
  modelName,
  view,
  onMutate,
  ...props
}: FormViewProps<M>) => {
  const { trans } = useTrans();
  const { columnDef, noSortEdges } = useMapping({ modelName });
  const { type, submittable, getMutateInput, navigateTo } = view;
  const isCreateMode = type === ViewEnum.Create;
  const query = useCustomQuery({
    modelName,
    enabled: !isCreateMode && !!view.fetchUri,
    url: isCreateMode ? "" : view.fetchUri || "",
  });
  const { isGranted, tenant } = useAuth();
  const _fields = view?.fields || getDefaultFields(columnDef);
  const fields = (
    Object.keys(_fields) as Array<keyof Model<M> | string>
  ).reduce((obj, columnName) => {
    const field = _fields[columnName] as boolean | FormField<M>;

    if (typeof field === "boolean") {
      if (!field) {
        return obj;
      }
    } else {
      const grantedRoles = field?.grantedRoles;
      if (grantedRoles && !isGranted(grantedRoles)) {
        return obj;
      }
    }

    return { ...obj, [columnName]: field };
  }, {} as FormFields<M>);
  const columnNames = (Object.keys(fields) as Array<keyof Model<M>>).filter(
    (columnName) => {
      const field = fields[columnName];
      if (typeof field === "boolean") {
        return field;
      }

      const grantedRoles = field?.grantedRoles;

      return !grantedRoles || isGranted(grantedRoles);
    }
  );
  const isMultipart = columnNames.some((columnName) => {
    const columnMapping = columnDef[columnName];

    return (
      columnMapping.type === ColumnTypeEnum.Object &&
      (columnMapping.format === ObjectFormat.File ||
        columnMapping.format === ObjectFormat.Image)
    );
  });

  const mutation = useCustomMutation<M>({
    modelName,
    method: isCreateMode ? MutationMode.Post : MutationMode.Put,
    url: isCreateMode
      ? getRoutePrefix(modelName)
      : view.mutateUri || getRoutePrefix(modelName),
    navigateTo,
    requestConfig: isMultipart
      ? {
          params: {
            _method: !isCreateMode ? MutationMode.Put : undefined,
          },
          method: MutationMode.Post,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined,
  });

  const initialValues = useMemo<FormValue<M>>(() => {
    if (!isCreateMode && query.item) {
      return query.item as HydraItem<M>;
    }

    return {
      ...getInitialValues({ columnDef, fields }),
      ...props.initialValues,
    };
  }, [query.item, isCreateMode, columnDef, fields, props.initialValues]);

  const formik = useFormik<FormValue<M>>({
    initialValues,
    validationSchema: getValidationSchema({
      columnDef,
      fields,
      trans,
      noSortEdges,
    }),
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (item, formikHelpers) => {
      await formikHelpers.setTouched({});
      const _columnNames = ["id", ...columnNames] as Array<keyof Model<M>>;
      let input = isMultipart
        ? _columnNames.reduce((fd, columnName) => {
            const _val = item[columnName];
            const columnMapping = columnDef[columnName];
            const name = columnName.toString();
            switch (columnMapping.type) {
              case ColumnTypeEnum.Object:
                switch (columnMapping.format) {
                  case ObjectFormat.File:
                  case ObjectFormat.Image:
                    const file = _val as File | null;
                    if (file) {
                      fd.append(name, file);
                    }
                    break;
                }
                break;
              default:
                fd.append(
                  name,
                  typeof _val === "string" ? _val : JSON.stringify(_val)
                );
            }

            return fd;
          }, new FormData())
        : _columnNames.reduce(
            (input, columnName) => ({
              ...input,
              [columnName]: item[columnName],
            }),
            {} as Input<M>
          );

      if (isMultipart) {
        const form = new FormData();
        for (let property in input) {
          // @ts-ignore
          form.append(property, input[property]);
        }
      }

      const response = await mutation.mutateAsync(
        getMutateInput?.(input) || input
      );
      const mutatedItem = response.data;
      onMutate?.(mutatedItem);
      formikHelpers.resetForm({ values: item });
    },
  });

  useEffect(() => {
    if (mutation.validationErrors) {
      formik.setErrors(mutation.validationErrors);
    }
  }, [mutation.validationErrors]);

  useEffect(() => {
    if (!tenant) return;

    (Object.keys(fields) as Array<keyof Model<M> | string>).forEach(
      (columnName) => {
        if (isTenantColumn({ modelName, columnName })) {
          const value = get(formik.values, columnName);
          const def = getColumnMapping({ modelName, columnName });
          let newValue: HydraItem | Array<HydraItem> = value;
          if ("multiple" in def) {
            if ((value as Array<HydraItem>).length === 0) {
              newValue = [tenant];
            }
          } else {
            if (!value) {
              newValue = tenant;
            }
          }

          formik.setFieldValue(columnName.toString(), newValue);
        }
      }
    );
  }, [tenant]);

  return (
    <FormikProvider value={formik}>
      <div className='mb-3'>
        <div className='text-end'>
          <GoBackButton
            size='sm'
            className='me-2'
          >
            <Trans id='CANCEL' />
          </GoBackButton>
          <Button
            variant='primary'
            size='sm'
            onClick={() => formik.handleSubmit()}
            loading={mutation.isLoading || query.isLoading}
            loadingLabel={query.isLoading ? "LOADING" : undefined}
            disabled={submittable && !submittable({ formik, isGranted })}
          >
            <Trans id='SAVE' />
          </Button>
        </div>
      </div>
      <FormCard
        className='card-bordered'
        modelName={modelName}
        formView={view}
        formValue={formik.values}
      />
    </FormikProvider>
  );
};
