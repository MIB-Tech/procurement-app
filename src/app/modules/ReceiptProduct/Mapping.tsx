import {
  ModelMapping,
  UpdateViewType,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { CellContent } from "../../../_core/ListingView/views/Table/BodyCell";
import { BooleanField } from "../../../_core/Column/Boolean/BooleanField";
import React from "react";
import {
  QUANTITY_STATUS_OPTIONS,
  QuantityStatusEnum,
} from "../PurchaseOrder/Model";
import { ref } from "yup";
import { NestedArrayField } from "../../../_core/Column/Model/Nested/NestedArrayField";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { COMPLIANCE_STATUS_OPTIONS } from "./Model";
import { PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING } from "../PurchaseOrderProductComponent";
import {
  PURCHASE_ORDER_PRODUCT_MAPPING,
  PurchaseOrderProductModel,
} from "../PurchaseOrderProduct";
import { HydraItem } from "../../../_core/types/hydra.types";
import { Bullet } from "../../../_core/components/Bullet";

const mapping: ModelMapping<ModelEnum.ReceiptProduct> = {
  modelName: ModelEnum.ReceiptProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    designation: {
      type: ColumnTypeEnum.String,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      schema: (schema) =>
        schema.when("id", {
          is: (id: number | undefined) => !!id,
          then: (schema) =>
            schema.when("id", {
              is: (id: number) => !id,
              then: (schema) => schema.positive().max(ref("initialQuantity")),
            }),
          otherwise: (schema) =>
            schema.when("purchaseOrderProduct", {
              is: (purchaseOrderProduct?: PurchaseOrderProductModel) => {
                if (!purchaseOrderProduct) return true;
                const { receiptStatus, receiptRestQuantity } =
                  purchaseOrderProduct;

                return (
                  receiptStatus !== QuantityStatusEnum.FullyReceived &&
                  receiptRestQuantity &&
                  receiptRestQuantity > 0
                );
              },
              then: (schema) =>
                schema.positive().max(ref("purchaseOrderProduct.restQuantity")),
            }),
        }),
      // schema: schema => schema.when('purchaseOrderProduct', {
      //   is: ({id, status, restQuantity}: DesiredProductModel) =>  {
      //     if (id) return true
      //
      //     return status !== QuantityStatusEnum.FullyReceived && restQuantity > 0
      //   },
      //   then: schema => schema.positive().max(ref('purchaseOrderProduct.restQuantity')),
      // })
    },
    initialQuantity: {
      type: ColumnTypeEnum.Number,
      readOnly: true,
      nullable: true,
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    received: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    complianceStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      nullable: true,
      options: COMPLIANCE_STATUS_OPTIONS,
    },
    complianceUpdatedBy: {
      type: ModelEnum.User,
      nullable: false,
    },
    complianceUpdatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true,
    },
    complianceReserve: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    invoiceProductStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: QUANTITY_STATUS_OPTIONS,
      readOnly: true,
      nullable: true,
    },
    receipt: {
      type: ModelEnum.Receipt,
      nullable: true,
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct,
    },
    deliveryDepot: {
      type: ModelEnum.DeliveryDepot,
      nullable: true,
    },
    invoiceProducts: {
      type: ModelEnum.InvoiceProduct,
      multiple: true,
    },
    components: {
      type: ModelEnum.ReceiptProductComponent,
      multiple: true,
      embeddedForm: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        quantity: true,
        note: true,
        deliveryDepot: true,
        complianceStatus: true,
        complianceUpdatedBy: true,
        complianceReserve: true,
      },
    },
    // {
    //   type: ViewEnum.Create,
    //   fields: {
    //     designation: {
    //       render: ({ item }) => (
    //         <div className='w-400px'>
    //           {item.purchaseOrderProduct.designation}
    //         </div>
    //       ),
    //     },
    //     initialQuantity: {
    //       render: ({ item }) => item.purchaseOrderProduct.quantity,
    //     },
    //     restQuantity: {
    //       render: ({ item }) => item.purchaseOrderProduct.receiptRestQuantity,
    //     },
    //     quantity: true,
    //     note: true,
    //     status: {
    //       render: ({ item }) => (
    //         <CellContent<ModelEnum.PurchaseOrderProduct>
    //           columnMapping={
    //             PURCHASE_ORDER_PRODUCT_MAPPING.columnDef.receiptStatus
    //           }
    //           item={item.purchaseOrderProduct}
    //           columnName='receiptStatus'
    //         />
    //       ),
    //     },
    //     received: {
    //       render: ({ inputProps, item }) => (
    //         <BooleanField
    //           name={name}
    //           disabled={
    //             item.purchaseOrderProduct.receiptStatus ===
    //             QuantityStatusEnum.FullyReceived
    //           }
    //           size='sm'
    //         />
    //       ),
    //     },
    //     components: {
    //       render: ({ inputProps }) => {
    //         const view: CreateViewType<ModelEnum.ReceiptProductComponent> = {
    //           type: ViewEnum.Create,
    //           fields: {
    //             purchaseOrderProductComponent: {
    //               render: ({ item }) => (
    //                 <div className='text-truncate'>
    //                   {/*@ts-ignore*/}
    //                   {item.purchaseOrderProductComponent["@title"]}
    //                 </div>
    //               ),
    //             },
    //             orderedQuantity: {
    //               render: ({ item }) =>
    //                 item.purchaseOrderProductComponent.quantity,
    //             },
    //             restQuantity: {
    //               render: ({ item }) => item.restQuantity,
    //             },
    //             quantity: true,
    //             status: {
    //               render: ({ item }) => (
    //                 <CellContent<ModelEnum.PurchaseOrderProductComponent>
    //                   columnMapping={
    //                     PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING.columnDef
    //                       .status
    //                   }
    //                   item={item.purchaseOrderProductComponent}
    //                   columnName='status'
    //                 />
    //               ),
    //             },
    //             received: {
    //               render: ({ inputProps, item }) => (
    //                 <BooleanField
    //                   name={name}
    //                   size='sm'
    //                   disabled={
    //                     item.purchaseOrderProductComponent.status ===
    //                     QuantityStatusEnum.FullyReceived
    //                   }
    //                 />
    //               ),
    //             },
    //           },
    //         };
    //
    //         return (
    //           <NestedArrayField
    //             modelName={ModelEnum.ReceiptProductComponent}
    //             view={view}
    //             disableDelete
    //             disableInsert
    //             name={name}
    //           />
    //         );
    //       },
    //     },
    //   },
    // },
    {
      type: ViewEnum.Update,
      fields: {
        designation: {
          render: ({ metaProps }) => (
            <div className='w-400px'>
              {metaProps.value.purchaseOrderProduct?.designation}
            </div>
          ),
        },
        initialQuantity: {
          render: ({ metaProps }) =>
            metaProps.value.purchaseOrderProduct?.quantity,
        },
        restQuantity: {
          render: ({ metaProps }) => {
            const { purchaseOrderProduct, quantity = 0 } = metaProps.value;
            const popQuantity = purchaseOrderProduct?.quantity || 0;

            return popQuantity - quantity;
          },
        },
        quantity: true,
        note: true,
        status: {
          render: ({ metaProps }) => {
            const { purchaseOrderProduct } = metaProps.value;
            if (!purchaseOrderProduct) return <Bullet />;

            return (
              <CellContent<ModelEnum.PurchaseOrderProduct>
                columnMapping={
                  PURCHASE_ORDER_PRODUCT_MAPPING.columnDef.receiptStatus
                }
                item={purchaseOrderProduct}
                columnName='receiptStatus'
              />
            );
          },
        },
        components: {
          render: ({ inputProps }) => {
            const view: UpdateViewType<ModelEnum.ReceiptProductComponent> = {
              type: ViewEnum.Update,
              fields: {
                purchaseOrderProductComponent: {
                  render: ({ metaProps }) => (
                    <div className='text-truncate'>
                      {
                        (
                          metaProps.value.purchaseOrderProductComponent as
                            | HydraItem
                            | undefined
                        )?.["@title"]
                      }
                    </div>
                  ),
                },
                orderedQuantity: {
                  render: ({ metaProps }) =>
                    metaProps.value.purchaseOrderProductComponent?.quantity,
                },
                restQuantity: {
                  render: ({ metaProps }) => metaProps.value.restQuantity,
                },
                quantity: true,
                status: {
                  render: ({ metaProps }) => {
                    const { purchaseOrderProductComponent } = metaProps.value;
                    if (!purchaseOrderProductComponent) return <Bullet />;

                    return (
                      <CellContent<ModelEnum.PurchaseOrderProductComponent>
                        columnMapping={
                          PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING.columnDef
                            .status
                        }
                        item={purchaseOrderProductComponent}
                        columnName='status'
                      />
                    );
                  },
                },
                received: {
                  render: ({ inputProps, metaProps }) => (
                    <BooleanField
                      {...inputProps}
                      size='sm'
                      disabled={
                        metaProps.value?.purchaseOrderProductComponent
                          ?.status === QuantityStatusEnum.FullyReceived
                      }
                    />
                  ),
                },
              },
            };

            return (
              <NestedArrayField
                {...inputProps}
                modelName={ModelEnum.ReceiptProductComponent}
                view={view}
                disableDelete
                disableInsert
              />
            );
          },
        },
      },
    },
  ],
};
export default mapping;
