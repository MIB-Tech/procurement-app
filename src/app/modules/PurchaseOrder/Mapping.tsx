import {FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping'
import {ColumnTypeEnum} from '../../../_custom/types/types'
import {ModelEnum} from '../types'
import {StringFormat} from '../../../_custom/Column/String/StringColumn'
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn'
import {RadioField} from '../../../_custom/Column/controls/fields/RadioField/RadioField'
import {
  CLINIC_STATUS_OPTIONS,
  QUANTITY_STATUS_OPTIONS,
  QuantityStatusEnum,
  VALIDATION_STATUS_OPTIONS,
  ValidationStatusEnum,
} from './Model'
import moment from 'moment/moment'
import React from 'react'
import {PrintPurchaseOrderButton} from './components/PrintPurchaseOrderButton'
import {GenerateReceiptButton} from './components/GenerateReceiptButton'
import {GenerateInvoiceButton} from './components/GenerateInvoiceButton'
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField'
import {RoleKeyEnum} from '../Role/Model'
import {CompoundFilterOperator, PropertyFilterOperator} from '../../../_custom/ListingView/Filter/Filter.types'

const formFields: FormFields<ModelEnum.PurchaseOrder> = {
  vendor: {
    render: ({fieldProps, item}) => (
      <ModelAutocompleteField
        modelName={ModelEnum.Vendor}
        {...fieldProps}
        size="sm"
        disabled={item.purchaseOrderProducts.length > 0}
      />
    ),
  },
  createdAt: {
    defaultValue: moment().format(),
  },
  taxIncluded: {
    defaultValue: false,
    render: ({item: {purchaseOrderProducts}}) => (
      <RadioField
        size="sm"
        name="taxIncluded"
        options={[true, false]}
        getOptionLabel={taxIncluded => taxIncluded ? 'TTC' : 'HT'}
        disabled={purchaseOrderProducts.length > 0}
        scrollDisabled
      />
    ),
  },
  ref: true,
  externalRef: true,
  desiredDeliveryDate: {
    defaultValue: moment().add(1, 'days').format(),
  },
  currency: true,
  category: true,
  clinic: true,
  paymentModality: true,
  validationStatus: {
    grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin],
    defaultValue: ValidationStatusEnum.Pending,
    display: props => !!props.item.id,
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
    display: ({item}) => typeof item.taxIncluded === 'boolean' && !!item.vendor,
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
}


const mapping: ModelMapping<ModelEnum.PurchaseOrder> = {
  modelName: ModelEnum.PurchaseOrder,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
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
    buyer: {
      type: ModelEnum.User,
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
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
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
      title: 'NATURE',
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: 'DELIVERY_STATUS',
      options: QUANTITY_STATUS_OPTIONS,
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
    },
    attachments: {
      type: ModelEnum.purchaseOrderAttachment,
      multiple: true,
    },
    purchaseOrderProducts: {
      type: ModelEnum.PurchaseOrderProduct,
      multiple: true,
      embeddedForm: true,
      min: 1,
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      itemOperationRoutes: ({operations, item}) => operations.filter(({operationType}) => {
        switch (operationType) {
          case ViewEnum.Update:
          case ViewEnum.Delete:
            return item.status === QuantityStatusEnum.Unreceived
          default:
            return true
        }
      }),
      filterColumns: {
        orderNumber: true,
        ref: true,
        externalRef: true,
        vendor: {
          quickFilter: true,
        },
        desiredDeliveryDate: {
          quickFilter: true,
        },
        createdAt: {
          quickFilter: true,
        },
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
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        totalExclTax: true,
        // totalVatTax: true,
        totalInclTax: true,
        status: true,
        validationStatus: {},
        //  validatedBy: true,
        // validatedAt: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        orderNumber: true,
        validationStatus: true,
        validatedBy: {
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Buyer],
        },
        validatedAt: true,
        status: true,
        taxIncluded: {
          render: ({item: {taxIncluded}}) => taxIncluded ? 'TTC' : 'HT',
        },
        ref: true,
        externalRef: true,
        desiredDeliveryDate: true,
        vendor: true,
        currency: true,
        category: true,
        purchaseOrderProducts: true,
        attachments: true,
        paymentModality: true,
        invoice: true,
        totalExclTax: true,
        totalVatTax: true,
        totalDiscount: true,
        totalInclTax: true,
        clinic: true,
        clinicStatus: true,
      },
      customActions: [
        {render: ({item}) => <PrintPurchaseOrderButton item={item} />},
        {
          render: ({item}) => {
            const {status, invoice} = item
            if (status !== QuantityStatusEnum.FullyReceived || invoice) return

            return <GenerateInvoiceButton item={item} />
          },
        },
        {
          render: ({item}) => {
            const {status, validationStatus} = item

            return status !== QuantityStatusEnum.FullyReceived &&
              validationStatus === ValidationStatusEnum.Validated &&
              <GenerateReceiptButton item={item} />

          },
        },
      ],
      itemOperationRoutes: ({operations, item}) => operations.filter(({operationType}) => {
        switch (operationType) {
          case ViewEnum.Update:
          case ViewEnum.Delete:
            return item.status === QuantityStatusEnum.Unreceived
          default:
            return true
        }
      }),
    },
    {
      type: ViewEnum.Create,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        },
      },
      getMutateInput: purchaseOrder => ({
        ...purchaseOrder,
        purchaseOrderProducts: purchaseOrder.purchaseOrderProducts?.map(purchaseOrderProduct => ({
          ...purchaseOrderProduct,
          components: purchaseOrderProduct.components.map(component => ({
            ...component,
            // @ts-ignore
            product: component.product['@id'],
          })),
        })),
      }),
      fields: formFields,
    },
    {
      type: ViewEnum.Update,
      submittable: props => props.initialValues.validationStatus === ValidationStatusEnum.Pending,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        },
      },
      getMutateInput: purchaseOrder => ({
        ...purchaseOrder,
        purchaseOrderProducts: purchaseOrder.purchaseOrderProducts?.map(purchaseOrderProduct => ({
          ...purchaseOrderProduct,
          components: purchaseOrderProduct.components.map(component => ({
            ...component,
            // @ts-ignore
            product: component.product['@id'],
          })),
        })),
      }),
      fields: {
        vendor: {
          render: ({fieldProps, item}) => (
            <ModelAutocompleteField
              modelName={ModelEnum.Vendor}
              {...fieldProps}
              size="sm"
              disabled={item.purchaseOrderProducts.length > 0}
            />
          ),
        },
        createdAt: {
          defaultValue: moment().format(),
        },
        taxIncluded: {
          defaultValue: false,
          render: ({item: {purchaseOrderProducts}}) => (
            <RadioField
              size="sm"
              name="taxIncluded"
              options={[true, false]}
              getOptionLabel={taxIncluded => taxIncluded ? 'TTC' : 'HT'}
              disabled={purchaseOrderProducts.length > 0}
              scrollDisabled
            />
          ),
        },
        ref: true,
        externalRef: true,
        desiredDeliveryDate: {
          defaultValue: moment().add(1, 'days').format(),
        },
        currency: true,
        category: true,
        clinic: true,
        paymentModality: true,
        buyer: {
          render: ({fieldProps}) => (
            <ModelAutocompleteField
              modelName={ModelEnum.User}
              {...fieldProps}
              size='sm'
              getParams={filter => ({
                operator: CompoundFilterOperator.And,
                filters: [
                  filter,
                  {
                    operator: CompoundFilterOperator.Or,
                    filters: [
                      {
                        property: 'role.roleKey',
                        operator: PropertyFilterOperator.Equal,
                        value: RoleKeyEnum.Admin
                      },
                      {
                        property: 'role.roleKey',
                        operator: PropertyFilterOperator.Equal,
                        value: RoleKeyEnum.Buyer
                      }
                    ]
                  }
                ]
              })}
            />
          )
        },
        validationStatus: {
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin],
          defaultValue: ValidationStatusEnum.Pending,
          display: props => !!props.item.id,
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
          display: ({item}) => typeof item.taxIncluded === 'boolean' && !!item.vendor,
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
  ],
}

export default mapping
