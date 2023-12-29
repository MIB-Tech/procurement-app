import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.Project> = {
  modelName: ModelEnum.Project,
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
    budgetAmount: {
      type: ColumnTypeEnum.Number
    },
    endDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    startDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    purchaseOrderAllowed:{
      type:ColumnTypeEnum.Boolean
    },
    purchaseNeeds: {
      type: ModelEnum.PurchaseNeed,
      multiple: true
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        budgetAmount: true,
        startDate: true,
        endDate: true
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        budgetAmount: true,
        startDate: true,
        endDate: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        budgetAmount: true,
        startDate: true,
        endDate: true
      }
    }
  ]
};

export default mapping;
