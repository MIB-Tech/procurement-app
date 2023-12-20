import {AbstractModel} from '../../../_custom/types/types';
import {UserModel} from '../User';


type Model = {
  name: string
  strategy: string
  sortIndex: number
  users: Array<UserModel>
} & AbstractModel

export default Model;