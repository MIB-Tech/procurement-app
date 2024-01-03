import {ArraySchema, ObjectSchema} from 'yup';
import {ReactNode} from 'react';
import {HydraItem} from '../../types/hydra.types';
import {CompoundFilter} from '../../ListingView/Filter/Filter.types';
import {ModelEnum} from '../../../app/modules/types';

// TODO type: ModelEnum => type: M
type ToManyColumn<M extends ModelEnum> = {
  type: ModelEnum
  multiple: true
  min?: number
  max?: number
  schema?: ArraySchema<any> | ((schema: ArraySchema<any>) => ArraySchema<any>)
}

type ToOneColumn<M extends ModelEnum> = {
  type: ModelEnum
  searchable?: boolean
  schema?: ObjectSchema<any>
}

export type ModelColumn<M extends ModelEnum> =
  {
    embeddedForm?: true
    disableInsert?: true
    autoSelect?: true
    itemSubTitle?: (props: { item: HydraItem<M> }) => ReactNode
    getAutocompleteParams?: (filter: CompoundFilter<M>) => CompoundFilter<M>
  } & (ToManyColumn<M> | ToOneColumn<M>)
