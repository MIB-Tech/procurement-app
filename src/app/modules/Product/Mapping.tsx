import {FormFields, ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {SelectField} from '../../../_custom/Column/controls/fields/SelectField/SelectField';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';

const formFields: FormFields<ModelEnum.Product> = {
  ref: true,
  name: true,
  measurementUnit: {
    defaultValue: 'U'
  },
  accountingAccount: true,
  vatRate: {
    defaultValue: .2,
    render: ({fieldProps}) => (
      <SelectField
        size='sm'
        options={[0, .07, .1, .14, .2]}
        getOptionLabel={varRate => `${(varRate * 100).toFixed(0)} %`}
        placeholder='TVA'
        {...fieldProps}
      />
    )
  },
  category: true,
  children: true,
  section: true,
  isMobilised: true,
  stockable: true,
  note: {
    slotProps: {
      root: {
        sm: 12,
        md: 12,
        lg: 12,
      }
    }
  },
  components: {
    slotProps: {
      root: {
        sm: 12,
        md: 12,
        lg: 12,
      }
    }
  },
};

const mapping: ModelMapping<ModelEnum.Product> = {
  modelName: ModelEnum.Product,
  // hydraTitle: (item)=>(
  //   <div className='text-truncate mw-600px'>
  //     {item['@title']}
  //   </div>
  // ),
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    code: {
      type: ColumnTypeEnum.String
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true,
      format: StringFormat.Text,
    },
    measurementUnit: {
      type: ColumnTypeEnum.String
    },
    accountingAccount: {
      type: ColumnTypeEnum.String
    },
    isMobilised: {
      type: ColumnTypeEnum.Boolean,
    },
    stockable: {
      type: ColumnTypeEnum.Boolean
    },
    vatRate: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent
    },
    category: {
      type: ModelEnum.Category,
      nullable: true
    },
    components: {
      type: ModelEnum.Component,
      multiple: true,
      embeddedForm: true
    },
    parentComponents: {
      type: ModelEnum.Component,
      multiple: true
    },
    purchaseNeedProducts: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true
    },
    pricing: {
      type: ModelEnum.ProductPricing,
      multiple: true
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    },
    section: {
      type: ModelEnum.ProductSection,
      nullable: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        category: true,
        measurementUnit: true,
        vatRate: true,
        isMobilised: true,
        stockable: true,
        section: true
      }
    },
    {
      type: ViewEnum.Create,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        }
      },
      fields: formFields
    },
    {
      type: ViewEnum.Update,
      slotProps: {
        item: {
          sm: 4,
          md: 3,
          lg: 2,
        }
      },
      fields: formFields
    },
    {
      type: ViewEnum.Detail,
      columns: {
        category: true,
        section: true,
        measurementUnit: true,
        vatRate: true,
        isMobilised: true,
        stockable: true,
        pricing: true,
        components: true
      },
    },
  ]
};

export default mapping;
