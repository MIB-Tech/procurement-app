import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Category> = {
  modelName: ModelEnum.Category,
  icon: '/abstract/abs029.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    products: {
      type: ModelEnum.Product,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.CategoryListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.CategoryDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.CategoryDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.CategoryCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.CategoryUpdate,
    }
  ]
};

export default mapping;
