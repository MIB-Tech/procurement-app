import { AbstractModel } from '../../../_custom/types/types';


type Model = {
  designation: string
  articleCode?: string
  quantity: number
  // intervention?: InterventionModel
} & AbstractModel

export default Model;