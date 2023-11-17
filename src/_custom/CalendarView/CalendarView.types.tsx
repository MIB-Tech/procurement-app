import { UseQueryOptions } from 'react-query';
import { CalendarViewType } from '../types/ModelMapping';
import { ModelEnum } from '../../app/modules/types';
import { DatesSetArg } from '@fullcalendar/core';
import { Params } from '../ListingView/ListingView.types';


export type DatesSet = Pick<DatesSetArg, 'start' | 'end'>
export type CalendarParams<M extends ModelEnum> = Pick<Params<M>, 'search' | 'filter'>;
export type CalendarQueryProps<M extends ModelEnum> = {
  modelName: M,
  path?: string,
  params?: CalendarParams<M>
  options?: Pick<UseQueryOptions, 'enabled'>
  datesSet: DatesSet
} & Pick<CalendarViewType<M>, 'dateFields'>


export type CalendarViewProps<M extends ModelEnum> = {
  view: CalendarViewType<M>,
  modelName: M
  path?: string
}