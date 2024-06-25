import { InvoiceModel } from "../modules/Invoice";
import { AbstractModel } from "../../_core/types/types";

type Model = {
  invoice: InvoiceModel;
} & AbstractModel;

export default Model;
