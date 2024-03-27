import {AbstractModel} from '../../../_custom/types/types'
import {BlocModel} from '../Bloc'


type Model = {
  name: string
  queryString: string
  params: Array<BlocModel>
} & AbstractModel


export default Model