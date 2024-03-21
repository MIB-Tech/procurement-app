import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.ProductSectionBudget> = {
    modelName: ModelEnum.ProductSectionBudget,
    columnDef: {
      id: {
        type: ColumnTypeEnum.Number
      },
      uid: {
        type: ColumnTypeEnum.String
      },
      amount: {
        type: ColumnTypeEnum.Number
      },
      budget: {
        type: ModelEnum.Budget
      },
      productSection: {
        type: ModelEnum.ProductSection
      }
    },
    views: [
      {
        type: ViewEnum.Listing,
        columns: {
          amount:true,
          budget:true,
          productSection:true
        }
      },
      {
        type: ViewEnum.Create,
        fields: {}
      },
      {
        type: ViewEnum.Update,
        fields: {}
      },
      {
        type: ViewEnum.Detail,
        columns: {}
      }
    ]
  }
;
export default mapping;