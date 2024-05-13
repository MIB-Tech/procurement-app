import { AbstractModel } from "../../../_custom/types/types";
import { VendorModel } from "../Vendor";

type Model = {
  postalCode?: string;
  address: string;
  cityName: string;
  isMain: boolean;
  vendor: VendorModel;
} & AbstractModel;

export default Model;
