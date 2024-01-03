import {CustomItemActionProps, FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField';
import {QUANTITY_STATUS_OPTIONS, QuantityStatusEnum} from './Model';
import moment from 'moment/moment';
import {Trans, useTrans} from '../../../_custom/components/Trans';
import {RouteLinks} from '../../../_custom/components/RouteAction/RouteLinks';
import React, {FC, useState} from 'react';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {ReceiptModel} from '../Receipt';
import {Button} from '../../../_custom/components/Button';
import {Modal} from 'react-bootstrap';
import ReportViewer from './components/ReportViewer';
import {useItemQuery} from '../../../_custom/hooks/UseItemQuery';
import {useUri} from '../../../_custom/hooks/UseUri';
import {getNumberUnit} from '../../../_custom/components/NumberUnit';

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

const example = {
  // not found
  'comment': 'Un paragraphe est une section de texte en prose vouée au développement d\'un point particulier souvent au moyen de plusieurs phrases, dans la continuité du précédent et du suivant. Sur le plan typographique, le paragraphe est compris entre deux alinéas, qui s\'analysent aussi comme une « ponctuation blanche ».',
  'groupement1': 'group 1',
  'groupement2': 'group 2',
  // diff key
  'taxType': 'HT',
  grossTotalExclTax: 0,
  //
  'orderNumber': 'TEST01',
  'createdAt': '26-11-2023',
  'desiredDeliveryDate': '05-11-2023',
  'externalRef': '',
  'ref': 'groupement',
  totalInclTax: 0,
  totalVatTax: 48080.40,
  'vendor': {
    'name': 'MERI',
    // diff key: address is an object
    'address': 'Adresse 1',
    'postalCode': 12345,
    'phoneNumber': '+2126966998855'
  },
  'currency': {
    'code': 'MAD'
  },
  'purchaseOrderProducts': [
    {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 machine a cafe grain 30 watt delonghi 55602machine a cafe grain 30 watt delonghi 55602',
      'quantity': 1,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      // diff key
      'grossTotalExclTax': 0,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    },
    {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    },
    {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    },
    {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    },
    {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }, {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }, {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }, {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }, {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }, {
      'product': {
        'code': 'P01'
      },
      'designation': 'machine a cafe grain 30 watt delonghi 55602 ',
      'quantity': 1,
      'grossTotalExclTax': 0,
      'vatRate': 1,
      'grossPrice': 100,
      'netPrice': 100,
      'discount': {
        'discountType': 'Amount',
        'value': 15
      }
    },
    {
      'product': {
        'code': 'P02'
      },
      'designation': 'Product 2',
      'quantity': 2,
      'grossTotalExclTax': 0,
      'vatRate': 0.2,
      'grossPrice': 200,
      'netPrice': 200,
      'discount': {
        'discountType': 'Amount',
        'value': 20
      }
    },
    {
      'product': {
        'code': 'P03'
      },
      'designation': 'Product 3',
      'quantity': 3,
      'grossTotalExclTax': 0,
      'vatRate': 0.3,
      'grossPrice': 300,
      'netPrice': 300,
      'discount': {
        'discountType': 'Amount',
        'value': 30
      }
    },
    {
      'product': {
        'code': 'P04'
      },
      'designation': 'Product 4',
      'quantity': 4,
      'grossTotalExclTax': 0,
      'vatRate': 0.4,
      'grossPrice': 400,
      'netPrice': 400,
      'discount': {
        'discountType': 'Amount',
        'value': 50
      }
    }
  ]
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
          {item && (
            <ReportViewer
              fileName='purchase-order.mrt'
              params={example}
              // params={{
              //   ...item,
              //   taxType: item.taxIncluded ? 'HT': 'TTC',
              //   grossTotalExclTax: item.totalExclTax,
              //   vendor: {
              //     ...item.vendor,
              //     ...item.vendor.defaultAddress,
              //   },
              //   purchaseOrderProducts: item.purchaseOrderProducts.map(purchaseOrderProduct=>({
              //     ...purchaseOrderProduct,
              //     grossTotalExclTax: getNumberUnit({value: purchaseOrderProduct.netPriceExclTax, precision: 2}),
              //     discount: {
              //       discountType: purchaseOrderProduct.discountType,
              //       value: purchaseOrderProduct.discountValue
              //     },
              //     vatRate: getNumberUnit({value: purchaseOrderProduct.vatRate, unit: '%', precision: 2}),
              //     grossPrice: getNumberUnit({value: purchaseOrderProduct.grossPrice, precision: 2}),
              //     netPrice: getNumberUnit({value: purchaseOrderProduct.netPrice, precision: 2}),
              //   }))
              // }}
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
