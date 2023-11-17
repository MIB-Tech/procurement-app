import { AbstractModel } from '../../../_custom/types/types';


export enum RouteKeyEnum {
  ApplicantServiceListing = 'ApplicantService.LISTING',
  ApplicantServiceCreate = 'ApplicantService.CREATE',
  ApplicantServiceDetail = 'ApplicantService.DETAIL',
  ApplicantServiceUpdate = 'ApplicantService.UPDATE',
  ApplicantServiceDelete = 'ApplicantService.DELETE',
  DraftOrderListing = 'DraftOrder.LISTING',
  DraftOrderCreate = 'DraftOrder.CREATE',
  DraftOrderDetail = 'DraftOrder.DETAIL',
  DraftOrderUpdate = 'DraftOrder.UPDATE',
  DraftOrderDelete = 'DraftOrder.DELETE',
  ProjectListing = 'Project.LISTING',
  ProjectCreate = 'Project.CREATE',
  ProjectDetail = 'Project.DETAIL',
  ProjectUpdate = 'Project.UPDATE',
  ProjectDelete = 'Project.DELETE',
  ProductListing = 'Product.LISTING',
  ProductCreate = 'Product.CREATE',
  ProductDetail = 'Product.DETAIL',
  ProductUpdate = 'Product.UPDATE',
  ProductDelete = 'Product.DELETE',
  CategoryListing = 'Category.LISTING',
  CategoryCreate = 'Category.CREATE',
  CategoryDetail = 'Category.DETAIL',
  CategoryUpdate = 'Category.UPDATE',
  CategoryDelete = 'Category.DELETE',
  CompanyListing = 'Company.LISTING',
  CompanyCreate = 'Company.CREATE',
  CompanyDetail = 'Company.DETAIL',
  CompanyUpdate = 'Company.UPDATE',
  CompanyDelete = 'Company.DELETE',
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
  DraftOrderLineListing = 'DraftOrderLine.LISTING',
  DraftOrderLineCreate = 'DraftOrderLine.CREATE',
  DraftOrderLineDetail = 'DraftOrderLine.DETAIL',
  DraftOrderLineUpdate = 'DraftOrderLine.UPDATE',
  DraftOrderLineDelete = 'DraftOrderLine.DELETE',
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