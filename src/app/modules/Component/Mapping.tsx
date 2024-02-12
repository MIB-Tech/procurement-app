import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Component> = {
  modelName: ModelEnum.Component,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true
      }
    },
    parentProduct: {
      type: ModelEnum.Product,
      title: 'PRODUCT'
    },
    product: {
      type: ModelEnum.Product,
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        product: true,
        quantity: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        quantity: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: true,
        quantity: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        product: true,
      }
    },

  ]
};

export default mapping;
