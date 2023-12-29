import {ReactNode} from 'react';
import {NumberColumn} from '../Column/Number/NumberColumn';
import {StringColumn} from '../Column/String/StringColumn';
import {ModelColumn} from '../Column/Model/ModelColumn';
import {BooleanColumn} from '../Column/Boolean/BooleanColumn';
import {ArrayColumn} from '../Column/Array/ArrayColumn';
import {I18nMessageKey} from '../i18n/I18nMessages';
import {UserModel} from '../../app/modules/User';
import {RoleKeyEnum} from '../../app/modules/Role/Model';
import {HydraItem} from './hydra.types';
import {ModelEnum, Models} from '../../app/modules/types';
import {Variant} from 'react-bootstrap/types';
import {OperationModel} from '../../app/modules/Operation';
import {GridProps} from '@mui/material';
import {FieldProps} from '../Column/controls/fields';


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
  footer?: (props: { value?: any, collection: Array<HydraItem<M>> }) => ReactNode
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
  Create = 'CREATE',
  Update = 'UPDATE',
  Detail = 'DETAIL',
  Delete = 'DELETE',
}

// read (Listing(Listing, Calendar), Detail), write (Create, Update, Delete)

/** @deprecated */
export type ItemOperationCallback<M extends ModelEnum> = (props: {
  item: Model<M>,
  operations: OperationModel[]
}) => OperationModel[]

export type ListingColumns<M extends ModelEnum> = Partial<Record<keyof Model<M> | string, boolean | {
  render?: (props: { item: Model<M> }) => ReactNode
}>>
export type FilterColumns<M extends ModelEnum> = Partial<Record<string | keyof Model<M>, boolean | {
  quickFilter?: boolean
  display?: (props: { user: UserModel }) => boolean | undefined
}>>
export type BulkAction<M extends ModelEnum> = {
  render: (props: {selectedItems: Array<HydraItem<M>>}) => ReactNode
}
export type ListingViewType<M extends ModelEnum> = {
  type: ViewEnum.Listing,
  dateFields?: Array<DateField<M>>
  itemOperationRoutes?: ItemOperationCallback<M>
  columns?: ListingColumns<M>
  filterColumns?: FilterColumns<M>
  sortColumns?: Partial<Record<keyof Model<M>, boolean>>
  bulkActions?: Array<BulkAction<M>>
}
export type DateField<M extends ModelEnum> = {
  startProperty: keyof Model<M>,
  endProperty?: keyof Model<M>
  variant?: Variant
}
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
}
/** @deprecated */
export type ImportViewType<M extends ModelEnum> = {
  columns?: Partial<Record<keyof Model<M>, boolean>>
}
export type FormField<M extends ModelEnum> = {
  // required?: boolean,
  display?: DisplayCallback<M>,
  grantedRoles?: RoleKeyEnum[]
  render?: (props: { item: Model<M>, fieldProps: FieldProps }) => ReactNode
  defaultValue?: any
  helperText?: I18nMessageKey
  slotProps?: {
    root?: Omit<GridProps, 'item'>
  }
}

export type FormFields<M extends ModelEnum> = Partial<Record<keyof Model<M> | string, boolean | FormField<M>>>

export enum MutationMode {
  Post = 'POST',
  Put = 'PUT',
}

export type FormViewType<M extends ModelEnum> = {
  mode?: MutationMode
  inlineForm?: boolean
  /** @deprecated */
  submittable?: DisplayCallback<M>
  className?: string
  fields?: FormFields<M>
  slotProps?: {
    root?: Omit<GridProps, 'container'>
    item?: Omit<GridProps, 'item'>
  }
}
export type CreateViewType<M extends ModelEnum> = {
  type: ViewEnum.Create
  /** @deprecated */
  submittable?: DisplayCallback<M>
  fields?: FormFields<M>
} & Omit<FormViewType<M>, 'mode'>
export type UpdateViewType<M extends ModelEnum> = {
  type: ViewEnum.Update
  /** @deprecated */
  submittable?: DisplayCallback<M>
  fields?: FormFields<M>
} & Omit<FormViewType<M>, 'mode'>
export type DeleteViewType<M extends ModelEnum> = {
  type: ViewEnum.Delete
}
export type View<M extends ModelEnum> =
  ListingViewType<M> |
  DetailViewType<M> |
  CreateViewType<M> |
  UpdateViewType<M> |
  DeleteViewType<M>

export type ModelMapping<M extends ModelEnum> = {
  modelName: M
  uploadable?: boolean
  hydraTitle?: (item:HydraItem<M>) => ReactNode
  hydraSubtitle?: (item:HydraItem<M>) => ReactNode
  columnDef: ColumnDef<M>
  views?: Array<View<M>>
}
