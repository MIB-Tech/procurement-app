import {FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';
import {QUANTITY_STATUS_OPTIONS} from './Model';
import {InputField} from '../../../_custom/Column/String/InputField';

const formFields:FormFields<ModelEnum.PurchaseOrder> = {
  vendor: true,
  createdAt: {
    helperText: 'NOW_BY_DEFAULT',
  },
  taxIncluded: {
    defaultValue: false,
    render: ({item: {purchaseOrderProducts}}) => (
      <RadioField
        size='sm'
        name='taxIncluded'
        options={[true, false]}
        getOptionLabel={taxIncluded => taxIncluded ? 'TTC' : 'HT'}
        disabled={purchaseOrderProducts.length > 0}
        scrollDisabled
      />
    )
  },
  ref: true,
  externalRef: true,
  desiredDeliveryDate: true,
  currency: {
    helperText: 'MAD_BY_DEFAULT'
  },
  category: true,
  project: true,
  paymentModality: true,
  purchaseOrderProducts: {
    slotProps: {
      root: {
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
      }
    },
    display: ({item})=> typeof item.taxIncluded === 'boolean'
  }
}

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
      format: StringFormat.Date,
      nullable: true
    },
    vendor: {
      type: ModelEnum.Vendor
    },
    currency: {
      type: ModelEnum.Currency,
      nullable: true
    },
    category: {
      type: ModelEnum.PurchaseOrderCategory,
      nullable: true
    },
    project: {
      type: ModelEnum.Project
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: 'DELIVERY_STATUS',
      options: QUANTITY_STATUS_OPTIONS
    },
    paymentModality: {
      type: ModelEnum.PaymentModality
    },
    purchaseOrderAttachments: {
      type: ModelEnum.purchaseOrderAttachment,
      multiple: true,
      embeddedForm: true
    },
    purchaseOrderProducts: {
      type: ModelEnum.PurchaseOrderProduct,
      multiple: true,
      embeddedForm: true
    },
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
        status: true
      }
    },
    {
      type: ViewEnum.Create,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        }
      },
      fields: formFields
    },
    {
      type: ViewEnum.Update,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        }
      },
      fields: {
        orderNumber: {
          render: ({fieldProps}) => <InputField {...fieldProps} disabled/>
        },
        ...formFields
      }
    }
  ]
};

export default mapping;
