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
    amount: {
      type: ColumnTypeEnum.Number
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
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
        name: true,
      },
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
    }
  ]
};

export default mapping;
