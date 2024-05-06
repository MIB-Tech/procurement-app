import {AbstractModel} from '../../../_custom/types/types';
import {BudgetModel} from "../Budget";
import {ProductSectionModel} from "../ProductSection";


type Model = {
  amount: number
  budget?: BudgetModel
  productSection: ProductSectionModel
} & AbstractModel

export default Model;