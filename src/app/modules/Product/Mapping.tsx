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
    category: {
      type: ModelEnum.Category
    },
    purchaseNeedProducts: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    }
  ]
};

export default mapping;
