import {ModelMapping, MutationMode, ViewEnum} from '../../../_custom/types/ModelMapping';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {CREATED_AT_COLUMN} from '../columns';
import {RouteKeyEnum} from '../Route/Model';
import {DraftOrderStatusEnum, PriorityEnum} from './Model';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.DraftOrder> = {
  modelName: ModelEnum.DraftOrder,
  icon: '/technology/teh005.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    orderNumber: {
      type: ColumnTypeEnum.String
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    orderedFor: {
      type: ColumnTypeEnum.String
    },
    buyerFullName: {
      type: ColumnTypeEnum.String
    },
    recommendedVendors: {
      type: ColumnTypeEnum.Array
    },
    createdAt: CREATED_AT_COLUMN,
    isRegularized: {
      type: ColumnTypeEnum.Boolean
    },
    priority: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        {id: PriorityEnum.Normal, color: 'light'},
        {id: PriorityEnum.Urgent, color: 'danger'},
      ]
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        {id: DraftOrderStatusEnum.Open, color: 'primary'},
        {id: DraftOrderStatusEnum.Confirmed, color: 'info'},
        {id: DraftOrderStatusEnum.PurchaseConfirmed, color: 'success'},
        {id: DraftOrderStatusEnum.Cancelled, color: 'warning'}
      ]
    },
    createdBy: {
      type: ModelEnum.User,
    },
    project: {
      type: ModelEnum.Project,
    },
    company: {
      type: ModelEnum.Company,
    },
    receptionManager: {
      type: ModelEnum.User,
    },
    category: {
      type: ModelEnum.Category,
    },
    applicantService: {
      type: ModelEnum.ApplicantService,
    },
    orderLines: {
      type: ModelEnum.DraftOrderLine,
      multiple: true
    },
    attachments: {
      type: ModelEnum.DraftOrderAttachment,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.DraftOrderListing,
      columns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      },
      filterColumns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.DraftOrderDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.DraftOrderDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.DraftOrderCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.DraftOrderUpdate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put
    }
  ]
};

export default mapping;
