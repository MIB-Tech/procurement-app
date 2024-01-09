import {CustomItemActionProps, FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';
import {PurchaseOrderPrint, QUANTITY_STATUS_OPTIONS, QuantityStatusEnum} from './Model';
import moment from 'moment/moment';
import {Trans, useTrans} from '../../../_custom/components/Trans';
import {RouteLinks} from '../../../_custom/components/RouteAction/RouteLinks';
import React, {FC, useMemo, useState} from 'react';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {ReceiptModel} from '../Receipt';
import {Button} from '../../../_custom/components/Button';
import {Modal} from 'react-bootstrap';
import ReportViewer from './components/ReportViewer';
import {useItemQuery} from '../../../_custom/hooks/UseItemQuery';
import {useUri} from '../../../_custom/hooks/UseUri';
import {getNumberUnit} from '../../../_custom/components/NumberUnit';
import {DiscountType} from '../PurchaseOrderProduct/Model';

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
  }
}


const GenerateReceiptButton: FC<CustomItemActionProps<ModelEnum.PurchaseOrder>> = ({item}) => {
  const {trans} = useTrans();
  const {operations} = useAuth();
  const createOperation = operations.find(({resource, operationType}) => {
    return resource.name === ModelEnum.Receipt && operationType === ViewEnum.Create;
  });
  if (!createOperation) {
    return <></>;
  }
  const state: Partial<ReceiptModel> = {
    vendor: item.vendor,
    purchaseOrders: [item]
  };

  return (
    <RouteLinks
      operations={[{...createOperation, title: trans({id: 'GENERATE_RECEIPT'})}]}
      linkProps={{state}}
    />
  );
};

const PrintPurchaseOrderButton: FC<CustomItemActionProps<ModelEnum.PurchaseOrder>> = ({...props}) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.PurchaseOrder;
  const uri = useUri({modelName});
  const {item, isLoading} = useItemQuery<ModelEnum.PurchaseOrder>({
    modelName,
    path: `/print${uri}`,
    enabled: open
  });
  const params = useMemo<PurchaseOrderPrint | undefined>(() => {
    if (!item) return undefined;

    const unit = item?.currency?.code || 'DH';

    return {
      ...item,
      totalExclTax: getNumberUnit({value: item.totalExclTax, precision: 2, unit}),
      totalInclTax: getNumberUnit({value: item.totalInclTax, precision: 2}),
      totalVatTax: getNumberUnit({value: item.totalVatTax, precision: 2}),
      totalDiscount: getNumberUnit({value: item.totalDiscount, precision: 2}), // TODO
      createdAt: moment(item.createdAt).format('L'),
      desiredDeliveryDate: moment(item.desiredDeliveryDate).format('L'),
      purchaseOrderProducts: item.purchaseOrderProducts.map(purchaseOrderProduct => {
        const precision = 2;
        const isPercentCentDiscount = purchaseOrderProduct.discountType === DiscountType.Percent;

        return {
          ...purchaseOrderProduct,
          netPriceExclTax: getNumberUnit({value: purchaseOrderProduct.netPriceExclTax, precision}),
          discount: getNumberUnit({
            value: isPercentCentDiscount ?
              purchaseOrderProduct.discountValue * 100 :
              purchaseOrderProduct.discountValue,
            unit: isPercentCentDiscount ? '%' : unit,
            precision: isPercentCentDiscount ? 2 : precision,
          }),
          vatRate: getNumberUnit({value: purchaseOrderProduct.vatRate, unit: '%', precision}),
          grossPrice: getNumberUnit({value: purchaseOrderProduct.grossPrice, precision}),
          netPrice: getNumberUnit({value: purchaseOrderProduct.netPrice, precision}),
        };
      })
    };
  }, [item]);

  return (
    <div>
      <div className='position-relative'>
        <Button
          size='sm'
          variant='outline-default'
          className='bg-white'
          onClick={() => setOpen(true)}
        >
          <Trans id='PRINT'/>
        </Button>
      </div>
      <Modal
        fullscreen
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header closeButton/>
        <Modal.Body>
          {isLoading && <Trans id='LOADING'/>}
          {params && (
            <ReportViewer
              fileName='purchase-order.mrt'
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

const PrintInvoiceButton: FC<CustomItemActionProps<ModelEnum.PurchaseOrder>> = ({...props}) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.PurchaseOrder;
  const uri = useUri({modelName});
  const {item, isLoading} = useItemQuery<ModelEnum.PurchaseOrder>({
    modelName,
    path: `/print${uri}`,
    enabled: open
  });
  const params = useMemo<PurchaseOrderPrint | undefined>(() => {
    if (!item) return undefined;

    const unit = item?.currency?.code || 'DH';

    return {
      ...item,
      totalExclTax: getNumberUnit({value: item.totalExclTax, precision: 2, unit}),
      totalInclTax: getNumberUnit({value: item.totalInclTax, precision: 2}),
      totalVatTax: getNumberUnit({value: item.totalVatTax, precision: 2}),
      totalDiscount: getNumberUnit({value: item.totalDiscount, precision: 2}), // TODO
      createdAt: moment(item.createdAt).format('L'),
      desiredDeliveryDate: moment(item.desiredDeliveryDate).format('L'),
      purchaseOrderProducts: item.purchaseOrderProducts.map(purchaseOrderProduct => {
        const precision = 2;
        const isPercentCentDiscount = purchaseOrderProduct.discountType === DiscountType.Percent;

        return {
          ...purchaseOrderProduct,
          netPriceExclTax: getNumberUnit({value: purchaseOrderProduct.netPriceExclTax, precision}),
          netPriceInclTax: getNumberUnit({value: purchaseOrderProduct.priceInclTax, precision}),
          discount: getNumberUnit({
            value: isPercentCentDiscount ?
              purchaseOrderProduct.discountValue * 100 :
              purchaseOrderProduct.discountValue,
            unit: isPercentCentDiscount ? '%' : unit,
            precision: isPercentCentDiscount ? 2 : precision,
          }),
          vatRate: getNumberUnit({value: purchaseOrderProduct.vatRate, unit: '%', precision}),
          grossPrice: getNumberUnit({value: purchaseOrderProduct.grossPrice, precision}),
          netPrice: getNumberUnit({value: purchaseOrderProduct.netPrice, precision}),
        };
      })
    };
  }, [item]);

  return (
    <div>
      <div className='position-relative'>
        <Button
          size='sm'
          variant='outline-default'
          className='bg-white'
          onClick={() => setOpen(true)}
        >
          <Trans id='GENERATE_INVOICE'/>
        </Button>
      </div>
      <Modal
        fullscreen
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header closeButton/>
        <Modal.Body>
          {isLoading && <Trans id='LOADING'/>}
          {item && params && (
            <ReportViewer
              fileName={item.taxIncluded ?
                'purchase-order-invoice.tax-included.mrt' :
                'purchase-order-invoice.mrt'
              }
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
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
        {
          render: ({item}) => {
            if (item.status !== QuantityStatusEnum.FullyReceived) {
              return <></>
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
