import { ServiceModel } from '../Service';
import { UserModel } from '../User';
import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  name: string
  abbreviation: string
  services: Array<ServiceModel>
  users: Array<UserModel>
} & AbstractModel

export default Model;