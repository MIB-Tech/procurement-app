import { ItemOperationCallback, ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import moment from 'moment/moment';
import { WorkOrderTimeline } from './components/WorkOrderTimeline';
import { CREATED_AT_COLUMN } from '../columns';
import Logs from './components/Logs';
import { RouteKeyEnum } from '../Route/Model';
import { RoleKeyEnum } from '../Role/Model';
import { STATUS_OPTIONS, STATUS_TRANSITIONS } from './components/WorkOrderStatus';
import { CompanyCalledAtField } from './fields/CompanyCalledAtField';
import { MarkAsCompletedField } from './fields/MarkAsCompletedField';
import Model, { NatureEnum, WorkOrderStatusEnum } from './Model';
import { string } from 'yup';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { datetime } from '../../../_custom/yup';


export const itemOperationRoutes: ItemOperationCallback<ModelEnum.WorkOrder> = ({
  item,
  routes
}) => routes.filter(({ routeKey }) => {
    const { status } = item;
    switch (routeKey) {
      case RouteKeyEnum.WorkOrderDelete:
        return status === WorkOrderStatusEnum.Open;
      case RouteKeyEnum.WorkOrderAddIntervention:
        return status === WorkOrderStatusEnum.InProgress;
      case RouteKeyEnum.WorkOrderUpdate:
        return status !== WorkOrderStatusEnum.Closed;
      default:
        return true;
    }
  }
);

const mapping: ModelMapping<ModelEnum.WorkOrder> = {
  modelName: ModelEnum.WorkOrder,
  icon: '/technology/teh005.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    progressStartedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true
    },
    createdAt: CREATED_AT_COLUMN,
    asset: {
      type: ModelEnum.Asset,
      autoSelect: true,
      itemSubTitle: ({item}) => {
        // @ts-ignore
        return item.asset?.assetModel.assetModelType.name
      }
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      title: 'WORK_ORDER_START_TIME'
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true,
      schema: datetime().when('nature', {
        is: (nature: NatureEnum | undefined) => nature && [NatureEnum.Preventive, NatureEnum.Update].includes(nature),
        then: schema => schema.test(
          'validation.date.min',
          function(endAt) {
            const { startAt } = this.parent as Model;
            if (moment(endAt).isBefore(startAt)) {
              const min = moment(startAt).format('L LT');

              return this.createError({ message: { id: 'VALIDATION.DATE.MIN', params: { min } } });
            }

            return true;
          }
        ).required(),
        otherwise: schema => string().nullable().notRequired()
      })
    },
    isBadManipulation: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    nature: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      nullable: true,
      inline: true,
      options: [
        { id: NatureEnum.Breakdown, color: 'warning' },
        { id: NatureEnum.BlockingBreakdown, color: 'danger' },
        { id: NatureEnum.Update, color: 'primary' },
        { id: NatureEnum.Preventive, color: 'success' }
      ]
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: STATUS_OPTIONS,
      transitions: STATUS_TRANSITIONS
    },
    companyCalledAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true
    },
    interventions: {
      type: ModelEnum.Intervention,
      multiple: true
    },
    attachments: {
      type: ModelEnum.WorkOrderAttachment,
      multiple: true
    },
    images: {
      type: ModelEnum.WorkOrderImage,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.WorkOrderListing,
      itemOperationRoutes,
      filterColumns: {
        id: true,
        name: true,
        description: true,
        nature: true,
        status: true,
        startAt: true,
        isBadManipulation: true,
        createdAt: true,
        asset: true,
        'asset.service.location': {
          display: ({user}) => !user.location
        }
      },
      sortColumns: {
        id: true,
        name: true,
        startAt: true,
        createdAt: true
      },
      columns: {
        asset: true,
        startAt: true,
        nature: true,
        status: true,
        createdAt: true,
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.WorkOrderDetail,
      itemOperationRoutes,
      columns: {
        timeline: {
          as: 'TAB',
          render: ({ item }) => {
            return (
              <>
                <WorkOrderTimeline id={item.id} />
              </>
            );
          }
        },
        id: true,
        name: true,
        createdAt: true,
        asset: true,
        startAt: true,
        endAt: true,
        isBadManipulation: {
          display: ({ item }) => item.nature !== NatureEnum.Preventive
        },
        description: true,
        companyCalledAt: true,
        nature: true,
        status: true,
        interventions: true,
        attachments: true,
        images: true,
        logs: {
          as: 'TAB',
          grantedRoles: Object.values(RoleKeyEnum).filter(roleKey => roleKey !== RoleKeyEnum.BiomedicalTechnician),
          render: Logs
        }
      }
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.WorkOrderDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.WorkOrderCreate,
      fields: {
        name: true,
        asset: true,
        startAt: {
          defaultValue: moment().format()
        },
        endAt: {
          display: ({ item: { nature } }) => nature && [NatureEnum.Preventive, NatureEnum.Update].includes(nature)
        },
        isBadManipulation: {
          display: ({ item: { nature } }) => nature !== NatureEnum.Preventive,
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Responsible, RoleKeyEnum.BiomedicalTechnician],
        },
        description: true,
        nature: {
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.BiomedicalTechnician, RoleKeyEnum.Responsible]
        },
        attachments: true,
        images: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.WorkOrderUpdate,
      fields: {
        nature: {
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.BiomedicalTechnician, RoleKeyEnum.Responsible]
        },
        isBadManipulation: {
          display: ({ item: { nature } }) => nature !== NatureEnum.Preventive,
          grantedRoles: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Responsible, RoleKeyEnum.BiomedicalTechnician],
        },
        status: true,
        attachments: true,
        images: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      fields: {
        companyCalledAt: {
          render: () => <CompanyCalledAtField />
        },
        status: {
          render: () => <MarkAsCompletedField />
        }
      }
    }
  ]
};

export default mapping;
