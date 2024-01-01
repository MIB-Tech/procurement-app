import React, {useEffect, useMemo} from 'react';
import {useMapping} from '../hooks/UseMapping';
import {Trans, useTrans} from '../components/Trans';
import {GoBackButton} from '../components/Button/GoBackButton';
import {Button} from '../components/Button';
import {FormFields, Model, MutationMode, ViewEnum} from '../types/ModelMapping';
import {useAuth} from '../hooks/UseAuth';
import {FormikProvider, useFormik} from 'formik';
import {FormViewProps, Input} from './FormView.types';
import {FormCard} from './FormCard';
import {getDefaultFields, getInitialValues, getValidationSchema} from '../utils';
import {useCustomMutation} from '../hooks/UseCustomMutation';
import {useCustomQuery} from '../hooks/UseCustomQuery';
import {ModelEnum} from '../../app/modules/types';

import {isLocationColumn} from '../ListingView/ListingView.utils';


export const FormView = <M extends ModelEnum>({modelName, view, ...props}: FormViewProps<M>) => {
  const {trans} = useTrans();
  const {columnDef} = useMapping({modelName});
  const {type, submittable, getMutateInput} = view;
  const isCreateMode = type === ViewEnum.Create;
  const mutation = useCustomMutation<M>({modelName, mode: isCreateMode ? MutationMode.Post: MutationMode.Put});
  const query = useCustomQuery({ modelName, enabled: !isCreateMode });
  const { isGranted, location } = useAuth();
  const _fields = view?.fields || getDefaultFields(columnDef);
  const fields = (Object.keys(_fields) as Array<keyof Model<M> | string>)
  .filter(columnName=>{
    return !location || !isLocationColumn({ modelName, columnName });
  })
  .reduce(
    (obj, columnName) => {
      const field = _fields[columnName];

      if (typeof field === 'boolean') {
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
    },
    {} as FormFields<M>
  );
  const initialValues = useMemo(() => {
    if (!isCreateMode && query.item) {
      return query.item
    }

    return {
      ...getInitialValues({ columnDef, fields }),
      ...props.initialValues
    };
  }, [query.item, isCreateMode, columnDef, fields, props.initialValues]);

  const formik = useFormik<Model<M>>({
    initialValues,
    validationSchema: getValidationSchema({ columnDef, fields, trans }),
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: item => {
      const columnNames = (Object.keys(fields) as Array<keyof Model<M>>).filter(columnName => {

        const field = fields[columnName];
        if (typeof field === 'boolean') {
          return field;
        }

        const grantedRoles = field?.grantedRoles;

        return !grantedRoles || isGranted(grantedRoles);
      });

      const input = columnNames.reduce((input, columnName) => ({
        ...input,
        [columnName]: item[columnName]
      }), {} as Input<M>)
      mutation.mutate(getMutateInput?.(input) || input);
    }
  });

  useEffect(() => {
    if (mutation.validationErrors) {
      formik.setErrors(mutation.validationErrors);
    }
  }, [mutation.validationErrors]);

  return (
    <FormikProvider value={formik}>
      <div className='mb-3'>
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
      </div>
      <FormCard
        className='card-bordered'
        modelName={modelName}
        item={formik.values}
        view={view}
        setItem={item => {
          formik.setValues(item, false);
        }}
      />
    </FormikProvider>
  );
};