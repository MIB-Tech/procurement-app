import {FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';
import {QUANTITY_STATUS_OPTIONS, QuantityStatusEnum} from './Model';
import moment from 'moment/moment';
import React from 'react';
import {PrintInvoiceButton} from './components/PrintInvoiceButton';
import {PrintPurchaseOrderButton} from './components/PrintPurchaseOrderButton';
import {GenerateReceiptButton} from './components/GenerateReceiptButton';

const formFields: FormFields<ModelEnum.PurchaseOrder> = {
  vendor: true,
  createdAt: {
    defaultValue: moment().format()
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
    display: ({item}) => typeof item.taxIncluded === 'boolean'
  },
  attachments: true,
};


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
    validationStatus: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    validatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true
    },
    validatedBy: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    totalExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2
    },
    totalInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2
    },
    totalVatTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2
    },
    totalDiscount: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2
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
      nullable: true,
      title: 'NATURE'
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
    attachments: {
      type: ModelEnum.purchaseOrderAttachment,
      multiple: true
    },
    purchaseOrderProducts: {
      type: ModelEnum.PurchaseOrderProduct,
      multiple: true,
      embeddedForm: true,
      min: 1
    },
    invoice: {
      type: ModelEnum.Invoice
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      itemOperationRoutes: ({operations, item}) => operations.filter(({operationType}) => {
        switch (operationType) {
          case ViewEnum.Update:
          case ViewEnum.Delete:
            return item.status === QuantityStatusEnum.Unreceived;
          default:
            return true;
        }
      }),
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
        validationStatus:true,
        validatedBy:true,
        validatedAt:true,
        totalExclTax: true,
        // totalVatTax: true,
        totalInclTax: true,
        status: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        orderNumber: true,
        status: true,
        taxIncluded: {
          render: ({item: {taxIncluded}}) => taxIncluded ? 'TTC' : 'HT'
        },
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        validationStatus:true,
        validatedBy:true,
        validatedAt:true,
        vendor: true,
        currency: true,
        project: true,
        category: true,
        purchaseOrderProducts: true,
        attachments: true,
        paymentModality: true,
        invoice: true,
        totalExclTax: true,
        totalVatTax: true,
        totalDiscount: true,
        totalInclTax: true,
      },
      customActions: [
        {
          render: ({item}) => {
            if (item.status !== QuantityStatusEnum.FullyReceived) {
              return <></>;
            }

            return <PrintInvoiceButton item={item}/>;
          }
        },
        {render: ({item}) => <PrintPurchaseOrderButton item={item}/>},
        {render: ({item}) => <GenerateReceiptButton item={item}/>},
      ],
      itemOperationRoutes: ({operations, item}) => operations.filter(({operationType}) => {
        switch (operationType) {
          case ViewEnum.Update:
          case ViewEnum.Delete:
            return item.status === QuantityStatusEnum.Unreceived;
          default:
            return true;
        }
      })
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
      submittable: ({item}) => item.status === QuantityStatusEnum.Unreceived,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        }
      },
      fields: formFields
    }
  ]
};

export default mapping;
