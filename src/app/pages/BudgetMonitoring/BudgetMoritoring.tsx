/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {usePageData} from '../../../_metronic/layout/core'
import {useTrans} from '../../../_custom/components/Trans'
import {useQuery} from 'react-query'
import axios from 'axios'
import {useAuth} from '../../../_custom/hooks/UseAuth'
import {NumberUnit} from '../../../_custom/components/NumberUnit'
import {StatisticsWidget5} from '../../../_metronic/partials/widgets'


export const BudgetMonitoringPage: FC = () => {
  const {setPageTitle} = usePageData()
  const {clinic} = useAuth()
  const {data, isLoading} = useQuery({
    queryKey: ['BUDGET_MONITORING', clinic?.id],
    queryFn: () => axios.get<Array<{
      productSectionName: string,
      amount: number,
      committed: string,
    }>>('/custom/statistics/product-section-budgets', {
      params: {
        clinicId: clinic?.id,
      },
    }),
  })
  const {trans} = useTrans()

  useEffect(() => {
    setPageTitle(trans({id: 'BUDGET_MONITORING'}))
  }, [])
  const collection = data?.data || []
  const totalAmount = collection.reduce(
    (totalAmount, current)=> totalAmount + current.amount,
    0
  )
  const totalCommitted = collection.reduce(
    (totalCommitted, current)=> totalCommitted + parseFloat(current.committed),
    0
  )

  const totalRest = totalAmount - totalCommitted

  return (
    <>
      <div className="row">
        <div className="col-4">
          <StatisticsWidget5
            className="card-bordered"
            svgIcon="/media/icons/duotune/general/gen032.svg"
            color="white"
            iconColor="primary"
            title={<NumberUnit value={totalAmount} precision={0} />}
            description="Total (Budgeté)"
          />
        </div>
        <div className="col-4">
          <StatisticsWidget5
            className="card-bordered"
            svgIcon="/media/icons/duotune/general/gen032.svg"
            color="white"
            iconColor="primary"
            title={<NumberUnit value={totalCommitted} precision={0} />}
            description="Total (Engagé)"
          />
        </div>
        <div className="col-4">
          <StatisticsWidget5
            className="card-bordered"
            svgIcon="/media/icons/duotune/general/gen032.svg"
            color="white"
            iconColor="primary"
            title={<NumberUnit value={totalRest} precision={0} />}
            description="Total (Reste)"
          />
        </div>
      </div>
      <div className="card card-bordered mt-5">
        {/*<div className="card-header border-0">*/}
        {/*  <h3 className="card-title align-items-start flex-column">*/}
        {/*    <span className="card-label fw-bold fs-3 mb-1">Bons de commande récents</span>*/}
        {/*    <span className="text-muted fw-semibold fs-7">Les {itemsPerPage} derniers bons de commande</span>*/}
        {/*  </h3>*/}
        {/*</div>*/}
        <div className="card-body py-1 px-3">
          <div className="table-responsive">
            <table className="table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0">
              <thead className="fs-7 text-gray-400 text-uppercase">
              <tr>
                <th>Section Budgétaire</th>
                <th className='text-end'>Budgeté</th>
                <th className='text-end'>Engagé</th>
                <th className='text-end'>Reste</th>
              </tr>
              </thead>
              <tbody>
              {(data?.data || []).map(({productSectionName, amount, committed}) => (
                <tr key={productSectionName}>
                  <td>{productSectionName}</td>
                  <td className='text-end'><NumberUnit value={amount}/></td>
                  <td className='text-end'><NumberUnit value={parseFloat(committed)}/></td>
                  <td className='text-end'><NumberUnit value={amount - parseFloat(committed)}/></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}