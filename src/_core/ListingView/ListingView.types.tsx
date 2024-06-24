import { UseQueryOptions } from "react-query";
import { DateField, Model } from "../types/ModelMapping";
import { Filter } from "./Filter/Filter.types";
import { PaginationInput } from "./Pagination/Pagination.types";
import { ModelEnum } from "../../app/modules/types";
import { DatesSetArg } from "@fullcalendar/core";
import { HydraItem, JsonldCollectionResponse } from "../types/hydra.types";
import { AxiosResponse } from "axios";

export type ListingQueryProps<M extends ModelEnum> = {
  modelName: M;
  path?: string;
  queryKey?: any;
  params?: Params<M>;
  options?: Partial<
    UseQueryOptions<AxiosResponse<JsonldCollectionResponse<M>>>
  >;
};
export type ViewProps<M> = {
  modelName: M;
};

export type ListingViewProps<M extends ModelEnum> = {
  modelName: M;
  parentModelName?: ModelEnum;
  parent?: HydraItem<M>;
};

export enum ListingModeEnum {
  Listing = "LISTING",
  Calendar = "CALENDAR",
  Gallery = "GALLERY",
}

export type ExtendedProps<M extends ModelEnum> = {
  hydraItem: HydraItem;
  dateField: DateField<M>;
};
export type BasicFilter<M extends ModelEnum> = Partial<
  Record<keyof Model<M> | string, any>
>;
export type Params<M extends ModelEnum> = {
  mode?: ListingModeEnum;
  search?: string;
  sort?: SortInput<M>;
  filter?: Filter<M>;
  basicFilter?: BasicFilter<M>;
} & PaginationInput;
export type Direction = "asc" | "desc";
export type SortInput<M extends ModelEnum> = Partial<
  Record<keyof Model<M>, Direction>
>;
export type DatesSet = Pick<DatesSetArg, "start" | "end">;
