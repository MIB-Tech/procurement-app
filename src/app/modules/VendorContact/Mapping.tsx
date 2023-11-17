import { ModelMapping, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.VendorContact> = {
  modelName: ModelEnum.VendorContact,
  icon: '/communication/com005.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    email: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Email
    },
    phoneNumber: {
      type: ColumnTypeEnum.String,
      format: StringFormat.PhoneNumber
    },
    activity: {
      type: ColumnTypeEnum.String,
      nullable: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        email: true,
        phoneNumber: true,
      }
    },
    {
      type: ViewEnum.Form
    }
  ]
};

export default mapping;
