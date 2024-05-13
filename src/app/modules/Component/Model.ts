import { AbstractModel } from "../../../_custom/types/types";
import { ProductModel } from "../Product";

type Model = {
  quantity: number;
  product: ProductModel;
  parentProduct: ProductModel;
} & AbstractModel;

export default Model;
