import React, { FC, useEffect, useState } from 'react';
import { Timeline, TimelineItem } from 'vis-timeline/standalone';
import { useTrans } from '../../../../_custom/components/Trans';
import clsx from 'clsx';
import moment from 'moment';
import { getDurationText } from '../../utils';
import { NATURE_OPTIONS } from './WorkOrderStatus';
import { WorkOderWidgets } from './WorkOrderChart';
import { getRoutePrefix } from '../../../../_custom/utils';
import { useItemQuery } from '../../../../_custom/hooks/UseItemQuery';
import { AbstractModel } from '../../../../_custom/types/types';
import { ModelEnum } from '../../types';


export const WorkOrderTimeline: FC<AbstractModel> = ({ id }) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const { item: workOrder } = useItemQuery({
    modelName: ModelEnum.WorkOrder,
    path: `${getRoutePrefix(ModelEnum.WorkOrder)}/${id}/timeline`
  });
  const { trans, locale } = useTrans();

  useEffect(() => {
    if (element && !timeline) {
      const tl = new Timeline(element, [], {
          minHeight: 200,
          locale,
          horizontalScroll: true
        }
      );

      setTimeline(tl);
    }

    return () => {
      timeline?.destroy();
    };
  }, [element]);

  useEffect(() => {
    if (!timeline || !workOrder) return;

    const { name, startAt, endAt, companyCalledAt, progressStartedAt, interventions, nature } = workOrder;
    const option = NATURE_OPTIONS.find(option => option.id === nature);
    let items: TimelineItem[] = [
      {
        id: 'START_AT',
        content: name + ': ' + getDurationText({ start: startAt, end: endAt || moment().format() }),
        start: startAt,
        end: endAt || moment().format(),
        className: clsx(nature && `bg-light-${option?.color || 'dark'}`),
        type: 'background'
      }
      // {
      //   id: 'END_TIME',
      //   content: trans({ id: 'END_TIME' }),
      //   start: endAt || moment().format(),
      //   type: 'point'
      // }
    ];

    if (progressStartedAt) {
      items.push({
        id: 'PROGRESS_STARTED_AT',
        content: trans({ id: 'PROGRESS_STARTED_AT' }),
        start: progressStartedAt,
        type: 'point'
      });
    }

    if (companyCalledAt) {
      items.push({
        id: 'COMPANY_CALLED_AT',
        content: trans({ id: 'COMPANY_CALLED_AT' }),
        start: companyCalledAt,
        type: 'point'
      });
    }

    interventions?.forEach(intervention => {
      const { id, startAt, endAt } = intervention;
      const duration = getDurationText({ start: startAt, end: endAt });

      items.push({
        id,
        content: trans({ id: 'INTERVENTION' }) + ': ' + duration,
        start: startAt,
        end: endAt
      });
    });

    const amount = moment(endAt).diff(startAt || moment()) / 10;
    const start = moment(startAt).subtract(amount).format();
    const end = moment(endAt || moment()).add(amount).format();
    timeline.setOptions({
      start,
      end,
      min: start,
      max: end
    });
    timeline.setItems(items);
  }, [timeline, workOrder]);

  return (
    <>
      {workOrder && (
        <div className='mb-5'>
          <WorkOderWidgets workOrder={workOrder} />
        </div>
      )}
      <div className='card'>
        <div className='card-body'>
          <div ref={r => setElement(r)} />
        </div>
      </div>
    </>
  );
};