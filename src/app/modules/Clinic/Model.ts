import { UserModel } from "../User";
import { AbstractModel } from "../../../_custom/types/types";
import { ServiceModel } from "../Service";
import { CityModel } from "../City";
import { PurchaseNeedModel } from "../PurchaseNeed";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { ClinicStatusEnum } from "../PurchaseOrder/Model";
import { DeliveryDepotModel } from "../DeliveryDepot";
import { BudgetModel } from "../Budget";

type Model = {
  abbreviation: string;
  name: string;
  address: string;
  ice: string;
  taxId: string;
  cnss?: string;
  constructionAmount: number;
  status: ClinicStatusEnum;
  constructionStartAt: string;
  constructionEndAt: string;
  purchaseOrderAllowed: boolean;
  users: Array<UserModel>;
  services: Array<ServiceModel>;
  city: CityModel;
  purchaseNeeds: Array<PurchaseNeedModel>;
  purchaseOrders: Array<PurchaseOrderModel>;
  deliveryDepots: Array<DeliveryDepotModel>;
  budgets: Array<BudgetModel>;
} & AbstractModel;

export default Model;
