import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Bloc> = {
  modelName: ModelEnum.Bloc,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    },
    floor: {
      type: ColumnTypeEnum.String
    },
    service: {
      type: ModelEnum.Service
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        floor: true,
        service:true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        floor: true,
        service:true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        floor: true,
        service: true
      }
    }
  ]
};

export default mapping;
