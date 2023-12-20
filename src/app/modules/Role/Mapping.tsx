import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import React from 'react';
import {string} from 'yup';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Role> = {
  modelName: ModelEnum.Role,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    },
    roleKey: {
      type: ColumnTypeEnum.String,
      uppercase: true,
      schema: string()
        .matches(/[A-Z.]+$/, {message: {id: 'VALIDATION.STRING.UPPERCASE'}})
        .test(
          'VALIDATION.STRING.STARTS_WITH',
          {id: 'VALIDATION.STRING.STARTS_WITH', params: {value: 'ROLE_'}},
          value => !!value?.startsWith('ROLE_')
        )
    },
    operations: {
      type: ModelEnum.Operation,
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
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        roleKey: true,
        routes: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        roleKey: true,
        routes: true
      }
    }
  ]
};

export default mapping;
