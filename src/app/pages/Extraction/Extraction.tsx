/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {usePageData} from '../../../_metronic/layout/core'
import {Trans, useTrans} from '../../../_custom/components/Trans'
import {useQuery} from 'react-query'
import axios from 'axios'
import {FormikProvider, useFormik} from 'formik'
import {HydraItem} from '../../../_custom/types/hydra.types'
import {ModelEnum} from '../../modules/types'
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField'
import {Grid} from '@mui/material'
import {useCollectionQuery} from '../../../_custom/hooks/UseCollectionQuery'
import {CompoundFilterOperator, PropertyFilterOperator} from '../../../_custom/ListingView/Filter/Filter.types'
import {ValueField} from '../../../_custom/Column/ValueField'
import {StringFormat} from '../../../_custom/Column/String/StringColumn'
import {ColumnTypeEnum} from '../../../_custom/types/types'
import {Button} from '../../../_custom/components/Button'
import {utils, writeFile} from 'xlsx'
import moment from 'moment/moment'
import {TypeColum} from '../../../_custom/types/ModelMapping'

type Value = {query: HydraItem | null}
const initialValues: Value = {
  query: null,
}
export const ExtractionPage: FC = () => {
  const {setPageTitle} = usePageData()
  const formik = useFormik({
    initialValues,
    // validationSchema: {
    //   query: relation()
    // },
    onSubmit: async () => {
      await refetch()
    },
  })
  const {values, handleSubmit} = formik
  const {query} = values
  const queryId = query?.id
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['EXTRACTION'],
    queryFn: () => {
      let params = queryParams.reduce(
        (queryParams, queryParam) => {
          let value: any
          switch (queryParam.paramType) {
            case ColumnTypeEnum.String:
            case ColumnTypeEnum.Number:
            case ColumnTypeEnum.Boolean:
            case StringFormat.Date:
            case StringFormat.Datetime:
              // @ts-ignore
              value = values[queryParam.name]
              break
            default:
              // @ts-ignore
              value = (values[queryParam.name] as HydraItem).id
          }

          return {
            ...queryParams,
            [queryParam.name]: value,
          }
        },
        {},
      )

      return axios.get<Array<{}>>(`/custom/queries/${queryId}/execute`, {params})
    },
    enabled: false,
    onSuccess: ({data}) => {

      const workSheet = utils.json_to_sheet(data)
      const workBook = utils.book_new()
      utils.book_append_sheet(workBook, workSheet, 'Sheet1')

      const fileName = `${moment().format()}.xlsx`
      writeFile(workBook, fileName)
    },
  })

  const {collection: queryParams, isLoading: queryParamsLoading} = useCollectionQuery<ModelEnum.QueryParam>({
    modelName: ModelEnum.QueryParam,
    options: {enabled: !!queryId},
    params: {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: 'query',
            operator: PropertyFilterOperator.Equal,
            value: queryId,
          },
        ],
      },
    },
  })

  const {trans} = useTrans()

  useEffect(() => {
    setPageTitle(trans({id: 'EXTRACTION'}))
  }, [])

  return (
    <FormikProvider value={formik}>
      <div className="card card-bordered">
        <div className="card-body">
          <div>
            <div className="fw-bold"><Trans id="QUERY" /></div>
            <div className="d-flex">
              <div className="flex-grow-1">
                <ModelAutocompleteField
                  modelName={ModelEnum.Query}
                  name="query"
                  size="sm"
                />
              </div>
              <div className="ms-2">
                <Button
                  variant="primary"
                  size="sm"
                  loading={queryParamsLoading}
                  onClick={() => handleSubmit()}
                >
                  <Trans id="EXPORT" />
                </Button>
              </div>
            </div>
          </div>
          {queryParams.length > 0 && (
            <div className="mt-5">
              <div className="card card-bordered">
                <div className="card-header">
                  <div className="card-title">
                    <Trans id="PARAMS" />
                  </div>
                </div>
                <div className="card-body">
                  {queryParams.map(({id, paramType, name, label}) => {
                    let column:TypeColum
                    switch (paramType) {
                      case ColumnTypeEnum.String:
                        column = {
                          type: paramType
                        }
                        break
                      case ColumnTypeEnum.Number:
                        column = {
                          type: paramType
                        }
                        break
                      case ColumnTypeEnum.Boolean:
                        column = {
                          type: paramType
                        }
                        break
                      case StringFormat.Date:
                      case StringFormat.Datetime:
                        column = {
                          type: ColumnTypeEnum.String,
                          format: paramType
                        }
                        break
                      default:
                        column = {
                          type: paramType
                        }
                    }

                    return (
                      <Grid key={id} item sm={4}>
                        <div className="fw-bold">{label}</div>
                        <ValueField
                          column={column}
                          name={name}
                          size="sm"
                        />
                      </Grid>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormikProvider>
  )
}