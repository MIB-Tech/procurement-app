import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat, StringSelectOption } from '../../../_custom/Column/String/StringColumn';
import { ASSET_MULTIPLE_COLUMN } from '../columns';
import { ContractTypeEnum } from './Model';
import { RouteKeyEnum } from '../Route/Model';
import clsx from 'clsx';
import { Trans } from '../../../_custom/components/Trans';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


export const CONTRACT_TYPE_OPTIONS: Array<StringSelectOption> = [
  { id: ContractTypeEnum.LaborAndParts, color: 'primary' },
  { id: ContractTypeEnum.LaborOnly, color: 'success' },
  { id: ContractTypeEnum.PreventiveMaintenance, color: 'info' }
];

const mapping: ModelMapping<ModelEnum.Contract> = {
  modelName: ModelEnum.Contract,
  icon: '/files/fil008.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    contractNumber: {
      type: ColumnTypeEnum.String
    },
    contractType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: CONTRACT_TYPE_OPTIONS
    },
    startAt: {
      title: 'START_DATE',
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true
    },
    endAt: {
      title: 'END_DATE',
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      nullable: true
    },
    assets: ASSET_MULTIPLE_COLUMN,
    attachments: {
      type: ModelEnum.ContractAttachment,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ContractListing,
      columns: {
        startAt: true,
        endAt: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ContractDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ContractDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ContractCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ContractUpdate
    }
  ]
};

export default mapping;
