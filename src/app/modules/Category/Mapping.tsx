import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Category> = {
  modelName: ModelEnum.Category,
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
    products: {
      type: ModelEnum.Product,
      multiple: true
    },
    parents: {
      type: ModelEnum.Category,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        parents: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        parents: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        parents: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        parents: true
      }
    }
  ]
};

export default mapping;
