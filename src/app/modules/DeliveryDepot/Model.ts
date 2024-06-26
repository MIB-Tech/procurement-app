import { AbstractModel } from "../../../_core/types/types";
import { ClinicModel } from "../Clinic";
import { ReceiptProductModel } from "../ReceiptProduct";

type Model = {
  address: string;
  clinic: ClinicModel;
  receiptProducts: Array<ReceiptProductModel>;
} & AbstractModel;

export default Model;
