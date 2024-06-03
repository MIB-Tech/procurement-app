import { UserModel } from "../User";
import { AbstractModel } from "../../../_custom/types/types";
import { OperationModel } from "../Operation";

export enum RoleKeyEnum {
  SuperAdmin = "ROLE_SUPER_ADMIN",
  Admin = "ROLE_ADMIN",
  Buyer = "ROLE_BUYER",
  RegistryOffice = "ROLE_BR",
  Viewer = "ROLE_VIEWER",
  Referent = "ROLE_REFERENT",
  Treso = "ROLE_TRESO",
  Finances = "ROLE_FINANCES",
}

type Model = {
  roleKey: RoleKeyEnum;
  name: string;
  operations: Array<OperationModel>;
  users: Array<UserModel>;
} & AbstractModel;

export default Model;
