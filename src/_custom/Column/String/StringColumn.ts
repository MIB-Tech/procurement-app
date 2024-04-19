import {StringSchema} from 'yup'
import {I18nMessageKey} from '../../i18n/I18nMessages'
import {RoleKeyEnum} from '../../../app/modules/Role/Model'
import {ColumnTypeEnum} from '../../types/types'
import {Model} from '../../types/ModelMapping'
import {ModelEnum} from '../../../app/modules/types'


export enum StringFormat {
  Email = 'EMAIL',
  PhoneNumber = 'PHONE_NUMBER',
  Text = 'TEXT',
  Datetime = 'DATETIME',
  Date = 'DATE',
  Time = 'TIME',
  Select = 'SELECT',
  Password = 'PASSWORD',
  Icon = 'ICON',
  Link = 'LINK',
  Qrcode = 'QRCODE',
  // RichText = 'RICH_TEXT',
}

export type StringBaseColumn = {
  type: ColumnTypeEnum.String
  schema?: StringSchema
  length?: number
  uppercase?: true
}

export enum DateFormatEnum {
  Local = 'l',
  Friendly = 'LL',
  US = 'M/D/YYYY',
  European = 'D/M/YYYY',
  ISO = 'YYYY-MM-DD',
}

export enum TimeFormatEnum {
  Half = 'h:mma',
  Full = 'HH:mm'
}

type StringDatetimeColumn = {
  format: StringFormat.Datetime
  dateFormat?: DateFormatEnum
  timeFormat?: TimeFormatEnum
  min?: string
  max?: string
  // timeZone
}
type StringDateColumn = {
  format: StringFormat.Date
} & Pick<StringDatetimeColumn, 'dateFormat' | 'min' | 'max'>
type StringTimeColumn = {
  format: StringFormat.Time
} & Pick<StringDatetimeColumn, 'timeFormat'>
type StringBaselessColumn = {
  format?: Exclude<StringFormat, StringFormat.Datetime | StringFormat.Date | StringFormat.Time | StringFormat.Select | StringFormat.Password>
}
export type StringSelectOption = {
  id: string,
  label?: I18nMessageKey
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
}
export type StringSelectTransition<M extends ModelEnum> = {
  from: string
  to: string
  grant?: RoleKeyEnum[]
  when?: (item: Model<M>) => boolean
}
type StringSelectColumn<M extends ModelEnum> = {
  format: StringFormat.Select
  inline?: boolean
  options: Array<StringSelectOption>
  transitions?: Array<StringSelectTransition<M>>
  // multiple?: boolean
}
export type StringPasswordColumn = {
  format: StringFormat.Password
  meter?: boolean
}
export type StringColumn =
  StringBaseColumn
  & (StringBaselessColumn | StringDatetimeColumn | StringDateColumn | StringTimeColumn | StringSelectColumn<any> | StringPasswordColumn)

export const STRING_FORMAT_CONFIG: Record<StringFormat, {icon: string}> = {
  [StringFormat.Datetime]: {icon: '/general/gen013.svg'},
  [StringFormat.Date]: {icon: '/general/gen014.svg'},
  [StringFormat.Email]: {icon: '/communication/com010.svg'},
  [StringFormat.Password]: {icon: '/general/gen047.svg'},
  [StringFormat.PhoneNumber]: {icon: '/electronics/elc002.svg'},
  [StringFormat.Select]: {icon: '/text/txt009.svg'},
  [StringFormat.Text]: {icon: '/text/txt001.svg'},
  [StringFormat.Time]: {icon: '/general/gen013.svg'},
  [StringFormat.Icon]: {icon: '/general/gen017.svg'},
  [StringFormat.Link]: {icon: '/coding/cod007.svg'},
  [StringFormat.Qrcode]: {icon: '/ecommerce/ecm010.svg'},
}