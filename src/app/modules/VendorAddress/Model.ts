import { AbstractModel } from "../../../_core/types/types";
import { VendorModel } from "../Vendor";

type Model = {
  postalCode?: string;
  address: string;
  cityName: string;
  isMain: boolean;
  vendor: VendorModel;
} & AbstractModel;

export default Model;
