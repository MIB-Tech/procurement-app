import { UseQueryOptions } from 'react-query';
import { ListingViewType, Model } from '../types/ModelMapping';
import { Filter } from './Filter/Filter.types';
import { PaginationInput } from './Pagination/Pagination.types';
import { ModelEnum } from '../../app/modules/types';


export type ListingQueryProps<M extends ModelEnum> = {
  modelName: M,
  path?: string,
  queryKey?: any
  params?: Params<M>
  options?: Pick<UseQueryOptions, 'enabled'>
}
export type ViewProps = {
  modelName: ModelEnum
}


export type ListingViewProps<M extends ModelEnum> = {
  view: ListingViewType<M>,
  modelName: M
  path?: string
  embedded?: boolean
}
export type Params<M extends ModelEnum> = {
  search?: string
  sort?: SortInput<M>
  filter?: Filter<M>
} & PaginationInput
export type Direction = 'asc' | 'desc'
export type SortInput<M extends ModelEnum> = Partial<Record<keyof Model<M>, Direction>>