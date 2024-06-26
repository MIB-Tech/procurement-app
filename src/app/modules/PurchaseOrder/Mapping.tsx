import {
  FormFields,
  FormViewType,
  ModelMapping,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import { RadioField } from "../../../_core/Column/controls/fields/RadioField/RadioField";
import {
  CLINIC_STATUS_OPTIONS,
  QUANTITY_STATUS_OPTIONS,
  QuantityStatusEnum,
  VALIDATION_STATUS_OPTIONS,
  ValidationStatusEnum,
} from "./Model";
import moment from "moment/moment";
import React from "react";
import { PrintPurchaseOrderButton } from "./components/PrintPurchaseOrderButton";
import { GenerateReceiptButton } from "./components/GenerateReceiptButton";
import { GenerateInvoiceButton } from "./components/GenerateInvoiceButton";
import { ModelAutocompleteField } from "../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import { RoleKeyEnum } from "../Role/Model";
import {
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_core/ListingView/Filter/Filter.types";
import { NumberUnit } from "../../../_core/components/NumberUnit";
import { PurchaseOrderProductsFields } from "./fields/PurchaseOrderProductsFields";

const FORM_VIEW: FormViewType<ModelEnum.PurchaseOrder> = {
  slotProps: {
    item: {
      sm: 4,
      md: 3,
      lg: 2,
    },
  },
  getMutateInput: (input) => {
    if (input instanceof FormData) return input;

    return {
      ...input,
      purchaseOrderProducts: input.purchaseOrderProducts?.map(
        (purchaseOrderProduct) => ({
          ...purchaseOrderProduct,
          components: purchaseOrderProduct.components.map((component) => ({
            ...component,
            // @ts-ignore
            product: component.product["@id"],
          })),
        })
      ),
    };
  },
  fields: {
    vendor: {
      render: ({ inputProps, metaProps }) => {
        return (
          <ModelAutocompleteField
            {...inputProps}
            modelName={ModelEnum.Vendor}
            size='sm'
            disabled={!!metaProps.value.purchaseOrderProducts?.length}
          />
        );
      },
    },
    createdAt: {
      defaultValue: moment().format(),
    },
    taxIncluded: {
      defaultValue: true,
      render: ({ metaProps }) => (
        <RadioField
          size='sm'
          name='taxIncluded'
          options={[true, false]}
          getOptionLabel={(taxIncluded) => (taxIncluded ? "TTC" : "HT")}
          disabled={!!metaProps.value.purchaseOrderProducts?.length}
          scrollDisabled
        />
      ),
    },
    ref: true,
    externalRef: true,
    desiredDeliveryDate: {
      defaultValue: moment().add(1, "days").format(),
    },
    currency: true,
    category: true,
    clinic: {
      render: ({ inputProps, metaProps }) => (
        <ModelAutocompleteField
          {...inputProps}
          modelName={ModelEnum.Clinic}
          size='sm'
          disabled={!!metaProps.value.purchaseOrderProducts?.length}
        />
      ),
    },
    paymentModality: {
      slotProps: {
        root: {
          sm: 4,
          lg: 4,
          md: 4,
          xl: 4,
        },
      },
    },
    validationStatus: {
      grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin],
      defaultValue: ValidationStatusEnum.Pending,
      display: (props) => !!props.item.id,
    },
    purchaseOrderProducts: {
      slotProps: {
        root: {
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      },
      render: ({ inputProps, metaProps }) => (
        <PurchaseOrderProductsFields
          {...inputProps}
          disableInsert={
            !metaProps.value.vendor ||
            !metaProps.value.clinic ||
            typeof metaProps.value.taxIncluded === "undefined"
          }
        />
      ),
    },
    comment: {
      slotProps: {
        root: {
          sm: 6,
          md: 6,
          lg: 6,
          xl: 6,
        },
      },
    },
    referents: {
      slotProps: {
        root: {
          sm: 6,
          lg: 6,
          md: 6,
          xl: 6,
        },
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
};

const mapping: ModelMapping<ModelEnum.PurchaseOrder> = {
  modelName: ModelEnum.PurchaseOrder,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    orderNumber: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    taxIncluded: {
      type: ColumnTypeEnum.Boolean,
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
    },
    clinicStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: CLINIC_STATUS_OPTIONS,
      nullable: true,
      inline: true,
    },
    validationStatus: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: VALIDATION_STATUS_OPTIONS,
      nullable: true,
      inline: true,
    },
    validatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true,
    },
    validatedBy: {
      type: ModelEnum.User,
      nullable: true,
    },
    totalExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    totalInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    totalVatTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    totalDiscount: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    comment: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true,
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true,
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: "DELIVERY_STATUS",
      options: QUANTITY_STATUS_OPTIONS,
    },
    buyer: {
      type: ModelEnum.User,
      nullable: true,
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    currency: {
      type: ModelEnum.Currency,
      nullable: true,
    },
    category: {
      type: ModelEnum.PurchaseOrderCategory,
      nullable: true,
      title: "NATURE",
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
    attachments: {
      type: ModelEnum.PurchaseOrderAttachment,
      multiple: true,
    },
    purchaseOrderProducts: {
      type: ModelEnum.PurchaseOrderProduct,
      multiple: true,
      embeddedForm: true,
      min: 1,
    },
    referents: {
      type: ModelEnum.User,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      defaultState: {
        sort: {
          createdAt: "desc",
        },
      },
      itemOperationRoutes: ({ operations, item }) =>
        operations.filter(({ operationType }) => {
          switch (operationType) {
            case ViewEnum.Update:
            case ViewEnum.Delete:
              return item.status === QuantityStatusEnum.Unreceived;
            default:
              return true;
          }
        }),
      filterColumns: {
        orderNumber: true,
        ref: true,
        externalRef: true,
        desiredDeliveryDate: {
          quickFilter: true,
        },
        createdAt: {
          quickFilter: true,
        },
        validationStatus: {
          quickFilter: true,
        },
        vendor: {
          quickFilter: true,
        },
        buyer: true,
        clinic: true,
      },
      sortColumns: {
        createdAt: true,
        desiredDeliveryDate: true,
        orderNumber: true,
        ref: true,
        externalRef: true,
      },
      columns: {
        createdAt: true,
        desiredDeliveryDate: true,
        totalExclTax: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalExclTax}
              unit={item.currency?.code}
            />
          ),
        },
        totalInclTax: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalInclTax}
              unit={item.currency?.code}
            />
          ),
        },
        status: true,
        validationStatus: {},
        buyer: true,
        clinic: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        orderNumber: true,
        validationStatus: true,
        validatedBy: {
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Buyer],
          display: ({ item }) =>
            item.validationStatus === ValidationStatusEnum.Validated,
        },
        validatedAt: {
          display: ({ item }) =>
            item.validationStatus === ValidationStatusEnum.Validated,
        },
        status: true,
        taxIncluded: {
          render: ({ item: { taxIncluded } }) => (taxIncluded ? "TTC" : "HT"),
        },
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        buyer: true,
        vendor: true,
        currency: true,
        category: true,
        purchaseOrderProducts: true,
        comment: true,
        attachments: true,
        paymentModality: true,
        invoice: true,
        totalExclTax: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalExclTax}
              unit={item.currency?.code}
            />
          ),
        },
        totalVatTax: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalVatTax}
              unit={item.currency?.code}
            />
          ),
        },
        totalDiscount: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalDiscount}
              unit={item.currency?.code}
            />
          ),
        },
        totalInclTax: {
          render: ({ item }) => (
            <NumberUnit
              value={item.totalInclTax}
              unit={item.currency?.code}
            />
          ),
        },
        clinic: true,
        clinicStatus: true,
        referents: true,
      },
      customActions: [
        {
          render: ({ item }) => {
            const { validationStatus } = item;
            if (validationStatus !== ValidationStatusEnum.Validated)
              return null;

            return <PrintPurchaseOrderButton item={item} />;
          },
        },
        {
          render: ({ item }) => {
            const { status, invoice } = item;
            if (status !== QuantityStatusEnum.FullyReceived || invoice) return;

            return <GenerateInvoiceButton item={item} />;
          },
        },
        {
          render: ({ item }) => {
            const { status, validationStatus } = item;

            return (
              status !== QuantityStatusEnum.FullyReceived &&
              validationStatus === ValidationStatusEnum.Validated && (
                <GenerateReceiptButton item={item} />
              )
            );
          },
        },
      ],
      itemOperationRoutes: ({ operations, item }) =>
        operations.filter(({ operationType }) => {
          switch (operationType) {
            case ViewEnum.Update:
            case ViewEnum.Delete:
              return item.status === QuantityStatusEnum.Unreceived;
            default:
              return true;
          }
        }),
    },
    {
      type: ViewEnum.Create,
      ...FORM_VIEW,
    },
    {
      type: ViewEnum.Update,
      ...FORM_VIEW,
      submittable: ({ formik, isGranted }) => {
        const { validationStatus, status, invoice } = formik.initialValues;
        const granted = isGranted([RoleKeyEnum.Admin, RoleKeyEnum.SuperAdmin]);

        return (
          (granted && status === QuantityStatusEnum.Unreceived && !invoice) ||
          validationStatus === ValidationStatusEnum.Pending
        );
      },
      fields: {
        ...Object.keys({ ...FORM_VIEW.fields }).reduce((acc, key) => {
          if (
            ![
              "validationStatus",
              "purchaseOrderProducts",
              "comment",
              "referents",
              "attachments",
            ].includes(key)
          ) {
            acc[key] = FORM_VIEW.fields?.[key];
          }
          return acc;
        }, {} as FormFields<ModelEnum.PurchaseOrder>),
        buyer: {
          render: ({ inputProps }) => (
            <ModelAutocompleteField
              {...inputProps}
              modelName={ModelEnum.User}
              size='sm'
              getParams={(filter) => ({
                operator: CompoundFilterOperator.And,
                filters: [
                  filter,
                  {
                    operator: CompoundFilterOperator.Or,
                    filters: [
                      {
                        property: "role.roleKey",
                        operator: PropertyFilterOperator.Equal,
                        value: RoleKeyEnum.Admin,
                      },
                      {
                        property: "role.roleKey",
                        operator: PropertyFilterOperator.Equal,
                        value: RoleKeyEnum.Buyer,
                      },
                    ],
                  },
                ],
              })}
            />
          ),
        },
        ...Object.keys({ ...FORM_VIEW.fields }).reduce((acc, key) => {
          if (
            [
              "validationStatus",
              "purchaseOrderProducts",
              "comment",
              "referents",
              "attachments",
            ].includes(key)
          ) {
            acc[key] = FORM_VIEW.fields?.[key];
          }
          return acc;
        }, {} as FormFields<ModelEnum.PurchaseOrder>),
      },
    },
  ],
};

export default mapping;
