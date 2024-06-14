import { AbstractModel } from "../../../_core/types/types";
import { BlocModel } from "../Bloc";
import { ClinicModel } from "../Clinic";

type Model = {
  name: string;
  blocs: Array<BlocModel>;
  clinic: ClinicModel;
} & AbstractModel;

export default Model;
