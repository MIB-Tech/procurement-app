import { ColumnMapping, ModelMapping } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import Model, { DiscountType } from "./Model";
import { Bullet } from "../../../_core/components/Bullet";
import { QUANTITY_STATUS_OPTIONS } from "../PurchaseOrder/Model";
import { number } from "yup";
import React from "react";
import {
  AmountUnit,
  getPriceExclTax,
  getPriceInclTax,
} from "../PurchaseOrder/fields/AmountUnit";

export const QUANTITY_STATUS_COLUMN: ColumnMapping<ModelEnum.PurchaseOrderProduct> =
  {
    type: ColumnTypeEnum.String,
    format: StringFormat.Select,
    readOnly: true,
    nullable: true,
    title: "DELIVERY_STATUS",
    options: QUANTITY_STATUS_OPTIONS,
  };
const mapping: ModelMapping<ModelEnum.PurchaseOrderProduct> = {
  modelName: ModelEnum.PurchaseOrderProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    designation: {
      type: ColumnTypeEnum.String,
      validation: {
        max: 1500,
      },
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      schema: number()
        .positive()
        .test(
          "is-valid",
          "VALIDATION.PURCHASE_ORDER_PRODUCT.QUANTITY",
          (quantity, context) => {
            const { receiptProducts } = context.parent as Model;
            const count = receiptProducts.reduce(
              (count, receiptProduct) => count + receiptProduct.quantity,
              0
            );
            return count === quantity;
          }
        ),
    },
    grossPrice: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 7,
      footer: () => <Bullet />,
      title: "UNIT_PRICE",
    },
    note: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true,
    },
    vatRate: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
      footer: () => <></>,
    },
    discountType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: Object.values(DiscountType).map((id) => ({ id })),
    },
    discountValue: {
      type: ColumnTypeEnum.Number,
      precision: 7,
      footer: () => <></>,
    },
    priceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      nullable: true,
      footer: ({ collection, value }) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={(taxIncluded) =>
            collection.reduce(
              (a, item) => a + getPriceExclTax({ ...item, taxIncluded }),
              0
            )
          }
        />
      ),
    },
    discountedUnitPrice: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      nullable: true,
    },
    receiptStatus: QUANTITY_STATUS_COLUMN,
    vatTax: {
      type: ColumnTypeEnum.Boolean,
      readOnly: true,
      nullable: true,
    },
    receiptRestQuantity: {
      type: ColumnTypeEnum.Number,
      readOnly: true,
      nullable: true,
    },
    editablePrice: {
      type: ColumnTypeEnum.Boolean,
      readOnly: true,
      nullable: true,
    },
    priceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      nullable: true,
      footer: ({ collection, value }) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={(taxIncluded) =>
            collection.reduce(
              (a, item) => a + getPriceInclTax({ ...item, taxIncluded }),
              0
            )
          }
        />
      ),
    },
    product: {
      type: ModelEnum.Product,
    },
    purchaseOrder: {
      type: ModelEnum.PurchaseOrder,
    },
    receiptProducts: {
      type: ModelEnum.ReceiptProduct,
      multiple: true,
      embeddedForm: true,
    },
    components: {
      type: ModelEnum.PurchaseOrderProductComponent,
      multiple: true,
      embeddedForm: true,
    },
  },
  /* views: [
    {
      type: ViewEnum.Listing,
      // bulkActions: [
      //   {render: props => <PrintButton selectedItems={props.selectedItems}/>}
      // ],
      columns: {
        quantity: true,
        discountValue: {
          render: ({ item }) => {
            const { discountType, discountValue, purchaseOrder } = item;
            const format =
              discountType === DiscountType.Amount
                ? NumberFormat.Amount
                : NumberFormat.Percent;
            const unit =
              discountType === DiscountType.Amount
                ? purchaseOrder.currency?.code
                : "%";

            return (
              <NumberCell
                value={discountValue}
                columnMapping={{
                  type: ColumnTypeEnum.Number,
                  format,
                  unit,
                }}
              />
            );
          },
        },
        grossPrice: true,
        vatRate: true,
        priceExclTax: true,
        priceInclTax: true,
        receiptStatus: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        purchaseOrder: true,
        product: true,
        designation: true,
        quantity: true,
        discountValue: {
          render: ({ item }) => {
            const { discountType, discountValue, purchaseOrder } = item;
            const format =
              discountType === DiscountType.Amount
                ? NumberFormat.Amount
                : NumberFormat.Percent;
            const unit =
              discountType === DiscountType.Amount
                ? purchaseOrder.currency?.code
                : "%";

            return (
              <NumberCell
                value={discountValue}
                columnMapping={{
                  type: ColumnTypeEnum.Number,
                  format,
                  unit,
                }}
              />
            );
          },
        },
        grossPrice: true,
        vatRate: true,
        priceExclTax: true,
        priceInclTax: true,
        note: true,
        receiptProducts: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        product: {
          render: ({ fieldProps }) => (
            <ProductField__DEPRECATED {...fieldProps} />
          ),
        },
        designation: true,
        quantity: {
          render: ({ fieldProps }) => (
            <QuantityField__DEPRECATED {...fieldProps} />
          ),
        },
        grossPrice: {
          render: ({ item, fieldProps }) => (
            <NumberColumnField
              {...fieldProps}
              size='sm'
              disabled={!item.editablePrice}
            />
          ),
        },
        note: true,
        discountType: {
          defaultValue: DiscountType.Percent,
        },
        discountValue: {
          render: ({ item, fieldProps }) => (
            <NumberColumnField
              format={
                item.discountType === DiscountType.Percent
                  ? NumberFormat.Percent
                  : NumberFormat.Amount
              }
              {...fieldProps}
              size='sm'
              min={0}
              precision={7}
            />
          ),
        },
        vatRate: {
          defaultValue: 0.2,
          render: ({ fieldProps }) => (
            <VatRateSelectField fieldProps={{ ...fieldProps }} />
          ),
        },
        priceExclTax: {
          render: ({ item }) => (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceExclTax({ ...item, taxIncluded })
              }
            />
          ),
        },
        priceInclTax: {
          render: ({ item }) => (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceInclTax({ ...item, taxIncluded })
              }
            />
          ),
        },
        receiptProducts: {
          display: ({ item }) => !!item.product,
          render: ({ fieldProps }) => (
            <ReceiptProductsField__DEPRECATED {...fieldProps} />
          ),
        },
        components: {
          display: () => false, // TODO
          render: ({ item, fieldProps }) => {
            const view:
              | CreateViewType<ModelEnum.PurchaseOrderProductComponent>
              | UpdateViewType<ModelEnum.PurchaseOrderProductComponent> = {
              type: item.id ? ViewEnum.Update : ViewEnum.Create,
              fields: {
                product: {
                  render: ({ fieldProps }) => (
                    <div className='mw-250px'>
                      <ModelAutocompleteField
                        modelName={ModelEnum.Product}
                        size='sm'
                        {...fieldProps}
                        disabled
                      />
                    </div>
                  ),
                },
                designation: true,
                quantity: true,
              },
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.PurchaseOrderProductComponent}
                {...fieldProps}
                disableInsert
                view={view}
              />
            );
          },
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: {
          render: ({ fieldProps }) => (
            <ProductField__DEPRECATED {...fieldProps} />
          ),
        },
        designation: true,
        quantity: {
          render: ({ fieldProps }) => (
            <QuantityField__DEPRECATED {...fieldProps} />
          ),
        },
        grossPrice: {
          render: ({ item, fieldProps }) => (
            <NumberColumnField
              {...fieldProps}
              size='sm'
              disabled={!item.editablePrice}
            />
          ),
        },
        note: true,
        discountType: {
          defaultValue: DiscountType.Percent,
        },
        discountValue: {
          render: ({ item, fieldProps }) => (
            <NumberColumnField
              format={
                item.discountType === DiscountType.Percent
                  ? NumberFormat.Percent
                  : NumberFormat.Amount
              }
              {...fieldProps}
              size='sm'
              min={0}
              precision={7}
            />
          ),
        },
        vatRate: {
          render: ({ fieldProps }) => (
            <VatRateSelectField fieldProps={{ ...fieldProps }} />
          ),
        },
        priceExclTax: {
          render: ({ item }) => (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceExclTax({ ...item, taxIncluded })
              }
            />
          ),
        },
        priceInclTax: {
          render: ({ item }) => (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceInclTax({ ...item, taxIncluded })
              }
            />
          ),
        },
        receiptProducts: {
          display: ({ item }) => !!item.product,
          render: ({ fieldProps }) => (
            <ReceiptProductsField__DEPRECATED {...fieldProps} />
          ),
        },
        components: {
          display: () => false, // TODO
          render: ({ item, fieldProps }) => {
            const view:
              | CreateViewType<ModelEnum.PurchaseOrderProductComponent>
              | UpdateViewType<ModelEnum.PurchaseOrderProductComponent> = {
              type: item.id ? ViewEnum.Update : ViewEnum.Create,
              fields: {
                product: {
                  render: ({ fieldProps }) => (
                    <div className='mw-250px'>
                      <ModelAutocompleteField
                        modelName={ModelEnum.Product}
                        size='sm'
                        {...fieldProps}
                        disabled
                      />
                    </div>
                  ),
                },
                designation: true,
                quantity: true,
              },
            };

            return (
              <NestedArrayField
                modelName={ModelEnum.PurchaseOrderProductComponent}
                {...fieldProps}
                disableInsert
                view={view}
              />
            );
          },
        },
      },
    },
  ], */
};
export default mapping;
