import {AbstractModel} from '../../../_custom/types/types';
import {ClinicModel} from "../Clinic";
import {ProductSectionBudgetModel} from "../ProductSectionBudget";
import {BudgetExerciseModel} from "../BudgetExercise";


type Model = {
  description: string
  clinic: ClinicModel
  productSectionBudgets: Array<ProductSectionBudgetModel>
  budgetExercise: BudgetExerciseModel


} & AbstractModel

export default Model;