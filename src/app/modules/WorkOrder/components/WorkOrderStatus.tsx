import React, { FC, HTMLAttributes } from 'react';
import Model, { NatureEnum, WorkOrderStatusEnum } from '../Model';
import clsx from 'clsx';
import { Trans } from '../../../../_custom/components/Trans';
import {
  StringSelectOption,
  StringSelectTransition
} from '../../../../_custom/Column/String/StringColumn';
import { RoleKeyEnum } from '../../Role/Model';
import { ModelEnum } from '../../types';


export const NATURE_OPTIONS: Array<StringSelectOption> = [
  { id: NatureEnum.Breakdown, color: 'warning' },
  { id: NatureEnum.BlockingBreakdown, color: 'danger' },
  { id: NatureEnum.Update, color: 'primary' },
  { id: NatureEnum.Preventive, color: 'success' }
];

export const STATUS_OPTIONS: Array<StringSelectOption> = [
  { id: WorkOrderStatusEnum.Open, color: 'primary' },
  { id: WorkOrderStatusEnum.InProgress, color: 'info' },
  { id: WorkOrderStatusEnum.Completed, color: 'success' },
  { id: WorkOrderStatusEnum.Closed, color: 'dark' }
];
export const STATUS_TRANSITIONS: Array<StringSelectTransition<ModelEnum.WorkOrder>> = [
  {
    from: WorkOrderStatusEnum.InProgress,
    to: WorkOrderStatusEnum.Completed,
    grant: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Responsible, RoleKeyEnum.BiomedicalTechnician],
    when: ({interventions}) => !!interventions.length
  },
  {
    from: WorkOrderStatusEnum.Completed,
    to: WorkOrderStatusEnum.Closed,
    grant: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Responsible, RoleKeyEnum.ServiceMajor, RoleKeyEnum.ParamedicalServiceDS]
  }
];
export const WorkOrderStatus: FC<Required<Pick<Model, 'status'>> & HTMLAttributes<HTMLDivElement>> = ({
  status,
  className
}) => {
  const option = STATUS_OPTIONS.find(option => option.id === status);
  if (!option) {
    return (
      <>
        OPTION NOT FOUND
      </>
    );
  }
  const { color } = option;

  return (
    <span className={clsx('badge fs-7', `badge-light-${color}`, className)}>
      {/*<SVG path={icon} variant={color} size='2' className='me-2' />*/}
      <Trans id={status} />
    </span>
  );
};