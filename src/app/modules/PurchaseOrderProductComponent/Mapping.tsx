import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {QUANTITY_STATUS_OPTIONS} from '../PurchaseOrder/Model';
import {number} from 'yup';
import React from 'react';
import {SelectField} from '../../../_custom/Column/controls/fields/SelectField/SelectField';


const mapping: ModelMapping<ModelEnum.PurchaseOrderProductComponent> = {
  modelName: ModelEnum.PurchaseOrderProductComponent,
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
      validation: {
        positive: true
      }
    },
    componentQuantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true
      }
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct
    },
    product: {
      type: ModelEnum.PurchaseOrderProduct
    },
  },
  views: [
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        designation: true,
        quantity: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: true,
        designation: true,
        quantity: true,
      }
    }
  ]
};

export default mapping;
