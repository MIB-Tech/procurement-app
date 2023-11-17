import { ModelMapping, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import moment from 'moment/moment';
import { InterventionModel } from './index';
import { string } from 'yup';
import { NatureEnum, WorkOrderStatusEnum } from '../WorkOrder/Model';
import { RouteKeyEnum } from '../Route/Model';
import { WorkOrderModel } from '../WorkOrder';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { datetime } from '../../../_custom/yup';


const mapping: ModelMapping<ModelEnum.Intervention> = {
  modelName: ModelEnum.Intervention,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      max: moment().format()
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      max: moment().format(),
      schema: datetime().required().test(
        'validation.date.min',
        function(endAt) {
          const { startAt } = this.parent as InterventionModel;

          if (moment(endAt).isBefore(startAt)) {
            return this.createError({
              message: {
                id: 'VALIDATION.DATE.MIN',
                params: { min: moment(startAt).format('L LT') }
              }
            });
          }

          return true;
        }
      )
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true,
      title: 'WORK_DESCRIPTION',
      schema: string().when('workOrder', {
        is: ({ nature }: WorkOrderModel) => nature === NatureEnum.Preventive,
        then: schema => schema.notRequired(),
        otherwise: schema => schema.required()
      })
    },
    parts: {
      type: ModelEnum.Part,
      multiple: true,
      title: 'CONSUMED_PARTS',
      embeddedForm: true
    },
    attachments: {
      type: ModelEnum.InterventionAttachment,
      multiple: true
    },
    workOrder: {
      type: ModelEnum.WorkOrder,
      nullable: true,
      embeddedForm: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      itemOperationRoutes: ({ routes, authUser }) => {
        const workOrderAddInterventionRoute = authUser.role?.routes.find(route => route.routeKey === RouteKeyEnum.InterventionDetail);
        if (workOrderAddInterventionRoute) {
          return [
            ...routes,
            workOrderAddInterventionRoute
          ];
        }

        return routes;
      },
      columns: {
        startAt: true,
        endAt: true,
        description: true,
        parts: {
          render: ({ item }) => item.parts.length
        },
        attachments: {
          render: ({ item }) => item.attachments.length
        }
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.InterventionDetail
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.WorkOrderAddIntervention,
      submittable: ({ item }) => item.workOrder?.status === WorkOrderStatusEnum.InProgress,
      fields: {
        startAt: true,
        endAt: true,
        description: true,
        attachments: true,
        parts: true,
        workOrder: true
      }
    }
  ]
};


export default mapping;
