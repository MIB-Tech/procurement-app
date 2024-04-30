import {ModelEnum} from '../../app/modules/types'
import React, {Fragment, HTMLAttributes, useMemo} from 'react'
import {useMapping} from '../hooks/UseMapping'
import {useParams} from 'react-router-dom'
import {useAuth} from '../hooks/UseAuth'
import {useCurrentOperation} from '../../_metronic/layout/components/header/page-title/DefaultTitle'
import {useItemQuery} from '../hooks/UseItemQuery'
import {DetailViewType, ViewEnum} from '../types/ModelMapping'
import clsx from 'clsx'
import {ModelCellSkeleton} from '../ListingView/views/Table/ModelCell'
import {SVG} from '../components/SVG/SVG'
import {Trans} from '../components/Trans'
import {stringToI18nMessageKey} from '../utils'
import {RouteLinks} from '../components/RouteAction/RouteLinks'
import {DEFAULT_DETAIL_VIEW} from './DetailView'

export const ItemOverview = <M extends ModelEnum>({modelName, children}: {
  modelName: M
} & HTMLAttributes<HTMLDivElement>) => {
  const {views} = useMapping<M>({modelName})
  const {id: uid} = useParams<{id: string}>()
  const {operations} = useAuth()
  const currentOperation = useCurrentOperation()
  const {item, isLoading} = useItemQuery<M>({
    modelName,
    // enabled: isOverview || (typeof column !== 'boolean' && column?.as === 'TAB')
  })

  const view = (views?.find(view => view.type === ViewEnum.Detail) || DEFAULT_DETAIL_VIEW) as DetailViewType<M>
  const {itemOperationRoutes, customActions} = view
  const _operations = useMemo(() => {
    if (!item) return []

    const itemOperations = operations.filter(({resource, operationType}) => {
      if (resource.name !== modelName) return false

      return currentOperation?.operationType &&
        [ViewEnum.Listing, ViewEnum.Update, ViewEnum.Delete, ViewEnum.Detail]
          .filter(viewEnum => viewEnum !== currentOperation.operationType)
          .includes(operationType)
    })

    return itemOperationRoutes?.({item, operations: itemOperations}) || itemOperations
  }, [item, currentOperation])

  return (
    <div className="card mb-3">
      <div className={clsx('card-body', children && 'pb-0')}>
        <div className={clsx('d-flex flex-wrap flex-xs-nowrap', children && 'mb-3')}>
          {isLoading && (
            <ModelCellSkeleton
              iconSize={75}
              titleHeight={26}
              subTitleHeight={25}
            />
          )}
          {item?.['@icon'] && (
            <div className="symbol symbol-50px me-3">
              <div className="symbol-label bg-light-primary">
                <SVG path={item['@icon']} size="3x" variant="primary" />
              </div>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-wrap fw-semibold fs-5 text-gray-500 ">
                  {item && <Trans id={stringToI18nMessageKey(item?.['@type'])} />}
                </div>
                <div className="d-flex align-items-center">
                  <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bold mt-1 me-3">
                    {item?.['@title']}
                  </a>
                </div>
                {/*<Help overlay='Copier' placement='right' className='mt-1 d-flex'>*/}
                {/*  <a*/}
                {/*    href='#'*/}
                {/*    className='d-flex align-items-center bg-gray-200 rounded ps-2 text-muted text-hover-primary'*/}
                {/*    onClick={e => {*/}
                {/*      e.preventDefault();*/}
                {/*      if (uid) {*/}
                {/*        navigator.clipboard.writeText(uid);*/}
                {/*      }*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <small className='fw-bold fs-8'>*/}
                {/*      {uid}*/}
                {/*    </small>*/}
                {/*    <IconButton path='/general/gen054.svg' size='2'/>*/}
                {/*  </a>*/}
                {/*</Help>*/}
              </div>
              <div className="d-flex gap-3">
                {item && customActions?.map(({render}, index) => (
                  <Fragment key={index}>
                    {render({item})}
                  </Fragment>
                ))}
                {uid && (
                  <RouteLinks
                    operations={_operations}
                    params={{id: uid}}
                    // useContextualTitle
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}