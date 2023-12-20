import {UserModel} from '../User';
import {AbstractModel} from '../../../_custom/types/types';


type Model = {
  name: string
  abbreviation: string
  users: Array<UserModel>
} & AbstractModel

export default Model;