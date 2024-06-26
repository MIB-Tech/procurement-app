import { PurchaseNeedAttachmentModel } from "./index";
import { AbstractModel } from "../../../_core/types/types";

export type AbstractFileModel = {
  readonly contentUrl?: string;
  readonly fileName?: string;
  readonly size?: number;
  readonly originalName?: string;
  readonly mimeType?: string;
} & AbstractModel;

type Model = {
  purchaseNeed: PurchaseNeedAttachmentModel;
} & AbstractFileModel;

export default Model;
