import {getRoutePrefix} from '../utils'
import {ListingQueryProps} from '../ListingView/ListingView.types'
import {useMapping} from './UseMapping'
import {filterToParams, serializeSort} from '../ListingView/Filter/Filter.utils'
import {CompoundFilterOperator, Filter, PropertyFilterOperator} from '../ListingView/Filter/Filter.types'
import axios, {AxiosResponse} from 'axios'
import {HydraItem, JsonldCollectionResponse} from '../types/hydra.types'
import {useQuery} from 'react-query'
import {ModelEnum} from '../../app/modules/types'
import {ColumnTypeEnum} from '../types/types'


export const useCollectionQuery = <M extends ModelEnum>({
  modelName,
  queryKey,
  params,
  options,
  path = getRoutePrefix(modelName)
}: ListingQueryProps<M>) => {
  const {searchableColumnNames, columnDef} = useMapping<M>({modelName})
  let _params = {};
  if (params) {
    const { page, itemsPerPage, sort, filter, search } = params;
    _params = { page, itemsPerPage };
    if (sort) {
      _params = { ..._params, ...serializeSort(sort) };
    }

    let _filter: Filter<M> = {
      operator: CompoundFilterOperator.And,
      filters: []
    };

    if (search) {
      _filter.filters = [
        {
          operator: CompoundFilterOperator.Or,
          filters: searchableColumnNames.map(columnName => ({
            property: columnName,
            operator: PropertyFilterOperator.Contain,
            value: search
          }))
        }
      ];
    }
    if (filter) {
      _filter.filters.push(filter);
    }

    if (_filter.filters.length > 0) {
      _params = { ..._params, ...filterToParams(_filter, 'filter', modelName) };
    }
  }

  // QUERY
  const queryFn = () => axios?.get<JsonldCollectionResponse<M>>(path, { params: _params });
  const query = useQuery<AxiosResponse<JsonldCollectionResponse<M>>>({
    queryKey: [path, params, queryKey],
    queryFn,
    ...options
  });

  const { data } = query;
  let collection: HydraItem<M>[] = [];
  let totalCount: number = 0;
  if (data) {
    collection = data.data['hydra:member'];
    totalCount = data.data['hydra:totalItems'];
  }

  return {
    ...query,
    collection,
    totalCount
  };
};