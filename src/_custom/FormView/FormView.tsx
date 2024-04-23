import React, {useEffect, useMemo} from 'react'
import {useMapping} from '../hooks/UseMapping'
import {Trans, useTrans} from '../components/Trans'
import {GoBackButton} from '../components/Button/GoBackButton'
import {Button} from '../components/Button'
import {FormFields, Model, MutationMode, ViewEnum} from '../types/ModelMapping'
import {useAuth} from '../hooks/UseAuth'
import {FormikProvider, useFormik} from 'formik'
import {FormViewProps, Input} from './FormView.types'
import {FormCard} from './FormCard'
import {getDefaultFields, getInitialValues, getValidationSchema} from '../utils'
import {useCustomMutation} from '../hooks/UseCustomMutation'
import {useCustomQuery} from '../hooks/UseCustomQuery'
import {ModelEnum} from '../../app/modules/types'
import {isClinicColumn} from '../ListingView/ListingView.utils'

export const FormView = <M extends ModelEnum>({modelName, view, ...props}: FormViewProps<M>) => {
  const {trans} = useTrans()
  const {columnDef, noSortEdges} = useMapping({modelName})
  const {type, submittable, getMutateInput, navigateTo} = view
  const isCreateMode = type === ViewEnum.Create
  const mutation = useCustomMutation<M>({
    modelName,
    mode: isCreateMode ? MutationMode.Post : MutationMode.Put,
    navigateTo,
  })
  const query = useCustomQuery({modelName, enabled: !isCreateMode})
  const {isGranted, clinic, operations} = useAuth()
  const _fields = view?.fields || getDefaultFields(columnDef)
  const fields = (Object.keys(_fields) as Array<keyof Model<M> | string>)
    .filter(columnName => {
      return !clinic || !isClinicColumn({modelName, columnName})
    })
    .reduce(
      (obj, columnName) => {
        const field = _fields[columnName]

        if (typeof field === 'boolean') {
          if (!field) {
            return obj
          }
        } else {
          const grantedRoles = field?.grantedRoles
          if (grantedRoles && !isGranted(grantedRoles)) {
            return obj
          }
        }

        return {...obj, [columnName]: field}
      },
      {} as FormFields<M>,
    )
  const initialValues = useMemo(() => {
    if (!isCreateMode && query.item) {
      return query.item
    }

    return {
      ...getInitialValues({columnDef, fields}),
      ...props.initialValues,
    }
  }, [query.item, isCreateMode, columnDef, fields, props.initialValues])

  const formik = useFormik<Model<M>>({
    initialValues,
    validationSchema: getValidationSchema({columnDef, fields, trans, noSortEdges}),
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (item, formikHelpers) => {
      await formikHelpers.setTouched({})
      const columnNames = (Object.keys(fields) as Array<keyof Model<M>>).filter(columnName => {
        const field = fields[columnName]
        if (typeof field === 'boolean') {
          return field
        }

        const grantedRoles = field?.grantedRoles

        return !grantedRoles || isGranted(grantedRoles)
      })

      const input = columnNames.reduce((input, columnName) => ({
        ...input,
        [columnName]: item[columnName],
      }), {} as Input<M>)
      await mutation.mutateAsync(getMutateInput?.(input) || input)
      formikHelpers.resetForm({values: item})
    },
  })

  console.log(formik.errors)
  useEffect(() => {
    if (mutation.validationErrors) {
      formik.setErrors(mutation.validationErrors)
    }
  }, [mutation.validationErrors])

  // const _operations = useMemo(() => {
  //   if (!initialValues) {
  //     return [];
  //   }
  //
  //   const itemOperations = operations.filter(({resource, operationType}) => {
  //     return resource.name === modelName && [ViewEnum.Listing, ViewEnum.Detail, ViewEnum.Delete].includes(operationType);
  //   });
  //
  //   return /*itemOperationRoutes?.({ item, operations: itemOperations }) ||*/ itemOperations;
  // }, [initialValues]);

  return (
    <FormikProvider value={formik}>
      <div className="mb-3">
        <div className="text-end">
          <GoBackButton size="sm" className="me-2">
            <Trans id="CANCEL" />
          </GoBackButton>
          <Button
            variant="primary"
            size="sm"
            onClick={() => formik.handleSubmit()}
            loading={mutation.isLoading || query.isLoading}
            loadingLabel={query.isLoading ? 'LOADING' : undefined}
            disabled={submittable && !submittable({formik, isGranted})}
          >
            <Trans id="SAVE" />
          </Button>
        </div>
      </div>
      <FormCard
        className="card-bordered"
        modelName={modelName}
        item={formik.values}
        view={view}
        setItem={item => {
          formik.setValues(item, false)
        }}
      />
    </FormikProvider>
  )
}