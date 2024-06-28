import { AbstractModel } from "../../../_core/types/types";
import { ReceiptModel } from "../Receipt";
import { ReceiptProductComponentModel } from "../ReceiptProductComponent";
import { StringSelectOption } from "../../../_core/Column/String/StringColumn";
import { UserModel } from "../User";
import { PurchaseOrderProductModel } from "../PurchaseOrderProduct";
import { DeliveryDepotModel } from "../DeliveryDepot";
import { InvoiceProductModel } from "../InvoiceProduct";
import { QuantityStatusEnum } from "../PurchaseOrder/Model";

export enum ComplianceStatus {
  None = "NONE",
  Conform = "CONFORM",
  ConformWithReserve = "CONFORM_WITH_RESERVE",
}

export const COMPLIANCE_STATUS_OPTIONS: Array<StringSelectOption> = [
  { id: ComplianceStatus.None, color: "warning" },
  { id: ComplianceStatus.Conform, color: "primary" },
  { id: ComplianceStatus.ConformWithReserve, color: "success" },
];

type Model = {
  designation: string;
  quantity: number;
  note: string;
  complianceStatus?: ComplianceStatus;
  complianceUpdatedAt?: string;
  complianceUpdatedBy?: UserModel;
  complianceReserve?: string;
  purchaseOrderProduct: PurchaseOrderProductModel;
  receipt?: ReceiptModel;
  deliveryDepot?: DeliveryDepotModel;
  components: Array<ReceiptProductComponentModel>;
  invoiceProducts: Array<InvoiceProductModel>;
  readonly received: boolean;
  readonly invoiceProductStatus?: QuantityStatusEnum;
  readonly initialQuantity?: number;
} & AbstractModel;

export default Model;
