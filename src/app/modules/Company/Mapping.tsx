import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Company> = {
  modelName: ModelEnum.Company,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    code: {
      type: ColumnTypeEnum.String,
      uppercase: true
    },
    name: {
      type: ColumnTypeEnum.String
    },
    purchaseNeeds: {
      type: ModelEnum.PurchaseNeed,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        code: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        code: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        code: true
      }
    }
  ]
};

export default mapping;
