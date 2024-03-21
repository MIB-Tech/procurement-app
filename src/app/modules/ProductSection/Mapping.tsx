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
    rupture: {
      type: ColumnTypeEnum.String
    },
    code: {
      type: ColumnTypeEnum.String
    },
    sortIndex: {
      type: ColumnTypeEnum.String
    },
    products: {
      type: ModelEnum.Product,
      multiple: true
    },
    productSectionsBudgets: {
      type: ModelEnum.ProductSectionBudget
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {

      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        code: true,
        name: true,
        sortIndex: true,
        rupture: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        code: true,
        name: true,
        sortIndex: true,
        rupture: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {}
    }
  ]
};

export default mapping;
