import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Company> = {
  modelName: ModelEnum.Company,
  icon: '/ecommerce/ecm008.svg',
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
      routeKey: RouteKeyEnum.CompanyListing
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.CompanyDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.CompanyDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.CompanyCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.CompanyUpdate,
    }
  ]
};

export default mapping;
