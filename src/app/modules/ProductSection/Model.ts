import {AbstractModel} from '../../../_custom/types/types';
import {ProductModel} from "../Product";
import {ProductSectionBudgetModel} from "../ProductSectionBudget";


type Model = {
  name: string
  code: string
  rupture?: string
  sortIndex: number
  products: Array<ProductModel>
  productSectionsBudgets: Array<ProductSectionBudgetModel>

} & AbstractModel

export default Model;