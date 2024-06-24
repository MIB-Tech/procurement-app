import { AbstractModel } from "../../../_core/types/types";
import { PurchaseFileTypeModel } from "../PurchaseFileType";
import { PurchaseFileProductModel } from "../PurchaseFileProduct";
import { UserModel } from "../User";

type Model = {
  consultedAt: string;
  purchaseFileNumber: string;
  purchaseFileType: PurchaseFileTypeModel;
  description: string;
  validationPath: string;
  createdAt: string;
  purchaseFilesProducts: Array<PurchaseFileProductModel>;
  user: UserModel;
} & AbstractModel;

export default Model;
