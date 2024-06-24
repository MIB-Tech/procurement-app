import { AxiosError, AxiosResponse } from "axios";
import { HydraItem, JsonldErrorCreateResponse } from "../types/hydra.types";
import { CreateViewType, Model, UpdateViewType } from "../types/ModelMapping";
import { ModelEnum } from "../../app/modules/types";

export type SuccessResponse<M extends ModelEnum> = AxiosResponse<HydraItem<M>>;
export type ErrorResponse<M extends ModelEnum> = AxiosError<
  JsonldErrorCreateResponse<Model<M>>
>;
export type Input<M extends ModelEnum> = Partial<Model<M>> | FormData;

export type FormViewProps<M extends ModelEnum> = {
  view: CreateViewType<M> | UpdateViewType<M>;
  modelName: M;
  initialValues?: Partial<Model<M>>;
  onMutate?: (item: Model<M>) => void;
};
export type EditQueryProps<M extends ModelEnum> = {
  modelName: M;
  enabled?: boolean;
  url: string;
};
