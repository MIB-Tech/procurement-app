import React from 'react'
import {ViewProps} from '../ListingView/ListingView.types'
import {Trans} from '../components/Trans'
import {DeleteConfirm} from './DeleteConfirm'
import {useDeleteMutation} from '../hooks/UseDeleteMutation'
import {useItemQuery} from '../hooks/UseItemQuery'


export const DeleteView = ({modelName}: ViewProps) => {
  const mutation = useDeleteMutation({modelName})
  const {item, isLoading} = useItemQuery({modelName})

  return (
    <DeleteConfirm
      isSubmitting={mutation.isLoading}
      title={(
        <Trans
          id="DELETE_CONFIRM.TITLE"
          values={{name: isLoading ? '...' : item?.['@title']}}
        />
      )}
      onConfirm={mutation.mutate}
    />
  )
}
