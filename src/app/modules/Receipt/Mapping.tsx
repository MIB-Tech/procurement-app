import {Model, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import React, {useEffect} from 'react';
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

const PurchaseOrdersField = ({name}: FieldProps) => {
  const {values, setFieldValue} = useFormikContext<Model<ModelEnum.Receipt>>();
  const {vendor, purchaseOrders} = values;
  const {collection: desiredProducts} = useCollectionQuery<ModelEnum.DesiredProduct>({
    modelName: ModelEnum.DesiredProduct,
    params: {
      filter: {
        property: 'purchaseOrderProduct.purchaseOrder',
        operator: PropertyFilterOperator.In,
        value: purchaseOrders
      }
    }
  });

  useEffect(() => {
    const receiptProducts: Array<Partial<ReceiptProductModel>> = desiredProducts.map(desiredProduct => ({
      quantity: 0,
      note: '',
      desiredProduct,
      desiredProductQuantity: desiredProduct.quantity
    }));
    setFieldValue('receiptProducts', receiptProducts);
  }, [desiredProducts]);

  return (
    <div className='d-flex'>
      <div className='flex-grow-1'>
        <ModelAutocompleteField
          size='sm'
          modelName={ModelEnum.PurchaseOrder}
          multiple
          // disabled={!vendor}
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
      <Button
        size='sm'
        variant='primary'
      >
        Afficher
      </Button>
    </div>
  );
};
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
      format: StringFormat.Datetime
    },
    externalRef: {
      type: ColumnTypeEnum.String
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    receiptProducts: {
      type: ModelEnum.ReceiptProduct,
      multiple: true,
      embeddedForm: true,
      disableInsert: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        receivedAt: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        externalRef: true,
        receivedAt: true,
        vendor: {
          render: ({fieldProps}) => (
            <ModelAutocompleteField
              size='sm'
              modelName={ModelEnum.Vendor}
              {...fieldProps}
            />
          )
        },
        purchaseOrders: {
          render: ({fieldProps}) => <PurchaseOrdersField {...fieldProps}/>
        },
        receiptProducts: {
          slotProps: {
            root: {
              sm: 12
            }
          },
          display: ({item}) => item.purchaseOrders.length > 0,
          render: ({item, fieldProps}) => {

            return (
              <NestedArrayField
                modelName={ModelEnum.ReceiptProduct}
                disableInsert
                disableDelete
                {...fieldProps}
              />
            );
          }
        }
      }
    }
  ]
};

export default mapping;
