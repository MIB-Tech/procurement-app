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
        type: ModelEnum.BudgetExercise,
      },
      productSectionBudgets: {
        type: ModelEnum.ProductSectionBudget,
        multiple: true,
        nullable: false,
        embeddedForm: true
      }
    },
    views: [
      {
        type: ViewEnum.Listing,
        columns: {
          clinic: true,
          description: true,
          budgetExercise: true,
          productSectionBudgets: true
        }
      },
      {
        type: ViewEnum.Create,
        fields: {
          clinic: true,
          description: true,
          budgetExercise: true,
          productSectionBudgets: true
        }
      },
      {
        type: ViewEnum.Update,
        fields: {
          clinic: true,
          description: true,
          budgetExercise: true,
          productSectionBudgets: true
        }
      },
      {
        type: ViewEnum.Detail,
        columns: {
          clinic: true,
          description: true,
          budgetExercise: true,
          productSectionBudgets: true
        }
      }
    ]
  }
;
export default mapping;