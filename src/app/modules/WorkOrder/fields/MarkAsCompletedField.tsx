import { useField } from 'formik';
import { WorkOrderStatusEnum } from '../Model';
import { Checkbox } from '../../../../_custom/Column/Boolean/Chechbox/Checkbox';
import React from 'react';


export const MarkAsCompletedField = () => {
  const [{ value }, , { setValue }] = useField<WorkOrderStatusEnum>({
    name: 'workOrder.status'
  });
  const completed = value === WorkOrderStatusEnum.Completed;

  return (
    <Checkbox
      label='MARK_AS_COMPLETED'
      checked={completed}
      onChange={() => {
        setValue(completed ? WorkOrderStatusEnum.InProgress : WorkOrderStatusEnum.Completed);
      }}
    />
  );
};