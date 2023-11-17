import React, { useEffect, useMemo } from 'react';
import { useMapping } from '../hooks/UseMapping';
import { Trans, useTrans } from '../components/Trans';
import { GoBackButton } from '../components/Button/GoBackButton';
import { Button } from '../components/Button';
import { FormFields, Model, MutationMode } from '../types/ModelMapping';
import { useAuth } from '../hooks/UseAuth';
import { FormikProvider, useFormik } from 'formik';
import { FormViewProps, Input } from './FormView.types';
import { ToolbarWrapper } from '../ListingView/ToolbarWrapper';
import { FormCard } from './FormCard';
import { getDefaultFields, getInitialValues, getValidationSchema } from '../utils';
import { useCustomMutation } from '../hooks/UseCustomMutation';
import { useCustomQuery } from '../hooks/UseCustomQuery';
import { ModelEnum } from '../../app/modules/types';
import { isLocationColumn } from '../ListingView/ListingView';

export const FormView = <M extends ModelEnum>({ modelName, view }: FormViewProps<M>) => {
  const { trans } = useTrans();
  const { columnDef } = useMapping({ modelName });
  const { mode = MutationMode.Post, submittable } = view;
  const mutation = useCustomMutation<M>({ modelName, mode });
  const isCreateMode = mode === MutationMode.Post;
  const query = useCustomQuery({ modelName, enabled: !isCreateMode });
  const { isGrantedOneOf/*, location*/ } = useAuth();
  const _fields = view?.fields || getDefaultFields(columnDef);
  const fields = (Object.keys(_fields) as Array<keyof Model<M> | string>)
  // .filter(columnName=>{
  //   return !location || !isLocationColumn({ modelName, columnName });
  // })
  .reduce(
    (obj, columnName) => {
      const field = _fields[columnName];

      if (typeof field === 'boolean') {
        if (!field) {
          return obj;
        }
      } else {
        const grantedRoles = field?.grantedRoles;
        if (grantedRoles && !isGrantedOneOf(grantedRoles)) {
          return obj;
        }
      }

      return { ...obj, [columnName]: field };
    },
    {} as FormFields<M>
  );
  const initialValues = useMemo(() => {
    if (!isCreateMode && query.item) {
      return query.item
    }

    return getInitialValues({ columnDef, fields });
  }, [query.item, isCreateMode, columnDef, fields]);

  const formik = useFormik<Model<M>>({
    initialValues,
    validationSchema: getValidationSchema({ columnDef, fields, trans }),
    enableReinitialize: true,
    onSubmit: item => {
      const columnNames = (Object.keys(fields) as Array<keyof Model<M>>).filter(columnName => {

        const field = fields[columnName]
        if (typeof field === 'boolean') {
          return field;
        }

        const grantedRoles = field?.grantedRoles

        return !grantedRoles || isGrantedOneOf(grantedRoles);
      });
      const input = columnNames.reduce((input, columnName) => ({
        ...input,
        [columnName]: item[columnName]
      }), {} as Input<M>);
      mutation.mutate(input);
    }
  });

  useEffect(() => {
    if (mutation.validationErrors) {
      formik.setErrors(mutation.validationErrors);
    }
  }, [mutation.validationErrors]);

  return (
    <FormikProvider value={formik}>
      <ToolbarWrapper>
        <div className='text-end'>
          <GoBackButton size='sm' className='me-2'>
            <Trans id='CANCEL' />
          </GoBackButton>
          <Button
            variant='primary'
            size='sm'
            onClick={() => {
              formik.handleSubmit();
            }}
            loading={mutation.isLoading || query.isLoading}
            loadingLabel={query.isLoading ? 'LOADING' : undefined}
            disabled={submittable && !submittable({ item: formik.values })}
          >
            <Trans id='SAVE' />
          </Button>
        </div>
      </ToolbarWrapper>
      <FormCard
        modelName={modelName}
        item={formik.values}
        view={view}
        setItem={item => {
          formik.setValues(item, false);
        }}
        inlineFormGroup
      />
    </FormikProvider>
  );
};