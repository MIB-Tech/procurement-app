import { ReactNode } from 'react';
import { NumberColumn } from '../Column/Number/NumberColumn';
import { StringColumn } from '../Column/String/StringColumn';
import { ModelColumn } from '../Column/Model/ModelColumn';
import { BooleanColumn } from '../Column/Boolean/BooleanColumn';
import { ArrayColumn } from '../Column/Array/ArrayColumn';
import { I18nMessageKey } from '../i18n/I18nMessages';
import { UserModel } from '../../app/modules/User';
import { RouteModel } from '../../app/modules/Route';
import { RouteKeyEnum } from '../../app/modules/Route/Model';
import { RoleKeyEnum } from '../../app/modules/Role/Model';
import { HydraItem } from './hydra.types';
import { ModelEnum, Models } from '../../app/modules/types';
import { Variant } from 'react-bootstrap/types';


export type Model<M extends ModelEnum> = Models[M]
export type DisplayCallback<M extends ModelEnum> = (props: { item: Model<M> | HydraItem<M> }) => boolean | undefined
export type DisplayViewBaseColum<M extends ModelEnum> = {
  display?: true | RoleKeyEnum[] | DisplayCallback<M>,
  render?: (props: { item: Model<M> }) => ReactNode
}

export type FormViewBaseColumn<M extends ModelEnum> = {
  required?: true
} & DisplayViewBaseColum<M>

export type ViewColumn<M extends ModelEnum> = {
  title?: I18nMessageKey
  nullable?: boolean
}
export type TypeColum<M extends ModelEnum = any> =
  NumberColumn
  | StringColumn
  | ModelColumn<M>
  | BooleanColumn
  | ArrayColumn
export type ColumnMapping<M extends ModelEnum> = ViewColumn<M> & TypeColum<M>
export type ColumnDef<M extends ModelEnum> = Record<keyof Model<M>, ColumnMapping<M>>

export enum ViewEnum {
  Listing = 'LISTING',
  Calendar = 'CALENDAR',
  Detail = 'DETAIL',
  Delete = 'DELETE',
  Form = 'FORM',
  Import = 'IMPORT',
}

export type ItemOperationCallback<M extends ModelEnum> = (props: { item: Model<M>, routes: RouteModel[], authUser: UserModel }) => RouteModel[]
type BaseViewType = {
  routeKey?: RouteKeyEnum
}
export type ListingColumns<M extends ModelEnum> = Partial<Record<keyof Model<M>, boolean | {
  render?: (props: { item: Model<M> }) => ReactNode
}>>
export type FilterColumns<M extends ModelEnum> = Partial<Record<string | keyof Model<M>, boolean | {
  display: (props: { user: UserModel }) => boolean | undefined
}>>
export type ListingViewType<M extends ModelEnum> = {
  type: ViewEnum.Listing,
  itemOperationRoutes?: ItemOperationCallback<M>
  columns?: ListingColumns<M>
  filterColumns?: FilterColumns<M>
  sortColumns?: Partial<Record<keyof Model<M>, boolean>>
} & BaseViewType
export type DateField<M extends ModelEnum> = {
  startProperty: keyof Model<M>,
  endProperty?: keyof Model<M>
  variant?: Variant
}
export type CalendarViewType<M extends ModelEnum> = {
  type: ViewEnum.Calendar,
  dateFields: Array<DateField<M>>
  //
  itemOperationRoutes?: ItemOperationCallback<M>
  columns?: ListingColumns<M>
  filterColumns?: FilterColumns<M>
  sortColumns?: Partial<Record<keyof Model<M>, boolean>>
} & BaseViewType
export type DetailColumns<M extends ModelEnum> = Partial<Record<keyof Model<M> | string, boolean | {
  as?: 'EMPTY' | 'TAB'
  display?: DisplayCallback<M>,
  grantedRoles?: RoleKeyEnum[]
  render?: (props: { item: Model<M> }) => ReactNode
}>>
export type DetailViewType<M extends ModelEnum> = {
  type: ViewEnum.Detail
  itemOperationRoutes?: ItemOperationCallback<M>
  columns?: DetailColumns<M>
} & BaseViewType
export type ImportViewType<M extends ModelEnum> = {
  type: ViewEnum.Import
  columns?: Partial<Record<keyof Model<M>, boolean>>
} & BaseViewType
export type FormField<M extends ModelEnum> = {
  // required?: boolean,
  display?: DisplayCallback<M>,
  grantedRoles?: RoleKeyEnum[]
  render?: (props: { item: Model<M> }) => ReactNode
  defaultValue?: any
}

export type FormFields<M extends ModelEnum> = Partial<Record<keyof Model<M> | string, boolean | FormField<M>>>

export enum MutationMode {
  Post = 'POST',
  Put = 'PUT',
}

export type FormViewType<M extends ModelEnum> = {
  type: ViewEnum.Form
  mode?: MutationMode
  submittable?: DisplayCallback<M>
  fields?: FormFields<M>
} & BaseViewType
export type DeleteViewType<M extends ModelEnum> = {
  type: ViewEnum.Delete
} & BaseViewType
export type View<M extends ModelEnum> =
  ListingViewType<M> |
  CalendarViewType<M> |
  FormViewType<M> |
  DetailViewType<M> |
  DeleteViewType<M> |
  ImportViewType<M>

export type ModelMapping<M extends ModelEnum> = {
  modelName: M
  icon?: string
  uploadable?: boolean,
  hydraTitle?: (item:HydraItem<M>) => ReactNode,
  hydraSubtitle?: (item:HydraItem<M>) => ReactNode,
  columnDef: ColumnDef<M>
  views?: Array<View<M>>
}
