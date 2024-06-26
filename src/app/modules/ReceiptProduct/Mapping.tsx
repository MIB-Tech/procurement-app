import {
  CreateViewType,
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
            schema.positive().max(ref("purchaseOrderProduct.quantity")),
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
    },
    complianceReserve: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    invoiceProductStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: QUANTITY_STATUS_OPTIONS,
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
    {
      type: ViewEnum.Create,
      fields: {
        designation: {
          render: ({ item }) => (
            <div className='w-400px'>
              {item.purchaseOrderProduct.designation}
            </div>
          ),
        },
        purchaseOrderProductQuantity: {
          render: ({ item }) => item.purchaseOrderProduct.quantity,
        },
        restQuantity: {
          render: ({ item }) => item.purchaseOrderProduct.receiptRestQuantity,
        },
        quantity: true,
        note: true,
        status: {
          render: ({ item }) => (
            <CellContent<ModelEnum.PurchaseOrderProduct>
              columnMapping={
                PURCHASE_ORDER_PRODUCT_MAPPING.columnDef.receiptStatus
              }
              item={item.purchaseOrderProduct}
              columnName='receiptStatus'
            />
          ),
        },
        received: {
          render: ({ fieldProps, item }) => (
            <BooleanField
              {...fieldProps}
              disabled={
                item.purchaseOrderProduct.receiptStatus ===
                QuantityStatusEnum.FullyReceived
              }
              size='sm'
            />
          ),
        },
        components: {
          render: ({ fieldProps }) => {
            const view: CreateViewType<ModelEnum.ReceiptProductComponent> = {
              type: ViewEnum.Create,
              fields: {
                purchaseOrderProductComponent: {
                  render: ({ item }) => (
                    <div className='text-truncate'>
                      {/*@ts-ignore*/}
                      {item.purchaseOrderProductComponent["@title"]}
                    </div>
                  ),
                },
                orderedQuantity: {
                  render: ({ item }) =>
                    item.purchaseOrderProductComponent.quantity,
                },
                restQuantity: {
                  render: ({ item }) => item.restQuantity,
                },
                quantity: true,
                status: {
                  render: ({ item }) => (
                    <CellContent<ModelEnum.PurchaseOrderProductComponent>
                      columnMapping={
                        PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING.columnDef
                          .status
                      }
                      item={item.purchaseOrderProductComponent}
                      columnName='status'
                    />
                  ),
                },
                received: {
                  render: ({ fieldProps, item }) => (
                    <BooleanField
                      {...fieldProps}
                      size='sm'
                      disabled={
                        item.purchaseOrderProductComponent.status ===
                        QuantityStatusEnum.FullyReceived
                      }
                    />
                  ),
                },
              },
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.ReceiptProductComponent}
                view={view}
                disableDelete
                disableInsert
                {...fieldProps}
              />
            );
          },
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: {
          render: ({ item }) => (
            <div className='w-400px'>
              {item.purchaseOrderProduct.designation}
            </div>
          ),
        },
        purchaseOrderProductQuantity: {
          render: ({ item }) => item.purchaseOrderProduct.quantity,
        },
        restQuantity: {
          render: ({ item }) =>
            item.purchaseOrderProduct.quantity - item.quantity,
        },
        quantity: true,
        note: true,
        status: {
          render: ({ item }) => (
            <CellContent<ModelEnum.PurchaseOrderProduct>
              columnMapping={
                PURCHASE_ORDER_PRODUCT_MAPPING.columnDef.receiptStatus
              }
              item={item.purchaseOrderProduct}
              columnName='receiptStatus'
            />
          ),
        },
        components: {
          render: ({ fieldProps }) => {
            const view: UpdateViewType<ModelEnum.ReceiptProductComponent> = {
              type: ViewEnum.Update,
              fields: {
                purchaseOrderProductComponent: {
                  render: ({ item }) => (
                    <div className='text-truncate'>
                      {/*@ts-ignore*/}
                      {item.purchaseOrderProductComponent["@title"]}
                    </div>
                  ),
                },
                orderedQuantity: {
                  render: ({ item }) =>
                    item.purchaseOrderProductComponent.quantity,
                },
                restQuantity: {
                  render: ({ item }) => item.restQuantity,
                },
                quantity: true,
                status: {
                  render: ({ item }) => (
                    <CellContent<ModelEnum.PurchaseOrderProductComponent>
                      columnMapping={
                        PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING.columnDef
                          .status
                      }
                      item={item.purchaseOrderProductComponent}
                      columnName='status'
                    />
                  ),
                },
                received: {
                  render: ({ fieldProps, item }) => (
                    <BooleanField
                      {...fieldProps}
                      size='sm'
                      disabled={
                        item.purchaseOrderProductComponent.status ===
                        QuantityStatusEnum.FullyReceived
                      }
                    />
                  ),
                },
              },
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.ReceiptProductComponent}
                view={view}
                disableDelete
                disableInsert
                {...fieldProps}
              />
            );
          },
        },
      },
    },
  ],
};
export default mapping;
