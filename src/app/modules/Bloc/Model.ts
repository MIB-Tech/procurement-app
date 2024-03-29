import {AbstractModel} from '../../../_custom/types/types';
import {ServiceModel} from "../Service";


type Model = {
  name: string
  floor: number
  service: ServiceModel
} & AbstractModel


export default Model;