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
import {PurchaseNeedAttachmentModel} from './PurchaseNeedAttachment';
import {VendorAddressModel} from './VendorAddress';
import {VendorModel} from './Vendor';
import {CurrencyModel} from './Currency';
import {PurchaseFileTypeModel} from './PurchaseFileType';
import {PurchaseFileModel} from './PurchaseFile';
import {VendorOfferModel} from './VendorOffer';
import {VendorOfferProductModel} from './VendorOfferProduct';
import {PurchaseFileProductModel} from './PurchaseFileProduct';
import {ProductPricingModel} from './ProductPricing';
import {PurchaseOrderProductModel} from './PurchaseOrderProduct';
import {PurchaseOrderModel} from './PurchaseOrder';
import {DesiredProductModel} from './DesiredProduct';
import {ReceiptModel} from './Receipt';
import {ReceiptProductModel} from './ReceiptProduct';
import {PurchaseOrderCategoryModel} from './PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from './PurchaseOrderAttachment';
import {ComponentModel} from "./Component";
import {PaymentModalityModel} from "./PaymentModality";


export enum ModelEnum {
  ApplicantService = 'ApplicantService',
  Category = 'Category',
  Company = 'Company',
  Currency = 'Currency',
  DesiredProduct = 'DesiredProduct',
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
  PurchaseOrderCategory = 'PurchaseOrderCategory',
  purchaseOrderAttachment = 'PurchaseOrderAttachment',
  Receipt = 'Receipt',
  ReceiptProduct = 'ReceiptProduct',
  Resource = 'Resource',
  Role = 'Role',
  Step = 'Step',
  User = 'User',
  ValidationPath = 'ValidationPath',
  Vendor = 'Vendor',
  VendorAddress = 'VendorAddress',
  VendorOffer = 'VendorOffer',
  VendorOfferProduct = 'VendorOfferProduct',
  ProductPricing = 'ProductPricing',
  Component = 'Component',
  PaymentModality = 'PaymentModality'
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
  [ModelEnum.DesiredProduct]: DesiredProductModel,
  [ModelEnum.PurchaseFile]: PurchaseFileModel,
  [ModelEnum.PurchaseFileProduct]: PurchaseFileProductModel,
  [ModelEnum.PurchaseFileType]: PurchaseFileTypeModel,
  [ModelEnum.PurchaseOrder]: PurchaseOrderModel,
  [ModelEnum.PurchaseOrderProduct]: PurchaseOrderProductModel,
  [ModelEnum.PurchaseOrderCategory]: PurchaseOrderCategoryModel,
  [ModelEnum.Receipt]: ReceiptModel,
  [ModelEnum.ReceiptProduct]: ReceiptProductModel,
  [ModelEnum.Vendor]: VendorModel,
  [ModelEnum.VendorAddress]: VendorAddressModel,
  [ModelEnum.VendorOffer]: VendorOfferModel,
  [ModelEnum.VendorOfferProduct]: VendorOfferProductModel,
  [ModelEnum.ProductPricing]: ProductPricingModel
  [ModelEnum.purchaseOrderAttachment]: PurchaseOrderAttachmentModel
  [ModelEnum.PaymentModality]: PaymentModalityModel
  [ModelEnum.Component]: ComponentModel
}