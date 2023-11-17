import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { ASSET_MULTIPLE_COLUMN } from '../columns';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.AssetModel> = {
  modelName: ModelEnum.AssetModel,
  icon: '/technology/teh003.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    model: {
      type: ColumnTypeEnum.String
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    manufacturer: {
      type: ModelEnum.Manufacturer
    },
    assetType: {
      type: ModelEnum.AssetType
    },
    assets: ASSET_MULTIPLE_COLUMN,
    attachments: {
      type: ModelEnum.AssetModelAttachment,
      multiple: true
    },
    images: {
      type: ModelEnum.AssetModelImage,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.AssetModelListing,
      columns: {
        manufacturer: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.AssetModelDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.AssetModelDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.AssetModelCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.AssetModelUpdate
    }
  ]
};

export default mapping;
