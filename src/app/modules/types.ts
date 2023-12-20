import {PurchaseNeedModel} from './PurchaseNeed';
import {UserModel} from './User';
import {RoleModel} from './Role';
import {CategoryModel} from './Category';
import {ApplicantServiceModel} from './ApplicantService';
import {PurchaseNeedProductModel} from './PurchaseNeedProduct';
import {ProductModel} from './Product';
import {ProjectModel} from './Project';
import {CompanyModel} from './Company';
import {StepModel} from './Step';
import {ValidationPathModel} from './ValidationPath';
import {OperationModel} from './Operation';
import {LocationModel} from './Location';
import {ResourceModel} from './Resource';
import {AbstractModel} from '../../_custom/types/types';
import {PurchaseNeedAttachmentModel} from './PurchaseNeedAttachment';
import {VendorContactModel} from './VendorContact';
import {VendorModel} from './Vendor';
import {CurrencyModel} from './Currency';


export enum ModelEnum {
  ApplicantService = 'ApplicantService',
  Category = 'Category',
  Company = 'Company',
  Currency = 'Currency',
  DesiredProduct = 'DesiredProduct',
  Discount = 'Discount',
  Location = 'Location',
  Operation = 'Operation',
  Product = 'Product',
  Project = 'Project',
  PurchaseFile = 'PurchaseFile',
  PurchaseFileProduct = 'PurchaseFileProduct',
  PurchaseFileType = 'PurchaseFileType',
  PurchaseNeed = 'PurchaseNeed',
  PurchaseNeedAttachment = 'PurchaseNeedAttachment',
  PurchaseNeedProduct = 'PurchaseNeedProduct',
  PurchaseOrder = 'PurchaseOrder',
  PurchaseOrderProduct = 'PurchaseOrderProduct',
  Receipt = 'Receipt',
  ReceiptProduct = 'ReceiptProduct',
  Resource = 'Resource',
  Role = 'Role',
  Step = 'Step',
  User = 'User',
  ValidationPath = 'ValidationPath',
  Vendor = 'Vendor',
  VendorContact = 'VendorContact',
  VendorOffer = 'VendorOffer',
  VendorOfferProduct = 'VendorOfferProduct',
  ProductPricing = 'ProductPricing',
}

export type Models = {
  [ModelEnum.PurchaseNeed]: PurchaseNeedModel,
  [ModelEnum.PurchaseNeedAttachment]: PurchaseNeedAttachmentModel,
  [ModelEnum.User]: UserModel,
  [ModelEnum.Role]: RoleModel,
  [ModelEnum.ApplicantService]: ApplicantServiceModel,
  [ModelEnum.Category]: CategoryModel,
  [ModelEnum.Company]: CompanyModel,
  [ModelEnum.PurchaseNeedProduct]: PurchaseNeedProductModel,
  [ModelEnum.Product]: ProductModel,
  [ModelEnum.Project]: ProjectModel,
  [ModelEnum.Step]: StepModel,
  [ModelEnum.ValidationPath]: ValidationPathModel,
  [ModelEnum.Location]: LocationModel,
  [ModelEnum.Operation]: OperationModel,
  [ModelEnum.Resource]: ResourceModel,
  [ModelEnum.Currency]: CurrencyModel,
  [ModelEnum.DesiredProduct]: AbstractModel,
  [ModelEnum.Discount]: AbstractModel,
  [ModelEnum.PurchaseFile]: AbstractModel,
  [ModelEnum.PurchaseFileProduct]: AbstractModel,
  [ModelEnum.PurchaseFileType]: AbstractModel,
  [ModelEnum.PurchaseOrder]: AbstractModel,
  [ModelEnum.PurchaseOrderProduct]: AbstractModel,
  [ModelEnum.Receipt]: AbstractModel,
  [ModelEnum.ReceiptProduct]: AbstractModel,
  [ModelEnum.Vendor]: VendorModel,
  [ModelEnum.VendorContact]: VendorContactModel,
  [ModelEnum.VendorOffer]: AbstractModel,
  [ModelEnum.VendorOfferProduct]: AbstractModel
  [ModelEnum.ProductPricing]: AbstractModel
}