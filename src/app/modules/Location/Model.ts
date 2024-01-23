import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';


type Model = {
  name: string
  abbreviation: string
  users: Array<UserModel>
  parent?: Model
  children: Array<Model>
  address?:string
  ice:string
  if:string
  cnss:string
} & AbstractModel

export default Model;