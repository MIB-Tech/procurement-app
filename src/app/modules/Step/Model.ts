import {AbstractModel} from '../../../_custom/types/types';
import {UserModel} from '../User';
import {ValidationPathModel} from "../ValidationPath";


type Model = {
  name: string
  strategy: string
  sortIndex: number
  users: Array<UserModel>
  validationPath:ValidationPathModel
} & AbstractModel

export default Model;