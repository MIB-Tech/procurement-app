import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';
import {ServiceModel} from "../Service";
import {CityModel} from "../City";


type Model = {
  name: string
  abbreviation: string
  address?: string
  ice: string
  taxId: string
  cnss: string
  users: Array<UserModel>
  services: Array<ServiceModel>
  city: CityModel
} & AbstractModel

export default Model;