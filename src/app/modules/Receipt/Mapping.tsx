import {CustomItemActionProps, FormFields, Model, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import React, {FC, useMemo, useState} from 'react';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator
} from '../../../_custom/ListingView/Filter/Filter.types';
import {NestedArrayField} from '../../../_custom/Column/Model/Nested/NestedArrayField';
import {FieldProps} from '../../../_custom/Column/controls/fields';
import {useCollectionQuery} from '../../../_custom/hooks/UseCollectionQuery';
import {useFormikContext} from 'formik';
import {ReceiptProductModel} from '../ReceiptProduct';
import {Button} from '../../../_custom/components/Button';
import {HydraItem} from '../../../_custom/types/hydra.types';
import {Trans} from '../../../_custom/components/Trans';
import moment from 'moment';
import {ArraySchema} from 'yup';
import {Modal} from 'react-bootstrap';
import {useUri} from '../../../_custom/hooks/UseUri';
import {useItemQuery} from '../../../_custom/hooks/UseItemQuery';
import ReportViewer from '../PurchaseOrder/components/ReportViewer';
import {ReceiptPrint} from './Model';

// const ReceiptProducts = ({item}: { item: Model<ModelEnum.Receipt> }) => {
//   const {collection} = useCollectionQuery({
//     modelName: ModelEnum.ReceiptProduct
//   });
//
//   return (
//     <div className='card card-bordered'>
//       <div className='card-body'>
//         <Grid container spacing={2}>
//           <Grid item sm={4}>
//             <label className='d-flex fw-semibold text-truncate text-muted'>
//               <Trans id='VENDOR'/>
//             </label>
//             <ModelAutocompleteField
//               size='sm'
//               name='vendor'
//               modelName={ModelEnum.Vendor}
//             />
//           </Grid>
//           <Grid item sm={8}>
//             <label className='d-flex fw-semibold text-truncate text-muted'>
//               <Trans id='PURCHASE_ORDERS'/>
//             </label>
//             <ModelAutocompleteField
//               disabled={!item.vendorId}
//               size='sm'
//               name='purchaseOrderIds'
//               modelName={ModelEnum.PurchaseOrder}
//               multiple
//               getParams={filter => {
//                 const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
//                   operator: CompoundFilterOperator.And,
//                   filters: [
//                     filter,
//                     {
//                       property: 'vendor',
//                       operator: PropertyFilterOperator.Equal,
//                       value: item.vendorId
//                     }
//                   ]
//                 };
//
//                 return newFilter;
//               }}
//             />
//           </Grid>
//           <Grid item sm={12}>
//             <TableView
//               data={collection}
//               modelName={ModelEnum.DesiredProduct}
//               columns={{
//                 address: true,
//                 quantity: true,
//                 status: true
//               }}
//               renderAction={({item}) => {
//                 const checked = values.checkedItems.some(checkedItem => checkedItem.id === item.id);
//
//                 return (
//                   <Checkbox
//                     checked={checked}
//                     disabled={!!item.receiptProduct}
//                     onChange={e => {
//                       setCheckedItems(checked ?
//                         checkedItems.filter(checkedItem => checkedItem.id !== item.id) :
//                         [...checkedItems, item]);
//                     }}
//                   />
//                 );
//               }}
//             />
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

const PrintReceiptButton: FC<CustomItemActionProps<ModelEnum.Receipt>> = ({...props}) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.Receipt;
  const uri = useUri({modelName});
  const {item, isLoading} = useItemQuery<ModelEnum.Receipt>({
    modelName,
    path: `/print${uri}`,
    enabled: open
  });
  const params = useMemo<ReceiptPrint | undefined>(() => {
    if (!item) return undefined;

    return {
      ...item,
      receivedAt: moment(item.receivedAt).format('L'),
      lines: item.receiptProducts.map(receiptProduct => {
        const {desiredProduct} = receiptProduct;
        const {designation, purchaseOrderProduct, quantity} = desiredProduct;
        const {product, note} = purchaseOrderProduct;

        return {
          ...receiptProduct,
          reference: product.code,
          name: `${designation}${note ? `\n\n${note}`: ''}`,
          desiredProductQuantity: quantity,
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
              fileName='receipt.mrt'
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};


const PurchaseOrdersField = ({name}: FieldProps) => {
  const {values, setFieldValue} = useFormikContext<Model<ModelEnum.Receipt>>();
  const {vendor, purchaseOrders} = values;
  const {isLoading, refetch} = useCollectionQuery<ModelEnum.DesiredProduct>({
    modelName: ModelEnum.DesiredProduct,
    params: {
      filter: {
        property: 'purchaseOrderProduct.purchaseOrder',
        operator: PropertyFilterOperator.In,
        value: purchaseOrders
      }
    },
    options: {enabled: false}
  });

  return (
    <div className='d-flex gap-3'>
      <div className='flex-grow-1'>
        <ModelAutocompleteField
          size='sm'
          modelName={ModelEnum.PurchaseOrder}
          multiple
          disabled={!vendor && purchaseOrders.length === 0}
          name={name}
          getParams={filter => {
            const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
              operator: CompoundFilterOperator.And,
              filters: [
                filter,
                {
                  property: 'vendor',
                  operator: PropertyFilterOperator.Equal,
                  value: vendor
                }
              ]
            };

            return newFilter;
          }}
        />
      </div>
      <div>
        <Button
          size='sm'
          variant='primary'
          disabled={purchaseOrders.length === 0}
          loading={isLoading}
          loadingLabel='SHOW'
          onClick={async () => {
            refetch().then(r => {
              const desiredProducts = r.data?.data['hydra:member'] as Array<HydraItem<ModelEnum.DesiredProduct>>;
              const receiptProducts: Array<Partial<ReceiptProductModel>> = desiredProducts.map(desiredProduct => ({
                desiredProduct,
                quantity: desiredProduct.restQuantity,
                restQuantity: desiredProduct.restQuantity,
                note: '',
                desiredProductQuantity: desiredProduct.quantity,
              }));
              setFieldValue('receiptProducts', receiptProducts);
            });
          }}
        >
          <Trans id='SHOW'/>
        </Button>
      </div>
    </div>
  );
};

const formFields: FormFields<ModelEnum.Receipt> = {
  externalRef: true,
  receivedAt: {
    defaultValue: moment().format()
  },
  vendor: {
    slotProps: {
      root: {
        sm: 3
      }
    },
    render: ({fieldProps, item}) => (
      <ModelAutocompleteField
        size='sm'
        modelName={ModelEnum.Vendor}
        {...fieldProps}
        disabled={item.purchaseOrders.length > 0}
      />
    )
  },
  purchaseOrders: {
    slotProps: {
      root: {
        sm: 9
      }
    },
    render: ({fieldProps}) => <PurchaseOrdersField {...fieldProps}/>
  },
  receiptProducts: {
    slotProps: {
      root: {
        sm: 12
      }
    },
    // display: ({item}) => item.purchaseOrders.length > 0,
    render: ({item, fieldProps}) => (
      <NestedArrayField
        modelName={ModelEnum.ReceiptProduct}
        disableInsert
        disableDelete
        {...fieldProps}
      />
    )
  }
}

const mapping: ModelMapping<ModelEnum.Receipt> = {
  modelName: ModelEnum.Receipt,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    receiptNumber: {
      type: ColumnTypeEnum.String
    },
    receivedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    receiptProducts: {
      type: ModelEnum.ReceiptProduct,
      multiple: true,
      embeddedForm: true,
      disableInsert: true,
      min: 1,
      schema: (schema: ArraySchema<any>) => schema.test(
        'VALIDATION.RECEIPT.RECEIPT_PRODUCTS',
        'VALIDATION.RECEIPT.RECEIPT_PRODUCTS',
        (receiptProducts: any) => {

          return (receiptProducts as ReceiptProductModel[]).some(({validated}) => validated);
          // const {desiredProducts} = context.parent as PurchaseOrderProductModel
          // const validatedDesiredProducts = desiredProducts.filter(({}) => false)
          // const count = desiredProducts.reduce(
          //   (count, desiredProduct) => count + desiredProduct.quantity,
          //   0
          // );
          // return count === quantity;
        }
      )
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        receivedAt: true,
        purchaseOrders: true
      }
    },
    {
      type: ViewEnum.Detail,
      customActions: [
        {render: ({item}) => <PrintReceiptButton item={item}/>},
      ],
      columns: {
        receiptNumber: true,
        externalRef: true,
        receivedAt: true,
        receiptProducts: true,
      }
    },
    {
      type: ViewEnum.Create,
      getMutateInput: item => ({
        ...item,
        receiptProducts: item.receiptProducts?.filter(({validated}) => validated)
      }),
      navigateTo: item => item['@id'],
      slotProps: {
        item: {
          sm: 6
        }
      },
      fields: formFields
    },
    {
      type: ViewEnum.Update,
      slotProps: {
        item: {
          sm: 6
        }
      }
    }
  ]
};

export default mapping;
