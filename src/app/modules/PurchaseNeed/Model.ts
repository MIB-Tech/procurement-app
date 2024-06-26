import { AbstractModel, CreateTimestamp } from "../../../_core/types/types";
import { UserModel } from "../User";
import { PurchaseNeedAttachmentModel } from "../PurchaseNeedAttachment";
import { CategoryModel } from "../Category";
import { CompanyModel } from "../Company";
import { ApplicantServiceModel } from "../ApplicantService";
import { PurchaseNeedModel } from "./index";
import { ClinicModel } from "../Clinic";

export enum PurchaseNeedStatusEnum {
  Open = "OPEN",
  Confirmed = "CONFIRMED",
  PurchaseConfirmed = "PURCHASE_CONFIRMED",
  Cancelled = "CANCELLED",
}

export enum PriorityEnum {
  Normal = "NORMAL",
  Urgent = "URGENT",
}

type Model = {
  orderNumber: string;
  description?: string;
  desiredDeliveryDate?: string;
  status: PurchaseNeedStatusEnum;
  priority: PriorityEnum;
  isRegularized?: boolean;
  createdBy: UserModel;
  orderedFor?: string;
  buyerFullName?: string;
  company: CompanyModel;
  receptionManager: UserModel;
  applicantService: ApplicantServiceModel;
  lines: Array<PurchaseNeedModel>;
  attachments?: Array<PurchaseNeedAttachmentModel>;
  clinic: ClinicModel;
  readonly category: CategoryModel;
  // readonly validationPath: string
} & CreateTimestamp &
  AbstractModel;

export default Model;
