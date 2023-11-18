import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.ApplicantService> = {
  modelName: ModelEnum.ApplicantService,
  icon: '/finance/fin001.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    draftOrders: {
      type: ModelEnum.DraftOrder,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ApplicantServiceListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ApplicantServiceDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ApplicantServiceDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ApplicantServiceCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ApplicantServiceUpdate,
    }
  ]
};

export default mapping;
