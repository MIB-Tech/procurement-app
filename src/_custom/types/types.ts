import {ColumnDef, FormFields, FormViewBaseColumn, Model, ModelMapping, TypeColum} from './ModelMapping';
import {AxiosError, AxiosResponse} from 'axios';
import {JsonldErrorCreateResponse, JsonldSuccessCreateResponse} from './hydra.types';
import {FormattedMessageProps} from '../components/Trans';
import {ModelEnum} from '../../app/modules/types';


export type SuccessResponse = AxiosResponse<JsonldSuccessCreateResponse>
export type ErrorResponse<M extends ModelEnum> = AxiosError<JsonldErrorCreateResponse<Model<M>>>
export type ValidationSchemaDef<M extends ModelEnum> = Record<keyof Model<M> | string, Pick<FormViewBaseColumn<M>, 'required'> & TypeColum>
export type ValidationSchemaProps<M extends ModelEnum> = {
  columnDef: ColumnDef<M>,
  trans: ({ values, ...descriptor }: FormattedMessageProps) => string
  fields: FormFields<M>,
  depth?: number,
  noSortEdges?: Array<[string, string]>
}

export enum ColumnTypeEnum {
  Number = 'NUMBER',
  String = 'STRING',
  Boolean = 'BOOLEAN',
  Array = 'ARRAY',
}

export type AbstractModel = {
  id: number
  uid: string
}
export type CreateTimestamp = {
  createdAt?: string
}
export type UpdateTimestamp = {
  updatedAt?: string
}
export type Timestamp = CreateTimestamp & UpdateTimestamp
export type Mapping = {
  [M in ModelEnum]: ModelMapping<M>;
};
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};