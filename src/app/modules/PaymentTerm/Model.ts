import { AbstractModel } from "../../../_custom/types/types";
import { InvoiceModel } from "../Invoice";

type Model = {
  date: string;
  amount: number;
  invoice: InvoiceModel;
} & AbstractModel;

export default Model;
