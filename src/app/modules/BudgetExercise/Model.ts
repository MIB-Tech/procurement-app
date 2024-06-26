import { AbstractModel } from "../../../_core/types/types";
import { BudgetModel } from "../Budget";

type Model = {
  code: string;
  name: string;
  startAt: string;
  endAt: string;
  budget: Array<BudgetModel>;
} & AbstractModel;

export default Model;
