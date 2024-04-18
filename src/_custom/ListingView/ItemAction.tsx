import {ModelEnum} from '../../app/modules/types'
import {HydraItem} from '../types/hydra.types'
import {ListingViewType} from '../types/ModelMapping'
import {useAuth} from '../hooks/UseAuth'
import {OPERATION_TYPE_CONFIG} from '../../app/modules/Operation/Model'
import {RouteActionDropdown} from '../components/RouteAction/RouteActionDropdown'
import React from 'react'

export const ItemAction = <M extends ModelEnum>({modelName, item, itemOperationRoutes}: {
  modelName: M,
  item: HydraItem<M>
} & Pick<ListingViewType<M>, 'itemOperationRoutes'>) => {
  const {operations} = useAuth()
  let itemOperations = operations.filter(({operationType, resource}) => {

    return resource.name === modelName && !OPERATION_TYPE_CONFIG[operationType].isStatic
  })

  if (itemOperationRoutes) {
    itemOperations = itemOperationRoutes({item, operations: itemOperations})
  }

  if (itemOperations.length === 0) {
    return <></>
  }

  return (
    <RouteActionDropdown
      operations={itemOperations}
      params={{id: item['@uid']}}
    />
  )
}