import { AxiosError, AxiosResponse } from 'axios';
import { HydraItem, JsonldErrorCreateResponse } from '../types/hydra.types';
import { FormViewType, Model } from '../types/ModelMapping';
import { ModelEnum } from '../../app/modules/types';


export type SuccessResponse<M extends ModelEnum> = AxiosResponse<HydraItem<M>>
export type ErrorResponse<M extends ModelEnum> = AxiosError<JsonldErrorCreateResponse<Model<M>>>
export type Input<M extends ModelEnum> = Record<keyof Model<M>, any>

export type FormViewProps<M extends ModelEnum> = {
  view: Omit<FormViewType<M>, 'type' | 'routeKey'>,
  modelName: M
}
export type EditQueryProps<M extends ModelEnum> = {
  modelName: M
  enabled?: boolean
  url?: string
}