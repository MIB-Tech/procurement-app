import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {QUANTITY_STATUS_OPTIONS} from '../PurchaseOrder/Model';
import {number} from 'yup';
import React from "react";
import {SelectField} from "../../../_custom/Column/controls/fields/SelectField/SelectField";


const mapping: ModelMapping<ModelEnum.DesiredProduct> = {
  modelName: ModelEnum.DesiredProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    designation: {
      type: ColumnTypeEnum.String
    },
    address: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      title: 'RECEIVED_QUANTITY',
      schema: number().positive()
    },
    restQuantity: {
      type: ColumnTypeEnum.Number
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: 'DELIVERY_STATUS',
      options: QUANTITY_STATUS_OPTIONS
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        address: true,
        quantity: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: true,
        quantity: true,
        address: {
          render: ({item, fieldProps}) => (
            <SelectField
              size='sm'
              options={['CIOC', 'HPC', 'CGO', 'COC']}
              placeholder='Adrs'
              {...fieldProps}
            />
          )
        }
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: true,
        quantity: true,
        address: {
          render: ({item, fieldProps}) => (
            <SelectField
              size='sm'
              options={['CIOC', 'HPC', 'CGO', 'COC']}
              placeholder='Adrs'
              {...fieldProps}
            />
          )
        }
      }
    }
  ]
};

export default mapping;
