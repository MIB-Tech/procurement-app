import React from 'react'
import {FieldProps} from '../../controls/fields'
import {CreateViewType, Model, ViewEnum} from '../../../types/ModelMapping'
import {useField} from 'formik'
import {useMapping} from '../../../hooks/UseMapping'
import {FormCard} from '../../../FormView/FormCard'
import {ModelEnum} from '../../../../app/modules/types'


export const NestedField = <M extends ModelEnum>({name, modelName}: FieldProps & {modelName: M}) => {
  const [{value: item}, , {setValue}] = useField<Model<M>>({name})
  const {views} = useMapping<M>({modelName})

  const view = views?.find(view => view.type === ViewEnum.Create) as CreateViewType<M> | undefined

  if (!view) {
    return (
      <>
        VIEW NOT FOUND
      </>
    )
  }

  return (
    <FormCard
      name={name}
      modelName={modelName}
      item={item}
      view={view}
      setItem={item => setValue(item, false)}
      className="card-bordered border-2"
    />
  )
}