import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';


const mapping: ModelMapping<ModelEnum.PurchaseOrder> = {
  modelName: ModelEnum.PurchaseOrder,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    orderNumber: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    taxIncluded: {
      type: ColumnTypeEnum.Boolean
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    totalExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
    },
    totalInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount
    },
    totalVatTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true
    },
    vendor: {
      type: ModelEnum.Vendor
    },
    currency: {
      type: ModelEnum.Currency
    },
    category: {
      type: ModelEnum.PurchaseOrderCategory,
      nullable: true
    },
    project: {
      type: ModelEnum.Project,
      nullable: true
    },
    purchaseOrderProducts: {
      type: ModelEnum.PurchaseOrderProduct,
      multiple: true,
      embeddedForm: true
    },
    status: {
      type: ColumnTypeEnum.Boolean
    },
    purchaseOrderAttachments: {
      type: ModelEnum.purchaseOrderAttachment,
      multiple: true,
      embeddedForm: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      filterColumns: {
        orderNumber: true,
        ref: true,
        externalRef: true,
        vendor: {
          quickFilter: true
        },
        desiredDeliveryDate: {
          quickFilter: true
        },
        createdAt: {
          quickFilter: true
        }
      },
      sortColumns: {
        createdAt: true,
        desiredDeliveryDate: true,
        orderNumber: true,
        ref: true,
        externalRef: true,
      },
      columns: {
        createdAt: true,
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        totalExclTax: true,
        // totalVatTax: true,
        totalInclTax: true,
      }
    },
    {
      type: ViewEnum.Create,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          xl: 2,
        }
      },
      fields: {
        vendor: true,
        createdAt: true,
        taxIncluded: {
          defaultValue: true,
          render: ({item}) => (
            <RadioField
              size='sm'
              name='taxIncluded'
              options={[true, false]}
              getOptionLabel={taxIncluded => taxIncluded ? 'TTC' : 'HT'}
            />
          )
        },
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        currency: true,
        category: true,
        project: true,
        purchaseOrderProducts: {
          slotProps: {
            root: {
              sm: 12,
              md: 12,
              xl: 12,
            }
          }
        }
      }
    }
  ]
};

export default mapping;
