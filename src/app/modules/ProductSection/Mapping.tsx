import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.ProductSection> = {
  modelName: ModelEnum.ProductSection,
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
        name: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        products: true
      }
    }
  ]
};

export default mapping;
