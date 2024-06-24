import { ModelEnum, TENANT_TYPE } from "../../app/modules/types";
import { ListingViewType, Model, ViewEnum } from "../types/ModelMapping";
import { getColumnMapping } from "./Filter/Filter.utils";

export const getListingQueryKey = (modelName: string) => `${modelName}.LISTING`;
export const isTenantColumn = <M extends ModelEnum>({
  modelName,
  columnName,
}: {
  modelName: M;
  columnName: keyof Model<M> | string;
}) => {
  const columnMapping = getColumnMapping({ modelName, columnName });

  return columnMapping?.type === TENANT_TYPE;
};
export const DEFAULT_LISTING_VIEW: ListingViewType<any> = {
  type: ViewEnum.Listing,
};
