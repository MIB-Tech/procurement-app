import { AbstractModel } from "../../../_core/types/types";
import { StepModel } from "../Step";

type Model = {
  name: string;
  steps: Array<StepModel>;
} & AbstractModel;

export default Model;
