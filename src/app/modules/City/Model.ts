import { AbstractModel } from "../../../_core/types/types";
import { ClinicModel } from "../Clinic";

type Model = {
  name: string;
  clinics: Array<ClinicModel>;
} & AbstractModel;

export default Model;
