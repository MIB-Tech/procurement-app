import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {RouteKeyEnum} from '../Route/Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Project> = {
  modelName: ModelEnum.Project,
  icon: '/general/gen010.svg',
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
      routeKey: RouteKeyEnum.ProjectListing
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ProjectDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ProjectDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ProjectCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ProjectUpdate,
    }
  ]
};

export default mapping;
