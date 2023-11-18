import {AbstractModel} from '../../../_custom/types/types';
import {ProductModel} from '../Product';


type Model = {
  name: string
  products: Array<ProductModel>
} & AbstractModel

export default Model;