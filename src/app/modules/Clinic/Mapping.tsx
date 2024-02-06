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
    amount:{
      type:ColumnTypeEnum.Number
    },
    constructionStartAt:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Date,
      nullable:true
    },
    constructionEndAt:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Date,
      nullable:true
    },
    purchaseOrderAllowed:{
      type:ColumnTypeEnum.Boolean
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
    purchaseOrders:{
      type:ModelEnum.PurchaseOrder,
      multiple:true
    },
    purchaseNeeds:{
      type:ModelEnum.PurchaseNeedProduct,
      multiple:true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        taxId: true,
        cnss: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        taxId: true,
        cnss: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        abbreviation: true,
        parent: true,
        address: true,
        ice: true,
        taxId: true,
        cnss: true
      }
    },
  ]
};
export default mapping;