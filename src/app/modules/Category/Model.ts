import {AbstractModel} from '../../../_custom/types/types';
import {ProductModel} from '../Product';


type Model = {
  name: string
  products: Array<ProductModel>
  parents: Array<Model>
} & AbstractModel

export default Model;