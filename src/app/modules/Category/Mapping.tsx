import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { INVENTORY_NUMBER_ALLOW_UPDATE } from '../Asset/Mapping';


const mapping: ModelMapping<ModelEnum.Category> = {
  modelName: ModelEnum.Category,
  icon: '/abstract/abs029.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    code: {
      type: ColumnTypeEnum.String,
      length: 1,
      uppercase: true
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    parent: {
      type: ModelEnum.Category,
      nullable: true
    },
    children: {
      type: ModelEnum.Category,
      multiple: true,
      title: 'SUBCATEGORIES'
    },
    assetTypes: {
      type: ModelEnum.AssetType,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.CategoryListing,
      columns: {
        code: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.CategoryDetail,
      columns: {
        name: true,
        code: true,
        description: true,
        parent: true,
        children: true,
        assetTypes: {
          display: ({item}) => !!item.parent
        }
      }
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.CategoryDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.CategoryCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.CategoryUpdate,
      fields: {
        name: true,
        description: true,
        code: {
          grantedRoles: INVENTORY_NUMBER_ALLOW_UPDATE
        },
        parent: {
          grantedRoles: INVENTORY_NUMBER_ALLOW_UPDATE
        }
      }
    }
  ]
};

export default mapping;
