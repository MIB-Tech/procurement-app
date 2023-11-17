import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import {
  CompoundFilterOperator,
  PropertyFilterOperator
} from '../../../_custom/ListingView/Filter/Filter.types';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.AssetType> = {
  modelName: ModelEnum.AssetType,
  icon: '/technology/teh001.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    modalityDesign: {
      type: ColumnTypeEnum.String,
      length: 2,
      uppercase: true,
      nullable: true
    },
    category: {
      title: 'SUBCATEGORY',
      type: ModelEnum.Category,
      getAutocompleteParams: filter => ({
        operator: CompoundFilterOperator.And,
        filters: [
          {
            //TODO TS
            property: 'parent',
            operator: PropertyFilterOperator.IsNotNull
          },
          filter
        ]
      })
    },
    assetModels: {
      type: ModelEnum.AssetModel,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.AssetTypeListing,
      columns: {
        category: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.AssetTypeDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.AssetTypeDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.AssetTypeCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.AssetTypeUpdate
    }
  ]
};

export default mapping;
