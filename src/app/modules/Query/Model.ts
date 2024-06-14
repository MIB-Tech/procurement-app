import { AbstractModel } from "../../../_core/types/types";
import { BlocModel } from "../Bloc";

type Model = {
  name: string;
  queryString: string;
  params: Array<BlocModel>;
} & AbstractModel;

export default Model;
