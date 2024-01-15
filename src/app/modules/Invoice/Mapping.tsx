import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator
} from '../../../_custom/ListingView/Filter/Filter.types';
import React from 'react';
import {PrintPurchaseOrderButton} from '../PurchaseOrder/components/PrintPurchaseOrderButton';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';
import {GenerateInvoiceButton} from '../PurchaseOrder/components/GenerateInvoiceButton';
import {GenerateReceiptButton} from '../PurchaseOrder/components/GenerateReceiptButton';
import {PrintInvoiceButton} from './PrintInvoiceButton';


const mapping: ModelMapping<ModelEnum.Invoice> = {
  modelName: ModelEnum.Invoice,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    invoiceNumber: {
      type: ColumnTypeEnum.String
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    vendor: {
      type: ModelEnum.Vendor
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        createdAt: true,
        purchaseOrders: true,
      }
    },
    {
      type: ViewEnum.Create,
      navigateTo: item => item['@id'],
      fields: {
        vendor: true,
        purchaseOrders: {
          render: ({item, fieldProps}) => {
            const {vendor, purchaseOrders} = item
            return (
              <ModelAutocompleteField
                {...fieldProps}
                size='sm'
                modelName={ModelEnum.PurchaseOrder}
                multiple
                disabled={!vendor && purchaseOrders.length === 0}
                getParams={filter => {
                  const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
                    operator: CompoundFilterOperator.And,
                    filters: [
                      filter,
                      {
                        property: 'vendor',
                        operator: PropertyFilterOperator.Equal,
                        value: vendor
                      },
                      {
                        property: 'invoice',
                        operator: PropertyFilterOperator.IsNull,
                      },
                    ]
                  };

                  return newFilter;
                }}
              />
            );
          }
        }
      }
    },
    {
      type:ViewEnum.Detail,
      customActions: [
        {render: ({item}) => <PrintInvoiceButton item={item}/>},
      ],
      columns:{
        invoiceNumber:true,
        createdAt: true,
        purchaseOrders: true
      }
    }
  ]

};

export default mapping;
