import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.PaymentModality> = {
  modelName: ModelEnum.PaymentModality,
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

    PurchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    vendors: {
      type: ModelEnum.Vendor,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        // name: true
      }
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
        vendors: true,
        PurchaseOrders: true
      }
    }
  ]
};

export default mapping;
