import {FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';
import {QUANTITY_STATUS_OPTIONS, QuantityStatusEnum} from './Model';
import moment from 'moment/moment';
import {HydraItem} from '../../../_custom/types/hydra.types';
import {Link} from 'react-router-dom';
import {Trans, useTrans} from '../../../_custom/components/Trans';
import {RouteLinks} from '../../../_custom/components/RouteAction/RouteLinks';
import React, {FC} from 'react';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {ReceiptModel} from '../Receipt';

const formFields:FormFields<ModelEnum.PurchaseOrder> = {
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
    display: ({item})=> typeof item.taxIncluded === 'boolean'
  }
}

const GenerateReceiptButton:FC<{ item: HydraItem<ModelEnum.PurchaseOrder> }> = ({item}) => {
  const {trans} = useTrans();
  const {operations} = useAuth();
  const createOperation = operations.find(({resource, operationType}) => {
    return resource.name === ModelEnum.Receipt && operationType === ViewEnum.Create
  })
  if (!createOperation) {
    return <></>
  }

  const state:Partial<ReceiptModel> = {
    purchaseOrders: [item]
  }
  return (
    <RouteLinks
      operations={[{...createOperation, title: trans({id: 'GENERATE_RECEIPT'})}]}
      linkProps={{state}}
    />
  )
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
      embeddedForm: true,
      min: 1
    },
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
        totalExclTax: true,
        // totalVatTax: true,
        totalInclTax: true,
        status: true
      }
    },
    {
      type: ViewEnum.Detail,
      customActions: [
        {render: ({item}) => <GenerateReceiptButton item={item}/>}
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
