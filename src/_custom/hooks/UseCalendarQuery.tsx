import { getRoutePrefix } from '../utils';
import { useMapping } from './UseMapping';
import { filterToParams } from '../ListingView/Filter/Filter.utils';
import {
  CompoundFilter,
  CompoundFilterOperator,
  Filter,
  PropertyFilterOperator
} from '../ListingView/Filter/Filter.types';
import axios from 'axios';
import { HydraItem, JsonldCollectionResponse } from '../types/hydra.types';
import { useQuery } from 'react-query';
import { ModelEnum } from '../../app/modules/types';
import { CalendarQueryProps } from '../CalendarView/CalendarView.types';


export const useCalendarQuery = <M extends ModelEnum>({
  modelName,
  params,
  options,
  dateFields,
  datesSet,
  path = getRoutePrefix(modelName) + '/calendar'
}: CalendarQueryProps<M>) => {
  const { searchableColumnNames } = useMapping<M>({ modelName });
  let _params = {};
  if (params) {
    const { filter, search } = params;

    let _filter: CompoundFilter<M> = {
      operator: CompoundFilterOperator.And,
      filters: []
    };

    if (filter && ('property' in filter || filter.filters.length)) {
      _filter.filters.push(filter);
    }

    let dateFieldsFilter: CompoundFilter<M> = {
      operator: CompoundFilterOperator.Or,
      filters: []
    };
    dateFields.forEach(dateField => {
      const { startProperty, endProperty } = dateField;
      const dateFilter:CompoundFilter<M> = {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            operator: CompoundFilterOperator.Or,
            filters: [
              {
                property: startProperty,
                operator: PropertyFilterOperator.IsNull
              },
              {
                property: startProperty,
                operator: PropertyFilterOperator.LessThanOrEqual,
                value: datesSet.end
              }
            ]
          }
        ]
      }
      if (endProperty) {
        dateFilter.filters.push({
          operator: CompoundFilterOperator.Or,
          filters: [
            {
              property: endProperty,
              operator: PropertyFilterOperator.IsNull
            },
            {
              property: endProperty,
              operator: PropertyFilterOperator.GreaterThanOrEqual,
              value: datesSet.start
            }
          ]
        })
      }

      dateFieldsFilter.filters.push(dateFilter);
    });
    if (dateFieldsFilter.filters.length) {
      _filter.filters.push(dateFieldsFilter)
    }

    if (search) {
      _filter.filters.push({
        operator: CompoundFilterOperator.Or,
        filters: searchableColumnNames.map(columnName => ({
          property: columnName,
          operator: PropertyFilterOperator.Contain,
          value: search
        }))
      })
    }

    if (_filter.filters.length) {
      _params = { ..._params, ...filterToParams(_filter, 'filter', modelName) };
    }
  }

  // QUERY
  const queryKey = [path, _params];
  const queryFn = () => axios.get<JsonldCollectionResponse<M>>(path, { params: _params });
  const query = useQuery({ queryKey, queryFn, ...options });

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