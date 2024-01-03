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
    parent: {
      type: ModelEnum.Category,
      nullable: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        parent: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        parent: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        parent: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        parent: true
      }
    }
  ]
};

export default mapping;
