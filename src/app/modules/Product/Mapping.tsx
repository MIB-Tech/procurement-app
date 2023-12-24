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
    designation: {
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
    productpricings: {
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
        //  code:true,
        // reference:true,
        // note:true,
        category: true,
        measurementUnit: true,
        vatRate: true,
        // parent: true,
        //  accountingAccount:true,
        //   designation:true,
        isMobilised: true,
        stockable: true
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        //   designation: true,
        //   category: true,
        //   children: true,
        code: true,
        reference: true,
        //  note:true,
        measurementUnit: true,
        accountingAccount: true,
        vatRate: true,
        category: true,
        parent: true,
        children:true,
        isMobilised: true,
        stockable:true,
        // designation:true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        // designation: true,
        // category: true,
        // children: true,
        // purchaseNeedProducts:true,
        // note:true
        code: true,
        reference: true,
        designation: true,
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
