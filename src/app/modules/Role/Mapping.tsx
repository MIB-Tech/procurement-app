import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { string } from 'yup';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Role> = {
  modelName: ModelEnum.Role,
  icon: '/general/gen051.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    roleKey: {
      type: ColumnTypeEnum.String,
      uppercase: true,
      schema: string()
      .matches(/[A-Z.]+$/, { message: { id: 'VALIDATION.STRING.UPPERCASE' } })
      .test(
        'VALIDATION.STRING.STARTS_WITH',
        { id: 'VALIDATION.STRING.STARTS_WITH', params: { value: 'ROLE_' } },
        value => !!value?.startsWith('ROLE_')
      )
    },
    routes: {
      type: ModelEnum.Route,
      multiple: true
    },
    users: {
      type: ModelEnum.User,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.RoleListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.RoleDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.RoleDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.RoleCreate,
      fields: {
        name: true,
        roleKey: true,
        routes: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.RoleUpdate,
      fields: {
        name: true,
        roleKey: true,
        routes: true
      }
    }
  ]
};

export default mapping;
