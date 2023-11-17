import {DraftOrderModel} from './DraftOrder';
import {DraftOrderAttachmentModel} from './DraftOrderAttachment';
import {UserModel} from './User';
import {RoleModel} from './Role';
import {RouteModel} from './Route';
import {CategoryModel} from './Category';
import {ApplicantServiceModel} from './ApplicantService';
import {DraftOrderLineModel} from './DreaftOrderLine';
import {ProductModel} from './Product';
import {ProjectModel} from './Project';
import {CompanyModel} from './Company';


export enum ModelEnum {
  User = 'User',
  Role = 'Role',
  Route = 'Route',
  DraftOrder = 'DraftOrder',
  DraftOrderAttachment = 'DraftOrderAttachment',
  ApplicantService = 'ApplicantService',
  Category = 'Category',
  Company = 'Company',
  DraftOrderLine = 'DraftOrderLine',
  Product = 'Product',
  Project = 'Project',
}

export type Models = {
  [ModelEnum.DraftOrder]: DraftOrderModel,
  [ModelEnum.DraftOrderAttachment]: DraftOrderAttachmentModel,
  [ModelEnum.User]: UserModel,
  [ModelEnum.Role]: RoleModel,
  [ModelEnum.Route]: RouteModel,
  [ModelEnum.ApplicantService]: ApplicantServiceModel,
  [ModelEnum.Category]: CategoryModel,
  [ModelEnum.Company]: CompanyModel,
  [ModelEnum.DraftOrderLine]: DraftOrderLineModel,
  [ModelEnum.Product]: ProductModel,
  [ModelEnum.Project]: ProjectModel,
}