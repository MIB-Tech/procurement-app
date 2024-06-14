import { AbstractModel } from "../../../_core/types/types";
import { ServiceModel } from "../Service";

type Model = {
  name: string;
  floor: number;
  service: ServiceModel;
} & AbstractModel;

export default Model;
