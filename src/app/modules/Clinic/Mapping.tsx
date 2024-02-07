import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.Clinic> = {
  modelName: ModelEnum.Clinic,
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
    abbreviation: {
      type: ColumnTypeEnum.String,
      length: 3,
      uppercase: true
    },
    address: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    ice: {
      type: ColumnTypeEnum.String
    },
    taxId: {
      type: ColumnTypeEnum.String
    },
    cnss: {
      type: ColumnTypeEnum.String
    },
    amount: {
      type: ColumnTypeEnum.Number
    },
    status: {
      type: ColumnTypeEnum.String
    },
    constructionStartAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true
    },
    constructionEndAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true
    },
    purchaseOrderAllowed: {
      type: ColumnTypeEnum.Boolean
    },
    users: {
      type: ModelEnum.User,
      multiple: true
    },
    city: {
      type: ModelEnum.City
    },
    services: {
      type: ModelEnum.Service,
      multiple: true
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    purchaseNeeds: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        abbreviation: true,
        status: true,
        city: true,
        purchaseOrderAllowed: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        abbreviation: true,
        address: true,
        ice: true,
        taxId: true,
        cnss: true,
        amount: true,
        constructionStartAt: true,
        constructionEndAt: true,
        purchaseOrderAllowed: true,
        city: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        abbreviation: true,
        address: true,
        amount: true,
        constructionEndAt: true,
        purchaseOrderAllowed: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        address: true,
        ice: true,
        taxId: true,
        cnss: true,
        amount: true,
        constructionStartAt: true,
        constructionEndAt: true,
        purchaseOrderAllowed: true,
      }
    }
  ]
};
export default mapping;