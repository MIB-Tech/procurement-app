/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {usePageData} from '../../../_metronic/layout/core'
import {useTrans} from '../../../_custom/components/Trans'
import {useQuery} from 'react-query'
import axios from 'axios'
import {useAuth} from '../../../_custom/hooks/UseAuth'


const useStatisticQuery = () => {
  const {clinic} = useAuth()
  return useQuery({
    queryKey: ['BUDGET_MONITORING', clinic?.id],
    queryFn: () => axios.get<Array<{
      productSectionName: string,
      amount: number,
      committed: number,
    }>>('/custom/statistics/product-section-budgets', {
      params: {
        clinicId: clinic?.id,
      },
    }),
  })
}

export const BudgetMonitoringPage: FC = () => {
  const {setPageTitle} = usePageData()
  const {data} = useStatisticQuery()
  const {trans} = useTrans()

  useEffect(() => {
    setPageTitle(trans({id: 'DASHBOARD'}))
  }, [])

  return (
    <>

    </>
  )
}