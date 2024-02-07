import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Service> = {
  modelName: ModelEnum.Service,
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
    blocs: {
      type: ModelEnum.Bloc,
      multiple: true
    },
    clinic: {
      type: ModelEnum.Clinic
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        clinic: true,
        blocs: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        clinic: true,
        blocs: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        clinic: true,
        blocs: true
      }
    },
    {
      type:ViewEnum.Detail,
      columns:{
        name:true,
        clinic:true,
        blocs:true
      }
    }

  ]
};

export default mapping;
