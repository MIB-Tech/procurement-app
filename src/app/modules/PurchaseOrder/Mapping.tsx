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
    defaultValue: true,
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
  clinic: {
    render: ({fieldProps, item}) => (
      <ModelAutocompleteField
        modelName={ModelEnum.Clinic}
        {...fieldProps}
        size="sm"
        disabled={item.purchaseOrderProducts.length > 0}
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

      }
    }
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
    display: ({item}) => typeof item.taxIncluded === 'boolean' && !!item.vendor && !!item.clinic,
  },
  comment: {
    slotProps: {
      root: {
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
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
      //exportable: true
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true,
      //exportable: true
    },
    externalRef: {
      type: ColumnTypeEnum.String,
      nullable: true,
      //exportable: true
    },
    taxIncluded: {
      type: ColumnTypeEnum.Boolean,
      //exportable: true
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      //exportable: true
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
      //exportable: true
    },
    totalInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      //exportable: true
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
      //exportable: true
    },
    comment: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true,
      //exportable: true
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: 'DELIVERY_STATUS',
      options: QUANTITY_STATUS_OPTIONS,
    },
    buyer: {
      type: ModelEnum.User,
      nullable: true,
      //exportable: true
    },
    vendor: {
      type: ModelEnum.Vendor,
      //exportable: true
    },
    currency: {
      type: ModelEnum.Currency,
      nullable: true,
      //exportable: true
    },
    category: {
      type: ModelEnum.PurchaseOrderCategory,
      nullable: true,
      title: 'NATURE',
      //exportable: true
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
      //exportable: true
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
    clinic: {
      type: ModelEnum.Clinic,
      //exportable: true
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
        clinic: true
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
        totalExclTax: true,
        totalInclTax: true,
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
          display: ({item}) => item.validationStatus === ValidationStatusEnum.Validated,
        },
        validatedAt: {
          display: ({item}) => item.validationStatus === ValidationStatusEnum.Validated,
        },
        status: true,
        taxIncluded: {
          render: ({item: {taxIncluded}}) => taxIncluded ? 'TTC' : 'HT',
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
        totalExclTax: true,
        totalVatTax: true,
        totalDiscount: true,
        totalInclTax: true,
        clinic: true,
        clinicStatus: true
      },
      customActions: [
        {render: ({item}) => <PrintPurchaseOrderButton item={item}/>},
        {
          render: ({item}) => {
            const {status, invoice, validationStatus} = item;
            if (status !== QuantityStatusEnum.FullyReceived || invoice || validationStatus !== ValidationStatusEnum.Validated) return null;

            return <GenerateInvoiceButton item={item}/>;
          },

        },
        {
          render: ({item}) => {
            const {status, validationStatus} = item

            return status !== QuantityStatusEnum.FullyReceived &&
              validationStatus === ValidationStatusEnum.Validated &&
                <GenerateReceiptButton item={item}/>

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
      submittable: ({formik, isGranted}) => {
        const {validationStatus, status, invoice} = formik.initialValues
        const isPendingValidation = validationStatus === ValidationStatusEnum.Pending
        const granted = isGranted([RoleKeyEnum.Admin, RoleKeyEnum.SuperAdmin])

        return (granted && status === QuantityStatusEnum.Unreceived && !invoice) || isPendingValidation
      },
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
        paymentModality: {
          slotProps: {
            root: {
              sm: 4,
              lg: 4,
              md: 4,
              xl: 4,
            }
          }
        },
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
          display: ({item}) => !!item.id,
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
        comment: {
          slotProps: {
            root: {
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
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
    },
  ],
}

export default mapping
