import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { ModelAutocompleteField } from "../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import React from "react";
import moment from "moment";
import { ArraySchema } from "yup";
import { PrintReceiptButton } from "./components/PrintReceiptButton";
import { PurchaseOrdersField } from "./fields/PurchaseOrdersField";
import { ReceiptModel } from "./index";
import { ReceiptProductsField } from "./fields/ReceiptProductsField";

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

const mapping: ModelMapping<ModelEnum.Receipt> = {
  modelName: ModelEnum.Receipt,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
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
    attachments: {
      type: ModelEnum.ReceiptAttachment,
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
        "receiptProducts.purchaseOrderProduct.purchaseOrder.vendor": true,
        "receiptProducts.purchaseOrderProduct.purchaseOrder.paymentModality":
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
        attachments: true,
      },
    },
    {
      type: ViewEnum.Create,
      getMutateInput: (input) => {
        if (input instanceof FormData) return input;

        const { vendor, purchaseOrders, ...item } = input;
        return {
          ...item,
          receiptProducts: item.receiptProducts
            ?.map((receiptProduct) => ({
              ...receiptProduct,
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
        };
      },
      slotProps: {
        item: {
          sm: 4,
        },
      },
      fields: {
        externalRef: true,
        receivedAt: {
          defaultValue: moment().format(),
        },
        vendor: {
          render: ({ inputProps, metaProps }) => (
            <ModelAutocompleteField
              {...inputProps}
              size='sm'
              modelName={ModelEnum.Vendor}
              disabled={!!metaProps.value.purchaseOrders?.length}
            />
          ),
        },
        purchaseOrders: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
          render: ({ inputProps }) => <PurchaseOrdersField {...inputProps} />,
        },
        receiptProducts: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
          // display: ({item}) => item.purchaseOrders.length > 0,
          render: ({ inputProps }) => <ReceiptProductsField {...inputProps} />,
        },
        attachments: true,
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: {
        item: {
          sm: 6,
        },
      },
      fields: {
        externalRef: true,
        receivedAt: true,
        receiptProducts: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
          render: ({ inputProps }) => <ReceiptProductsField {...inputProps} />,
        },
        attachments: true,
      },
    },
  ],
};

export default mapping;
