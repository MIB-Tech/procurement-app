/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {usePageData} from '../../../_metronic/layout/core'
import {useTrans} from '../../../_custom/components/Trans'
import {Widget} from './Widget'
import {useCollectionQuery} from '../../../_custom/hooks/UseCollectionQuery'
import {ModelEnum} from '../../modules/types'
import {Skeleton} from '@mui/material'
import {TableView} from '../../../_custom/ListingView/views/Table/TableView'
import {ListingColumns} from '../../../_custom/types/ModelMapping'
import {NumberUnit} from '../../../_custom/components/NumberUnit'
import {DashboardPage__OLD} from '../__dashboard/DashboardWrapper'

type Block1Type = {
  total: number,
  count: number,
  items: Array<{}>
}

const Block1 = () => {
  const {totalCount, isLoading} = useCollectionQuery<ModelEnum.PurchaseOrder>({
    modelName: ModelEnum.PurchaseOrder,
    params: {itemsPerPage: 0},
  })
  const title = 'Total des bons de commande'

  return (
    <Widget
      variant="primary"
      title={title}
      value={isLoading ? <Skeleton /> : totalCount}
      items={[
        {title: 'Decembre 2023', subTitle: title, value: 0},
        {title: 'Janvier 2024', subTitle: title, value: 0},
        {title: 'Février 2024', subTitle: title, value: 0},
        {title: 'Mars 2024', subTitle: title, value: 0},
      ]}
    />
  )
}

const Block2 = () => {
  const {totalCount, isLoading} = useCollectionQuery<ModelEnum.PurchaseOrder>({
    modelName: ModelEnum.PurchaseOrder,
    params: {itemsPerPage: 0},
  })
  const title = 'Montant TTC des bons de commande'

  return (
    <Widget
      variant="danger"
      title={title}
      value={isLoading ? <Skeleton /> : <NumberUnit value={0} className='text-white' unitProps={{className: 'text-white'}}/>}
      items={[
        {title: 'Acheteur 1', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 2', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 3', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 4', subTitle: title, value: <NumberUnit value={0} />},
      ]}
    />
  )
}

const Block3 = () => {
  const {totalCount, isLoading} = useCollectionQuery<ModelEnum.PurchaseOrder>({
    modelName: ModelEnum.PurchaseOrder,
    params: {itemsPerPage: 0},
  })
  const title = 'Top fournisseurs'

  return (
    <Widget
      variant="info"
      title={title}
      value={isLoading ? <Skeleton /> : <NumberUnit value={0} className='text-white' unitProps={{className: 'text-white'}}/>}
      items={[
        {title: 'Acheteur 1', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 2', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 3', subTitle: title, value: <NumberUnit value={0} />},
        {title: 'Acheteur 4', subTitle: title, value: <NumberUnit value={0} />},
      ]}
    />
  )
}

const Block4 = () => {
  const itemsPerPage = 5
  const {collection, isLoading} = useCollectionQuery<ModelEnum.PurchaseOrder>({
    modelName: ModelEnum.PurchaseOrder,
    params: {
      itemsPerPage,
      sort: {
        createdAt: 'desc',
      },
    },
  })

  return (
    <div className="card card-bordered">
      <div className="card-header border-0">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Bons de commande récents</span>
          <span className="text-muted fw-semibold fs-7">Les {itemsPerPage} derniers bons de commande</span>
        </h3>
      </div>
      <div className="card-body py-1 px-3">
        <TableView
          modelName={ModelEnum.PurchaseOrder}
          columns={{
            vendor: true,
            buyer: true,
            totalInclTax: true,
          } as ListingColumns<ModelEnum.PurchaseOrder>}
          data={collection}
          loading={isLoading}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  )
}
const DashboardPage: FC = () => (
  <>
    <div className="row">
      <div className="col-4">
        <Block1 />
      </div>
      <div className="col-4">
        <Block2 />
      </div>
      <div className="col-4">
        <Block3 />
      </div>
    </div>
    <div className="mt-5">
      <Block4 />
    </div>
    ...
    <DashboardPage__OLD />
  </>
)

const DashboardWrapper: FC = () => {
  const {setPageTitle} = usePageData()
  const {trans} = useTrans()

  useEffect(() => {
    setPageTitle(trans({id: 'DASHBOARD'}))
  }, [])

  return <DashboardPage />
}

export {DashboardWrapper}
