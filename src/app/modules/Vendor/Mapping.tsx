import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { ASSET_MULTIPLE_COLUMN } from '../columns';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Vendor> = {
  modelName: ModelEnum.Vendor,
  icon: '/communication/com005.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    contacts: {
      type: ModelEnum.VendorContact,
      multiple: true,
      embeddedForm: true
    },
    assets: ASSET_MULTIPLE_COLUMN,
    attachments: {
      type: ModelEnum.VendorAttachment,
      multiple: true
    },
    images: {
      type: ModelEnum.VendorImage,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.VendorListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.VendorDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.VendorDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.VendorCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.VendorUpdate
    }
  ]
};

export default mapping;
