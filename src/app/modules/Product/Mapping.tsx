import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


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
      type: ColumnTypeEnum.String
    },
    note: {
      type: ColumnTypeEnum.String
    },
    measurementUnit: {
      type: ColumnTypeEnum.String
    },
    accountingAccount: {
      type: ColumnTypeEnum.String
    },
    isMobilised: {
      type: ColumnTypeEnum.Boolean
    },
    stockable: {
      type: ColumnTypeEnum.Boolean
    },
    vatRate: {
      type: ColumnTypeEnum.Number
    },
    parent: {
      type: ModelEnum.Product,
      nullable: true
    },
    category: {
      type: ModelEnum.Category
    },
    children: {
      type: ModelEnum.Product,
      multiple: true
    },
    purchaseNeedProducts: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true
    },
    pricing: {
      type: ModelEnum.ProductPricing
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
        name: true,
        code: true,
        reference: true,
        note: true,
        measurementUnit: true,
        accountingAccount: true,
        isMobilised: true,
        stockable: true,
        vatRate: true,
        category: true,
        parent: true,
        children: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        // name: true,
        // category: true,
        // children: true,
        // purchaseNeedProducts:true,
        // note:true
        code: true,
        reference: true,
        name: true,
        note: true,
        measurementUnit: true,
        category: true,
        parent: true,
        children: true,
        accountingAccount: true,
        vatRate: true,
        isMobilised: true,
        stockable: true
      }
    }
  ]
};

export default mapping;
