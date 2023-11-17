import { WorkOrderModel } from './WorkOrder';
import { AssetModelImageModel } from './AssetModelImage';
import { ContractAttachmentModel } from './ContractAttachment';
import { InterventionModel } from './Intervention';
import { InterventionAttachmentModel } from './InterventionAttachment';
import { PartModel } from './Part';
import { VendorAttachmentModel } from './VendorAttachment';
import { VendorContactModel } from './VendorContact';
import { VendorImageModel } from './VendorImage';
import { WorkOrderAttachmentModel } from './WorkOrderAttachment';
import { WorkOrderImageModel } from './WorkOrderImage';
import { WorkOrderLogModel } from './WorkOrderLog';
import { AssetModel } from './Asset';
import { AssetModelModel } from './AssetModel';
import { AssetTypeModel } from './AssetType';
import { CategoryModel } from './Category';
import { ContractModel } from './Contract';
import { ManufacturerModel } from './Manufacturer';
import { ServiceModel } from './Service';
import { VendorModel } from './Vendor';
import { UserModel } from './User';
import { RoleModel } from './Role';
import { LocationModel } from './Location';
import { TeamModel } from './Team';
import { RouteModel } from './Route';
import { ServiceTypeModel } from './ServiceType';
import { EventModel } from './Event';


export enum ModelEnum {
  Event = 'Event',
  User = 'User',
  Role = 'Role',
  Location = 'Location',
  Team = 'Team',
  Route = 'Route',
  Asset = 'Asset',
  AssetModel = 'AssetModel',
  AssetModelAttachment = 'AssetModelAttachment',
  AssetModelImage = 'AssetModelImage',
  AssetType = 'AssetType',
  Category = 'Category',
  Contract = 'Contract',
  ContractAttachment = 'ContractAttachment',
  Manufacturer = 'Manufacturer',
  Service = 'Service',
  ServiceType = 'ServiceType',
  Vendor = 'Vendor',
  VendorContact = 'VendorContact',
  VendorAttachment = 'VendorAttachment',
  VendorImage = 'VendorImage',
  WorkOrder = 'WorkOrder',
  WorkOrderAttachment = 'WorkOrderAttachment',
  WorkOrderImage = 'WorkOrderImage',
  WorkOrderLog = 'WorkOrderLog',
  Intervention = 'Intervention',
  InterventionAttachment = 'InterventionAttachment',
  Part = 'Part'
}

export type Models = {
  [ModelEnum.Event]: EventModel,
  [ModelEnum.AssetModelAttachment]: WorkOrderModel,
  [ModelEnum.AssetModelImage]: AssetModelImageModel,
  [ModelEnum.ContractAttachment]: ContractAttachmentModel,
  [ModelEnum.Intervention]: InterventionModel,
  [ModelEnum.InterventionAttachment]: InterventionAttachmentModel,
  [ModelEnum.Part]: PartModel,
  [ModelEnum.VendorAttachment]: VendorAttachmentModel,
  [ModelEnum.VendorContact]: VendorContactModel,
  [ModelEnum.VendorImage]: VendorImageModel,
  [ModelEnum.WorkOrder]: WorkOrderModel,
  [ModelEnum.WorkOrderAttachment]: WorkOrderAttachmentModel,
  [ModelEnum.WorkOrderImage]: WorkOrderImageModel,
  [ModelEnum.WorkOrderLog]: WorkOrderLogModel,
  [ModelEnum.Asset]: AssetModel,
  [ModelEnum.AssetModel]: AssetModelModel,
  [ModelEnum.AssetType]: AssetTypeModel,
  [ModelEnum.Category]: CategoryModel,
  [ModelEnum.Contract]: ContractModel,
  [ModelEnum.Manufacturer]: ManufacturerModel,
  [ModelEnum.Service]: ServiceModel,
  [ModelEnum.ServiceType]: ServiceTypeModel,
  [ModelEnum.Vendor]: VendorModel,
  [ModelEnum.User]: UserModel,
  [ModelEnum.Role]: RoleModel,
  [ModelEnum.Location]: LocationModel,
  [ModelEnum.Team]: TeamModel,
  [ModelEnum.Route]: RouteModel
}