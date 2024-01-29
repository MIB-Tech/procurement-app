import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {CellContent} from '../../../_custom/ListingView/views/Table/BodyCell';
import {QUANTITY_STATUS_COLUMN} from '../PurchaseOrderProduct/Mapping';
import {BooleanField} from '../../../_custom/Column/Boolean/BooleanField';
import React from 'react';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';
import {ref} from 'yup';


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
      schema: schema => schema.when('restQuantity', {
        is: (restQuantity: number) => restQuantity > 0,
        then: schema => schema.positive().max(ref('restQuantity')),
      })
    },
    desiredProductQuantity: {
      type: ColumnTypeEnum.Number,
      title: 'ORDERED_QUANTITY'
    },
    restQuantity: {
      type: ColumnTypeEnum.Number,
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    validated: {
      type: ColumnTypeEnum.Boolean,
      nullable: true
    },
    receipt: {
      type: ModelEnum.Receipt
    },
    desiredProduct: {
      type: ModelEnum.DesiredProduct
    },
    components: {
      type: ModelEnum.ReceiptProductComponent,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        quantity: true,
        // desiredProduct: true,
        note: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: {
          render: ({item}) => (
            <div className='w-400px'>
              {item.desiredProduct.designation}
            </div>
          )
        },
        desiredProductQuantity: {
          render: ({item}) => item.desiredProduct.quantity
        },
        restQuantity: {
          render: ({item}) => item.restQuantity
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
