import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.DraftOrderLine> = {
  modelName: ModelEnum.DraftOrderLine,
  icon: '/abstract/abs029.svg',
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
      routeKey: RouteKeyEnum.DraftOrderLineListing
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.DraftOrderLineDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.DraftOrderLineDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.DraftOrderLineCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.DraftOrderLineUpdate,
    }
  ]
};

export default mapping;
