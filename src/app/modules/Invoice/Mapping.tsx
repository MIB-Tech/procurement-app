import {
  ModelMapping,
  UpdateViewType,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { ModelAutocompleteField } from "../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_core/ListingView/Filter/Filter.types";
import React from "react";
import { PrintInvoiceButton } from "./PrintInvoiceButton";
import { ArraySchema } from "yup";
import { InvoiceModel } from "./index";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import { NestedArrayField } from "../../../_core/Column/Model/Nested/NestedArrayField";
import PaymentTermsField from "../PaymentTerm/PaymentTermsField";

const mapping: ModelMapping<ModelEnum.Invoice> = {
  modelName: ModelEnum.Invoice,
  noSortEdges: [["paymentTerms", "paymentTerms"]],
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    invoiceNumber: {
      type: ColumnTypeEnum.String,
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    accounted: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    sageAccountingRef: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    totalExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
    },
    totalInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
    },
    totalVatTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
    },
    totalDiscount: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true,
      min: 1,
    },
    attachments: {
      type: ModelEnum.InvoiceAttachment,
      multiple: true,
    },
    paymentTerms: {
      type: ModelEnum.PaymentTerm,
      multiple: true,
      embeddedForm: true,
      schema: (schema: ArraySchema<any>) =>
        schema.test(
          "VALIDATION.INVOICE.PAYMENT_TERMS",
          "VALIDATION.INVOICE.PAYMENT_TERMS",
          (_, { parent, createError }) => {
            const { purchaseOrders, paymentTerms } = parent as InvoiceModel;

            const totalPurchaseOrder = purchaseOrders.reduce(
              (total, purchaseOrder) => total + purchaseOrder.totalInclTax,
              0
            );

            const totalPaymentTerms = paymentTerms.reduce(
              (total, paymentTerm) => total + (paymentTerm.amount || 0),
              0
            );
            console.log(totalPurchaseOrder, totalPaymentTerms);
            if (
              Math.floor(totalPurchaseOrder) !== Math.floor(totalPaymentTerms)
            ) {
              return createError({
                path: "paymentTerms",
                message: {
                  id: "VALIDATION.NUMBER.EQUAL",
                  params: { equal: totalPurchaseOrder },
                },
                params: { equal: totalPaymentTerms },
              });
            }

            return true;
          }
        ),
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        createdAt: true,
        purchaseOrders: true,
        accounted: true,
        sageAccountingRef: true,
        totalExclTax: true,
        totalInclTax: true,
        totalVatTax: true,
        totalDiscount: true,
      },
    },
    {
      type: ViewEnum.Create,
      navigateTo: (item) => item["@id"],
      slotProps: {
        item: {
          sm: 4,
        },
      },
      fields: {
        vendor: true,
        purchaseOrders: {
          slotProps: {
            root: {
              sm: 8,
            },
          },
          render: ({ item, fieldProps }) => {
            const { vendor, purchaseOrders } = item;
            return (
              <ModelAutocompleteField
                {...fieldProps}
                size='sm'
                modelName={ModelEnum.PurchaseOrder}
                multiple
                disabled={!vendor && purchaseOrders.length === 0}
                getParams={(filter) => {
                  const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
                    operator: CompoundFilterOperator.And,
                    filters: [
                      filter,
                      {
                        property: "vendor",
                        operator: PropertyFilterOperator.Equal,
                        value: vendor,
                      },
                      {
                        property: "invoice",
                        operator: PropertyFilterOperator.IsNull,
                      },
                    ],
                  };
                  return newFilter;
                }}
              />
            );
          },
        },
        sageAccountingRef: true,
        ref: true,
        externalRef: true,
        accounted: true,
        paymentTerms: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
          render: PaymentTermsField,
        },
        attachments: true,
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: {
        item: {
          sm: 4,
        },
      },
      fields: {
        invoiceNumber: true,
        ref: true,
        externalRef: true,
        sageAccountingRef: true,
        accounted: true,
        paymentTerms: {
          slotProps: {
            root: {
              sm: 12,
            },
          },
          render: ({ fieldProps }) => (
            <NestedArrayField
              {...fieldProps}
              modelName={ModelEnum.PaymentTerm}
              view={
                {
                  type: ViewEnum.Update,
                  fields: {
                    date: true,
                    amount: true,
                  },
                } as UpdateViewType<ModelEnum.PaymentTerm>
              }
            />
          ),
        },
        attachments: {
          slotProps: {
            root: {
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
            },
          },
        },
      },
    },
    {
      type: ViewEnum.Detail,
      customActions: [
        { render: ({ item }) => <PrintInvoiceButton item={item} /> },
      ],
      columns: {
        invoiceNumber: true,
        createdAt: true,
        purchaseOrders: true,
        attachments: true,
        ref: true,
        externalRef: true,
        accounted: true,
        sageAccountingRef: true,
        paymentTerms: true,
        totalExclTax: true,
        totalInclTax: true,
        totalVatTax: true,
        totalDiscount: true,
      },
    },
  ],
};

export default mapping;
