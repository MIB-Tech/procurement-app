import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {SelectField} from "../../../_custom/Column/controls/fields/SelectField/SelectField";
import {StringFormat} from "../../../_custom/Column/String/StringColumn";
import {NumberFormat} from "../../../_custom/Column/Number/NumberColumn";


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
    reference: {
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
    parents: {
      type: ModelEnum.Product,
      multiple: true
    },
    category: {
      type: ModelEnum.Category,
      nullable: true
    },
    children: {
      type: ModelEnum.Product,
      multiple: true,
      title: 'SUB_PRODUCTS'
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
      type: ModelEnum.PurchaseOrder
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
        stockable: true
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        reference: true,
        name: true,
        measurementUnit: true,
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
        note: true,
        isMobilised: true,
        stockable: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        reference: true,
        name: true,
        measurementUnit: true,
        accountingAccount: true,
        vatRate: {
          defaultValue: .2,
          render: ({item, fieldProps}) => (
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
        note: true,
        isMobilised: true,
        stockable: true,
      }
    }
  ]
};

export default mapping;
