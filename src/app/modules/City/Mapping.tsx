import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.City> = {
  modelName: ModelEnum.City,
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
    clinics: {
      type: ModelEnum.Clinic,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        clinics: true
      }
    }
  ]
};

export default mapping;
