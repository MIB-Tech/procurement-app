import {
  FormFields,
  ModelMapping,
  ViewEnum,
} from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";
import { ModelAutocompleteField } from "../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField";
import React from "react";
import { NestedArrayField } from "../../../_custom/Column/Model/Nested/NestedArrayField";
import moment from "moment";
import { ArraySchema } from "yup";
import { PrintReceiptButton } from "./PrintReceiptButton";
import { PurchaseOrdersField } from "./PurchaseOrdersField";
import { ReceiptModel } from "./index";

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

const formFields: FormFields<ModelEnum.Receipt> = {
  externalRef: true,
  receivedAt: {
    defaultValue: moment().format(),
  },
  vendor: {
    slotProps: {
      root: {
        sm: 3,
      },
    },
    render: ({ fieldProps, item }) => (
      <ModelAutocompleteField
        size='sm'
        modelName={ModelEnum.Vendor}
        {...fieldProps}
        disabled={item.purchaseOrders.length > 0}
      />
    ),
  },
  purchaseOrders: {
    slotProps: {
      root: {
        sm: 9,
      },
    },
    render: ({ fieldProps }) => <PurchaseOrdersField {...fieldProps} />,
  },
  receiptProducts: {
    slotProps: {
      root: {
        sm: 12,
      },
    },
    // display: ({item}) => item.purchaseOrders.length > 0,
    render: ({ item, fieldProps }) => (
      <NestedArrayField
        modelName={ModelEnum.ReceiptProduct}
        disableInsert
        disableDelete
        {...fieldProps}
      />
    ),
  },
};

const mapping: ModelMapping<ModelEnum.Receipt> = {
  modelName: ModelEnum.Receipt,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    receiptNumber: {
      type: ColumnTypeEnum.String,
    },
    receivedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true,
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    vendor: {
      type: ModelEnum.Vendor,
      readOnly: true,
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
      readOnly: true,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true,
    },
    receiptProducts: {
      type: ModelEnum.ReceiptProduct,
      multiple: true,
      embeddedForm: true,
      disableInsert: true,
      min: 1,
      schema: (schema: ArraySchema<any>) =>
        schema.test(
          "VALIDATION.RECEIPT.RECEIPT_PRODUCTS",
          "VALIDATION.RECEIPT.RECEIPT_PRODUCTS",
          (_, { parent }) => {
            const receipt = parent as ReceiptModel;
            if (receipt.id) return true;

            return receipt.receiptProducts.some(({ received, components }) => {
              return (
                received || components.some((component) => component.received)
              );
            });
          }
        ),
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        receivedAt: true,
        purchaseOrders: true,
      },
      filterColumns: {
        receiptNumber: true,
        receivedAt: true,
        externalRef: true,
        "receiptProducts.desiredProduct.purchaseOrderProduct.purchaseOrder.vendor":
          true,
        "receiptProducts.desiredProduct.purchaseOrderProduct.purchaseOrder.paymentModality":
          true,
      },
    },
    {
      type: ViewEnum.Detail,
      customActions: [
        { render: ({ item }) => <PrintReceiptButton item={item} /> },
      ],
      columns: {
        receiptNumber: true,
        externalRef: true,
        receivedAt: true,
        receiptProducts: true,
      },
    },
    {
      type: ViewEnum.Create,
      getMutateInput: ({ vendor, purchaseOrders, ...item }) => ({
        ...item,
        receiptProducts: item.receiptProducts
          ?.map((receiptProduct) => ({
            ...receiptProduct,
            // @ts-ignore
            desiredProduct: receiptProduct.desiredProduct["@id"],
            quantity: receiptProduct.received ? receiptProduct.quantity : 0,
            note: receiptProduct.received ? receiptProduct.note : "",
            components: receiptProduct.components
              .filter((component) => component.received)
              .map((component) => ({
                ...component,
                purchaseOrderProductComponent:
                  // @ts-ignore
                  component.purchaseOrderProductComponent["@id"],
              })),
          }))
          .filter((receiptProduct) => {
            return (
              receiptProduct.received || receiptProduct.components.length > 0
            );
          }),
      }),
      slotProps: {
        item: {
          sm: 6,
        },
      },
      fields: formFields,
    },
    {
      type: ViewEnum.Update,
      fields: {
        externalRef: true,
        receivedAt: true,
        receiptProducts: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
        },
      },
      slotProps: {
        item: {
          sm: 6,
        },
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        receiptProducts: true,
      },
    },
  ],
};

export default mapping;
