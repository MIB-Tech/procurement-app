import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {CellContent} from '../../../_custom/ListingView/views/Table/BodyCell';
import {QUANTITY_STATUS_COLUMN} from '../PurchaseOrderProduct/Mapping';
import {BooleanField} from '../../../_custom/Column/Boolean/BooleanField';
import React from 'react';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';


const mapping: ModelMapping<ModelEnum.ReceiptProduct> = {
  modelName: ModelEnum.ReceiptProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      min: 0,
      max: 'desiredProductQuantity'
    },
    desiredProductQuantity: {
      type: ColumnTypeEnum.Number,
      title: 'ORDERED_QUANTITY'
    },
    note: {
      type: ColumnTypeEnum.String
    },
    validated: {
      type: ColumnTypeEnum.Boolean
    },
    receipt: {
      type: ModelEnum.Receipt
    },
    desiredProduct: {
      type: ModelEnum.DesiredProduct
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: {
          render: ({item}) => item.desiredProduct.designation
        },
        desiredProductQuantity: {
          render: ({item}) => item.desiredProduct.quantity
        },
        quantity: true,
        note: true,
        status: {
          render: ({item}) => {
            return (
              <CellContent
                {...QUANTITY_STATUS_COLUMN}
                value={item.desiredProduct.status}
              />
            );
          }
        },
        validated: {
          render: ({fieldProps, item}) => (
            <BooleanField
              {...fieldProps}
              disabled={item.desiredProduct.status === QuantityStatusEnum.FullyReceived}
            />
          )
        }
      }
    }
  ]
};

export default mapping;
