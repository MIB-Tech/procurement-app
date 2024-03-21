import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Budget> = {
    modelName: ModelEnum.Budget,
    columnDef: {
      id: {
        type: ColumnTypeEnum.Number
      },
      uid: {
        type: ColumnTypeEnum.String
      },
      description: {
        type: ColumnTypeEnum.String
      },
      clinic: {
        type: ModelEnum.Clinic
      },
      budgetExercise: {
        type: ModelEnum.BudgetExercise
      },
      productSectionBudgets: {
        type: ModelEnum.ProductSectionBudget
      }
    },
    views: [
      {
        type: ViewEnum.Listing,
        columns: {}
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