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
    price: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number
    },
    product: {
      type: ModelEnum.Product,
    },
    parentProduct: {
      type: ModelEnum.Product,
      title:'PRODUCT'
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        price: true,
        quantity: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        product: true,
        price: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        parentProduct: true,
        price: true,
        quantity: true,
      }
    }
  ]
};

export default mapping;
