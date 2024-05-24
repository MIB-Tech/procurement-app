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
import { FormCard } from "./FormCard";
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
import { isClinicColumn } from "../ListingView/ListingView.utils";

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
  const mutation = useCustomMutation<M>({
    modelName,
    method: isCreateMode ? MutationMode.Post : MutationMode.Put,
    url: isCreateMode
      ? getRoutePrefix(modelName)
      : view.mutateUri || getRoutePrefix(modelName),
    navigateTo,
  });
  const query = useCustomQuery({
    modelName,
    enabled: !isCreateMode && !!view.fetchUri,
    url: isCreateMode ? "" : view.fetchUri || "",
  });
  const { isGranted, clinic } = useAuth();
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
  const initialValues = useMemo<Model<M>>(() => {
    if (!isCreateMode && query.item) {
      return query.item as Model<M>;
    }

    return {
      ...getInitialValues({ columnDef, fields }),
      ...props.initialValues,
    };
  }, [query.item, isCreateMode, columnDef, fields, props.initialValues]);

  const formik = useFormik<Model<M>>({
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

      const input = columnNames.reduce(
        (input, columnName) => ({
          ...input,
          [columnName]: item[columnName],
        }),
        {} as Input<M>
      );
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
    if (!clinic) return;

    (Object.keys(fields) as Array<keyof Model<M> | string>).forEach(
      (columnName) => {
        if (isClinicColumn({ modelName, columnName })) {
          const value = get(formik.values, columnName);
          const def = getColumnMapping({ modelName, columnName });
          let newValue:
            | HydraItem<ModelEnum.Clinic>
            | Array<HydraItem<ModelEnum.Clinic>> = value;
          if ("multiple" in def) {
            if ((value as Array<HydraItem<ModelEnum.Clinic>>).length === 0) {
              newValue = [clinic];
            }
          } else {
            if (!value) {
              newValue = clinic;
            }
          }

          formik.setFieldValue(columnName.toString(), newValue);
        }
      }
    );
  }, [clinic]);

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
        item={formik.values}
        view={view}
        setItem={(item) => formik.setValues(item, false)}
      />
    </FormikProvider>
  );
};
