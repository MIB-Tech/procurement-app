import { AbstractModel } from "../../../_custom/types/types";
import { ProductModel } from "../Product";
import { UserModel } from "../User";

type Model = {
  name: string;
  products: Array<ProductModel>;
  parent: Array<Model>;
  users: Array<UserModel>;
} & AbstractModel;

export default Model;
