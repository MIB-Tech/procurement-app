import React, {FC} from 'react'
import {useField} from 'formik'
import {useMutation} from 'react-query'
import axios, {AxiosResponse} from 'axios'
import {getRoutePrefix} from '../../../utils'
import {FileUploaderField, FileUploaderFieldProps} from '../../controls/fields/FileUploaderField'
import {HydraItem} from '../../../types/hydra.types'
import {ViewProps} from '../../../ListingView/ListingView.types'
import {ErrorResponse, SuccessResponse} from '../../../types/types'


type Props = Omit<FileUploaderFieldProps, 'onDrop'> & ViewProps

export const ModelFileField: FC<Props> = ({name, modelName, ...props}) => {
  const [{value}, , {setValue}] = useField<Array<HydraItem>>({name})
  const {mutate, isLoading} = useMutation<AxiosResponse<HydraItem>, ErrorResponse<any>, Record<any, any>>(
    input => axios.post(
      getRoutePrefix(modelName),
      input,
      {headers: {'Content-Type': 'multipart/form-data'}},
    ),
    {
      onSuccess: ({data}) => {
        setValue([...value, data])
      },
    },
  )
  const deleteMutation = useMutation<SuccessResponse, any, string>(
    uri => axios.delete(uri),
    {
      onSuccess: (r, uri) => {
        setValue(value.filter(({'@id': id}) => id !== uri))
      },
    },
  )


  return (
    <FileUploaderField
      name={name}
      onDrop={(acceptedFiles = []) => {
        let bodyFormData = new FormData()
        acceptedFiles.forEach(file => {
          bodyFormData.append('file', file)
          mutate(bodyFormData)
        })
      }}
      isUploading={isLoading}
      onDelete={({'@id': id}) => {
        deleteMutation.mutate(id)
      }}
      {...props}
    />
  )
}