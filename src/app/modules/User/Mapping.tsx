import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping'
import {StringFormat} from '../../../_custom/Column/String/StringColumn'
import {ref, string} from 'yup'
import {ColumnTypeEnum} from '../../../_custom/types/types'
import {ModelEnum} from '../types'
import moment from 'moment'
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField'
import {FC} from 'react'
import {FieldProps} from '../../../_custom/Column/controls/fields'
import {CompoundFilterOperator, PropertyFilterOperator} from '../../../_custom/ListingView/Filter/Filter.types'

const CategoryField:FC<FieldProps> = ({...props}) => (
  <ModelAutocompleteField
    modelName={ModelEnum.Category}
    multiple
    size='sm'
    getParams={filter => ({
      operator: CompoundFilterOperator.And,
      filters: [
        filter,
        {
          property: 'parent',
          operator: PropertyFilterOperator.IsNull
        }
      ]
    })}
    {...props}
  />
)

const mapping: ModelMapping<ModelEnum.User> = {
  modelName: ModelEnum.User,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
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
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      title: 'CREATE_TIME',
      nullable: true,
      min: moment().format()
    },
    updatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      title: 'LAST_MODIFIED_TIME'
    },
    restrictedByCategories: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    role: {
      type: ModelEnum.Role,
      nullable: true
    },
    clinics: {
      type: ModelEnum.Clinic,
      multiple: true
    },
    referentPurchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    categories: {
      type: ModelEnum.Category,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        role: true,
        email: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        passwordConfirm: true,
        role: true,
        clinics: true,
        restrictedByCategories: true,
        categories: {
          render: ({fieldProps}) => <CategoryField {...fieldProps}/>
        },
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        clinics: true,
        restrictedByCategories: true,
        categories: {
          render: ({fieldProps}) => <CategoryField {...fieldProps}/>
        },
      }
    }
  ]
};

export default mapping;
