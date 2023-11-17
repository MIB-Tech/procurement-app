import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { CREATED_AT_COLUMN } from '../columns';
import { ref, string } from 'yup';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.User> = {
  modelName: ModelEnum.User,
  icon: '/communication/com006.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    username: {
      type: ColumnTypeEnum.String
    },
    firstName: {
      type: ColumnTypeEnum.String
    },
    lastName: {
      type: ColumnTypeEnum.String
    },
    phoneNumber: {
      type: ColumnTypeEnum.String,
      format: StringFormat.PhoneNumber
    },
    email: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Email,
      nullable: true
    },
    password: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Password,
      meter: true
    },
    passwordConfirm: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Password,
      title: 'PASSWORD_CONFIRM',
      schema: string().oneOf([ref('password'), null], 'VALIDATION.STRING.PASSWORD_CONFIRM')
    },
    createdAt: CREATED_AT_COLUMN,
    updatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      title: 'LAST_MODIFIED_TIME'
    },
    role: {
      type: ModelEnum.Role,
      nullable: true
    },
    location: {
      type: ModelEnum.Location,
      nullable: true
    },
    teams: {
      type: ModelEnum.Team,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.UserListing,
      columns: {
        username: true,
        phoneNumber: true,
        email: true,
        // role: true,
        location: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.UserDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.UserDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.UserCreate,
      fields: {
        username: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        password: true,
        passwordConfirm: true,
        role: true,
        location: true,
        teams: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.UserUpdate,
      fields: {
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        role: true,
        location: true,
        teams: true
      }
    }
  ]
};

export default mapping;
