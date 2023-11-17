import { VendorModel } from '../Vendor';
import { ContractModel } from '../Contract';
import { ServiceModel } from '../Service';
import { AssetModelModel } from '../AssetModel';
import { WorkOrderModel } from '../WorkOrder';
import { AbstractModel } from '../../../_custom/types/types';
import { AssetModelImageModel } from '../AssetModelImage';
import { EventModel } from '../Event';


type Model = {
  inventoryNumber: string
  underContract?: boolean
  serialNumber?: string
  purchasePriceExclTax?: number
  installedAt?: string
  guaranteeExpiryAt?: string
  vendor: VendorModel
  contract?: ContractModel
  service: ServiceModel
  assetModel: AssetModelModel
  workOrders: Array<WorkOrderModel>
  events: Array<EventModel>
  readonly modelImage?: AssetModelImageModel
  readonly invalidInventoryNumber: boolean
} & AbstractModel

export default Model;