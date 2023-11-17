import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { RouteKeyEnum } from './Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Route> = {
  modelName: ModelEnum.Route,
  icon: '/abstract/abs029.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    icon: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Icon,
      nullable: true
    },
    routeKey: {
      type: ColumnTypeEnum.String,
      uppercase: true
    },
    title: {
      type: ColumnTypeEnum.String
    },
    contextualTitle: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    sortIndex: {
      type: ColumnTypeEnum.Number
    },
    treePath: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Link
    },
    treeLevel: {
      type: ColumnTypeEnum.Number
    },
    treePathSource: {
      type: ColumnTypeEnum.String
    },
    parent: {
      type: ModelEnum.Route,
      nullable: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.RouteListing,
      columns: {
        icon: true,
        treePath: true,
        parent: true,
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.RouteDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.RouteDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.RouteCreate,
      fields: {
        icon: true,
        routeKey: true,
        title: true,
        contextualTitle: true,
        sortIndex: true,
        treePathSource: true,
        parent: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.RouteUpdate,
      fields: {
        icon: true,
        routeKey: true,
        title: true,
        contextualTitle: true,
        sortIndex: true,
        treePathSource: true,
        parent: true
      }
    }
  ]
};

export default mapping;
