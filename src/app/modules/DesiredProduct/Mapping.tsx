import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {number} from 'yup';
import {QUANTITY_STATUS_OPTIONS} from "../PurchaseOrder/Model";
import React from "react";
import {Field} from "./Field";


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
    deliveryDepot: {
      type: ModelEnum.DeliveryDepot
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        deliveryDepot: true,
        quantity: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: true,
        quantity: true,
        deliveryDepot: {
          render: ({fieldProps}) => <Field {...fieldProps}/>
        }
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: true,
        quantity: true,
        deliveryDepot: true
      }
    }
  ]
};

export default mapping;
