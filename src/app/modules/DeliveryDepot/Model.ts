import {AbstractModel} from '../../../_custom/types/types';
import {ClinicModel} from "../Clinic";
import {DesiredProductModel} from "../DesiredProduct";


type Model = {
  address: string
  clinic: ClinicModel
  desiredProducts: Array<DesiredProductModel>
} & AbstractModel

export default Model;