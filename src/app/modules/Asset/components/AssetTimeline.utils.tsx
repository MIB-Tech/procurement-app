import { AbstractModel } from '../../../../_custom/types/types';
import { TimelineOptions } from 'vis-timeline';
import { useCollectionQuery } from '../../../../_custom/hooks/UseCollectionQuery';
import { ModelEnum } from '../../types';
import { getRoutePrefix } from '../../../../_custom/utils';
import { CompoundFilterOperator, PropertyFilterOperator } from '../../../../_custom/ListingView/Filter/Filter.types';
import { useState } from 'react';
import moment from 'moment/moment';
import { useTrans } from '../../../../_custom/components/Trans';


export const useWorkOrderCollectionQuery = ({
  id,
  start,
  end
}: AbstractModel & Pick<TimelineOptions, 'start' | 'end'>) => {

  return useCollectionQuery<ModelEnum.WorkOrder>({
    modelName: ModelEnum.WorkOrder,
    path: `${getRoutePrefix(ModelEnum.Asset)}/${id}${getRoutePrefix(ModelEnum.WorkOrder)}/timeline`,
    params: {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: 'startAt',
            operator: PropertyFilterOperator.GreaterThanOrEqual,
            value: start
          },
          {
            property: 'endAt',
            operator: PropertyFilterOperator.LessThanOrEqual,
            value: end
          }
        ]
      }
    }
  });
};
export const defaultOptions: TimelineOptions = {
  moveable: false,
  zoomable: false,
  minHeight: 250
};

export const useOptions = () => {
  const { locale } = useTrans();

  return useState<TimelineOptions>({
    locale,
    moveable: false,
    zoomable: false,
    minHeight: 250,
    start: moment().startOf('y').format(),
    end: moment().endOf('y').format()
  })
}