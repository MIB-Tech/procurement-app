import { RoleModel } from "../Role";
import { AbstractModel, Timestamp } from "../../../_core/types/types";
import { ClinicModel } from "../Clinic";
import { UserModel } from "./index";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { CategoryModel } from "../Category";

type Model = {
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  currentPassword?: string;
  plainPassword: string;
  passwordConfirm: string;
  passwordUpdatedAt?: string;
  restrictedByCategories: boolean;
  role?: RoleModel;
  clinics: Array<ClinicModel>;
  referentPurchaseOrders: Array<PurchaseOrderModel>;
  categories: Array<CategoryModel>;
} & Timestamp &
  AbstractModel;

export default Model;
