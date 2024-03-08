import {AbstractModel} from '../../../_custom/types/types';
import {ClinicModel} from "../Clinic";


type Model = {
  address: string
  clinic:ClinicModel
} & AbstractModel

export default Model;