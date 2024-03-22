import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";
import {CLINIC_STATUS_OPTIONS, ClinicStatusEnum} from "../PurchaseOrder/Model";


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
      uppercase: true
    },
    address: {
      type: ColumnTypeEnum.String,
      nullable: false
    },
    ice: {
      type: ColumnTypeEnum.String
    },
    taxId: {
      type: ColumnTypeEnum.String
    },
    cnss: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    constructionAmount: {
      type: ColumnTypeEnum.Number,
      nullable: true
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: CLINIC_STATUS_OPTIONS,
      nullable: true,
      inline: true,
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
      type: ColumnTypeEnum.Boolean,
      nullable: true
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
    },
    deliveryDepots: {
      type: ModelEnum.DeliveryDepot,
      multiple: true,
      embeddedForm: true,
      nullable: false
    },
    budgets: {
      type: ModelEnum.Budget,
      multiple: true,
      nullable: false
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        status: true,
        city: true,
        purchaseOrderAllowed: true
      }
    },
    {
      type: ViewEnum.Create,
      slotProps: {item: {sm: 4}},
      fields: {
        name: {slotProps: {root: {sm: 8}}},
        abbreviation: true,
        address: {slotProps: {root: {sm: 8}}},
        city: true,
        ice: true,
        taxId: true,
        cnss: true,
        constructionAmount: {slotProps: {root: {sm: 4}}},
        constructionStartAt: true,
        constructionEndAt: true,
        status: {defaultValue: ClinicStatusEnum.UnderConstruction},
        purchaseOrderAllowed: true,
        deliveryDepots: {
          slotProps: {
            root: {sm: 12}
          }
        }
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        abbreviation: true,
        address: {slotProps: {root: {sm: 6}}},
        constructionAmount: {slotProps: {root: {sm: 6}}},
        constructionEndAt: {slotProps: {root: {sm: 6}}},
        status: {slotProps: {root: {sm: 6}}},
        purchaseOrderAllowed: true,
        deliveryDepots: {
          slotProps: {
            root: {sm: 12}
          }
        }
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        address: true,
        ice: true,
        taxId: true,
        cnss: true,
        constructionAmount: true,
        status: true,
        constructionStartAt: true,
        constructionEndAt: true,
        purchaseOrderAllowed: true,
        deliveryDepots: true
      }
    }
  ]
};
export default mapping;