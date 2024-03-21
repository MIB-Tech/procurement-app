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
        type: ModelEnum.ProductSectionBudget,
        multiple: true,
        nullable: false
      }
    },
    views: [
      {
        type: ViewEnum.Listing,
        columns: {}
      },
      {
        type: ViewEnum.Create,
        fields: {
          description: true,
          budgetExercise: true
        }
      },
      {
        type: ViewEnum.Update,
        fields: {
          description: true,
          budgetExercise: true
        }
      },
      {
        type: ViewEnum.Detail,
        columns: {}
      }
    ]
  }
;
export default mapping;