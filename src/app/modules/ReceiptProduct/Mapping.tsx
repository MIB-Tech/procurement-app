import {
  ColumnMapping,
  CreateViewType,
  ModelMapping,
  UpdateViewType,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { CellContent } from "../../../_core/ListingView/views/Table/BodyCell";
import { QUANTITY_STATUS_COLUMN } from "../PurchaseOrderProduct/Mapping";
import { BooleanField } from "../../../_core/Column/Boolean/BooleanField";
import React from "react";
import { QuantityStatusEnum } from "../PurchaseOrder/Model";
import { ref } from "yup";
import { NestedArrayField } from "../../../_core/Column/Model/Nested/NestedArrayField";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { COMPLIANCE_STATUS_OPTIONS } from "./Model";
import {
  DESIRED_PRODUCT_MAPPING,
  DesiredProductModel,
} from "../DesiredProduct";
import { PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING } from "../PurchaseOrderProductComponent";

const mapping: ModelMapping<ModelEnum.ReceiptProduct> = {
  modelName: ModelEnum.ReceiptProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      schema: (schema) =>
        schema.when("id", {
          is: (id: number | undefined) => !!id,
          then: (schema) =>
            schema.positive().max(ref("desiredProduct.quantity")),
          otherwise: (schema) =>
            schema.when("desiredProduct", {
              is: (desiredProduct?: DesiredProductModel) => {
                if (!desiredProduct) return true;
                const { id, status, restQuantity } = desiredProduct;
                return (
                  status !== QuantityStatusEnum.FullyReceived &&
                  restQuantity > 0
                );
              },
              then: (schema) =>
                schema.positive().max(ref("desiredProduct.restQuantity")),
            }),
        }),
      // schema: schema => schema.when('desiredProduct', {
      //   is: ({id, status, restQuantity}: DesiredProductModel) =>  {
      //     if (id) return true
      //
      //     return status !== QuantityStatusEnum.FullyReceived && restQuantity > 0
      //   },
      //   then: schema => schema.positive().max(ref('desiredProduct.restQuantity')),
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
    receipt: {
      type: ModelEnum.Receipt,
    },
    desiredProduct: {
      type: ModelEnum.DesiredProduct,
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
            <div className='w-400px'>{item.desiredProduct.designation}</div>
          ),
        },
        desiredProductQuantity: {
          render: ({ item }) => item.desiredProduct.quantity,
        },
        restQuantity: {
          render: ({ item }) => item.desiredProduct.restQuantity,
        },
        quantity: true,
        note: true,
        status: {
          render: ({ item }) => (
            <CellContent<ModelEnum.DesiredProduct>
              columnMapping={DESIRED_PRODUCT_MAPPING.columnDef.status}
              item={item.desiredProduct}
              columnName='status'
            />
          ),
        },
        received: {
          render: ({ fieldProps, item }) => (
            <BooleanField
              {...fieldProps}
              disabled={
                item.desiredProduct.status === QuantityStatusEnum.FullyReceived
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
            <div className='w-400px'>{item.desiredProduct.designation}</div>
          ),
        },
        desiredProductQuantity: {
          render: ({ item }) => item.desiredProduct.quantity,
        },
        restQuantity: {
          render: ({ item }) => item.desiredProduct.quantity - item.quantity,
        },
        quantity: true,
        note: true,
        status: {
          render: ({ item }) => (
            <CellContent<ModelEnum.DesiredProduct>
              columnMapping={DESIRED_PRODUCT_MAPPING.columnDef.status}
              item={item.desiredProduct}
              columnName='status'
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
