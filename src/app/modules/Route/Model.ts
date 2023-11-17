import { AbstractModel } from '../../../_custom/types/types';


export enum RouteKeyEnum {
  EventListing = 'Event.LISTING',
  EventCreate = 'Event.CREATE',
  EventDetail = 'Event.DETAIL',
  EventUpdate = 'Event.UPDATE',
  EventDelete = 'Event.DELETE',
  WorkOrderListing = 'WorkOrder.LISTING',
  WorkOrderCreate = 'WorkOrder.CREATE',
  WorkOrderDetail = 'WorkOrder.DETAIL',
  WorkOrderUpdate = 'WorkOrder.UPDATE',
  WorkOrderAddIntervention = 'WorkOrder.ADD_INTERVENTION',
  WorkOrderDelete = 'WorkOrder.DELETE',
  InterventionDetail = 'Intervention.DETAIL',
  AssetListing = 'Asset.LISTING',
  AssetCreate = 'Asset.CREATE',
  AssetImport = 'Asset.IMPORT',
  AssetDetail = 'Asset.DETAIL',
  AssetUpdate = 'Asset.UPDATE',
  AssetDelete = 'Asset.DELETE',
  AssetModelListing = 'AssetModel.LISTING',
  AssetModelCreate = 'AssetModel.CREATE',
  AssetModelDetail = 'AssetModel.DETAIL',
  AssetModelUpdate = 'AssetModel.UPDATE',
  AssetModelDelete = 'AssetModel.DELETE',
  AssetTypeListing = 'AssetType.LISTING',
  AssetTypeCreate = 'AssetType.CREATE',
  AssetTypeDetail = 'AssetType.DETAIL',
  AssetTypeUpdate = 'AssetType.UPDATE',
  AssetTypeDelete = 'AssetType.DELETE',
  CategoryListing = 'Category.LISTING',
  CategoryCreate = 'Category.CREATE',
  CategoryDetail = 'Category.DETAIL',
  CategoryUpdate = 'Category.UPDATE',
  CategoryDelete = 'Category.DELETE',
  ContractListing = 'Contract.LISTING',
  ContractCreate = 'Contract.CREATE',
  ContractDetail = 'Contract.DETAIL',
  ContractUpdate = 'Contract.UPDATE',
  ContractDelete = 'Contract.DELETE',
  LocationListing = 'Location.LISTING',
  LocationCreate = 'Location.CREATE',
  LocationDetail = 'Location.DETAIL',
  LocationUpdate = 'Location.UPDATE',
  LocationDelete = 'Location.DELETE',
  ServiceListing = 'Service.LISTING',
  ServiceCreate = 'Service.CREATE',
  ServiceDetail = 'Service.DETAIL',
  ServiceUpdate = 'Service.UPDATE',
  ServiceDelete = 'Service.DELETE',
  ServiceTypeListing = 'ServiceType.LISTING',
  ServiceTypeCreate = 'ServiceType.CREATE',
  ServiceTypeDetail = 'ServiceType.DETAIL',
  ServiceTypeUpdate = 'ServiceType.UPDATE',
  ServiceTypeDelete = 'ServiceType.DELETE',
  ManufacturerListing = 'Manufacturer.LISTING',
  ManufacturerCreate = 'Manufacturer.CREATE',
  ManufacturerDetail = 'Manufacturer.DETAIL',
  ManufacturerUpdate = 'Manufacturer.UPDATE',
  ManufacturerDelete = 'Manufacturer.DELETE',
  VendorListing = 'Vendor.LISTING',
  VendorCreate = 'Vendor.CREATE',
  VendorDetail = 'Vendor.DETAIL',
  VendorUpdate = 'Vendor.UPDATE',
  VendorDelete = 'Vendor.DELETE',
  TeamListing = 'Team.LISTING',
  TeamCreate = 'Team.CREATE',
  TeamDetail = 'Team.DETAIL',
  TeamUpdate = 'Team.UPDATE',
  TeamDelete = 'Team.DELETE',
  RouteListing = 'Route.LISTING',
  RouteCreate = 'Route.CREATE',
  RouteDetail = 'Route.DETAIL',
  RouteUpdate = 'Route.UPDATE',
  RouteDelete = 'Route.DELETE',
  RoleListing = 'Role.LISTING',
  RoleCreate = 'Role.CREATE',
  RoleDetail = 'Role.DETAIL',
  RoleUpdate = 'Role.UPDATE',
  RoleDelete = 'Role.DELETE',
  UserListing = 'User.LISTING',
  UserCreate = 'User.CREATE',
  UserDetail = 'User.DETAIL',
  UserUpdate = 'User.UPDATE',
  UserDelete = 'User.DELETE',
  AccountOverview = 'ACCOUNT.OVERVIEW',
  AccountUpdate = 'ACCOUNT.UPDATE',
  AccountUpdatePassword = 'ACCOUNT.UPDATE_PASSWORD',
}

type Model = {
  routeKey: RouteKeyEnum
  title: string
  contextualTitle?: string
  icon?: string
  sortIndex: number
  treePath: string
  treeLevel: number
  treePathSource: string
  parent?: Model
} & AbstractModel

export default Model;