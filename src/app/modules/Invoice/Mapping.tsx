import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";
import { ModelAutocompleteField } from "../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_custom/ListingView/Filter/Filter.types";
import React from "react";
import { PrintInvoiceButton } from "./PrintInvoiceButton";

const mapping: ModelMapping<ModelEnum.Invoice> = {
  modelName: ModelEnum.Invoice,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
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
    },
    posted: {
      type: ColumnTypeEnum.Boolean,
    },
    sageAccountingRef: {
      type: ColumnTypeEnum.String,
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true,
    },
    attachments: {
      type: ModelEnum.InvoiceAttachment,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        createdAt: true,
        purchaseOrders: true,
        posted: true,
        accounted: true,
        sageAccountingRef: true,
      },
    },
    {
      type: ViewEnum.Create,
      navigateTo: (item) => item["@id"],
      fields: {
        ref: true,
        externalRef: true,
        accounted: true,
        posted: true,
        sageAccountingRef: true,
        vendor: true,
        purchaseOrders: {
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
      type: ViewEnum.Update,

      fields: {
        invoiceNumber: true,
        ref: true,
        externalRef: true,
        accounted: true,
        posted: true,
        sageAccountingRef: true,
        // vendor: true,
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
        posted: true,
        sageAccountingRef: true,
      },
    },
  ],
};

export default mapping;
