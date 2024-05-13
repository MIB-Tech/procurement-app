import { AbstractModel } from "../../../_custom/types/types";
import { ClinicModel } from "../Clinic";

type Model = {
  name: string;
  clinics: Array<ClinicModel>;
} & AbstractModel;

export default Model;
