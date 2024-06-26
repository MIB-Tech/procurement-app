import { AbstractModel } from "../../../_core/types/types";
import { OperationModel } from "../Operation";
import { ModelEnum } from "../types";

type Model = {
  name: ModelEnum;
  icon: string;
  sortIndex: number;
  operations: Array<OperationModel>;
} & AbstractModel;

export default Model;
