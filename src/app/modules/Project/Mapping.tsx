import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';


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
    amount: {
      type: ColumnTypeEnum.Number,
      title: 'BUDGET_AMOUNT'
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      title: 'END_DATE'
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      title: 'START_DATE'
    },
    purchaseOrderAllowed: {
      type: ColumnTypeEnum.Boolean
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
        amount: true,
        startAt: true,
        endAt: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        amount: true,
        startAt: true,
        endAt: true,
        purchaseOrderAllowed: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        amount: true,
        startAt: true,
        endAt: true,
        purchaseOrderAllowed: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        amount: true,
        startAt: true,
        endAt: true,
        purchaseOrderAllowed: true
      }
    }
  ]
};

export default mapping;
