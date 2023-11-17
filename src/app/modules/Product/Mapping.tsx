import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Product> = {
  modelName: ModelEnum.Product,
  icon: '/general/gen017.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ProductListing
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ProductDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ProductDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ProductCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ProductUpdate,
    }
  ]
};

export default mapping;
