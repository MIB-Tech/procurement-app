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
        type: ColumnTypeEnum.Number,
        title: 'AMOUNT_PRODUCT_SECTION'
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
          amount: true,
          budget: true,
          productSection: true
        }
      },
      {
        type: ViewEnum.Create,
        fields: {
          amount: true,
          productSection: true,
        }
      },
      {
        type: ViewEnum.Update,
        fields: {
          amount: true,
          productSection: true
        }
      },
      {
        type: ViewEnum.Detail,
        columns: {
          amount: true,
          productSection: true,
          budget: true
        }
      }
    ]
  }
;
export default mapping;