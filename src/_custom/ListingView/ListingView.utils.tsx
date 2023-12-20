import {ModelEnum} from '../../app/modules/types';
import {ListingViewType, Model, ViewEnum} from '../types/ModelMapping';
import {getColumnMapping} from './Filter/Filter.utils';


export const getListingQueryKey = (modelName: string) => `${modelName}.LISTING`;
export const isLocationColumn = <M extends ModelEnum>({modelName, columnName}: {
  modelName: M,
  columnName: keyof Model<M> | string
}) => {
  const columnMapping = getColumnMapping({modelName, columnName});

  return columnMapping?.type === ModelEnum.Location;
};
export const RELATED_MODELS = [
  ModelEnum.User
];
export const DEFAULT_VIEW: ListingViewType<any> = {
  type: ViewEnum.Listing
};