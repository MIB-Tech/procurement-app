import React, { FC, useEffect, useState } from 'react';
import { Timeline, TimelineItem } from 'vis-timeline/standalone';
import { Trans, useTrans } from '../../../../_custom/components/Trans';
import moment from 'moment';
import clsx from 'clsx';
import { Modal } from 'react-bootstrap';
import { DateType } from 'vis-timeline';
import { DateTimePicker } from '../../../../_custom/Column/String/Datetime/DateTimePicker';
import { FormGroup } from '../../../../_custom/components/FormGroup';
import { AssetDownTimeChart } from './AssetDownTimeChart';
import { getDurationText } from '../../utils';
import { NATURE_OPTIONS } from '../../WorkOrder/components/WorkOrderStatus';
import { WorkOrderTimeline } from '../../WorkOrder/components/WorkOrderTimeline';
import { useLocation } from 'react-router-dom';
import { useItemQuery } from '../../../../_custom/hooks/UseItemQuery';
import { AbstractModel } from '../../../../_custom/types/types';
import { ModelEnum } from '../../types';
import { useOptions, useWorkOrderCollectionQuery } from './AssetTimeline.utils';

export const AssetTimeline: FC<AbstractModel> = ({ id }) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [workOrderId, setWorkOrderId] = useState<number | null>();
  const { trans } = useTrans();
  const [options, setOptions] = useOptions();
  const { pathname: path } = useLocation();
  const assetQuery = useItemQuery({ modelName: ModelEnum.Asset, path });
  const asset = assetQuery.item
  const workOrderCollectionQuery = useWorkOrderCollectionQuery({ id, ...options });

  useEffect(() => {
    timeline?.setOptions(options);
  }, [timeline, options]);

  useEffect(() => {
    if (element) {
      const tl = new Timeline(element, []);
      tl.on('select', ({ items }: { items: Array<string | number> }) => {
        const item = items[0] || null;
        if (typeof item === 'number') {
          setWorkOrderId(item);
        }
      });

      setTimeline(tl);
    }

    return () => {
      timeline?.destroy();
    };
  }, [element]);

  useEffect(() => {
    if (!asset || !timeline) return;

    let items: TimelineItem[] = [];

    const { installedAt, guaranteeExpiryAt, contract } = asset;

    if (installedAt) {
      items.push({
        id: 'INSTALLATION_TIME',
        content: trans({ id: 'INSTALLATION_TIME' }),
        start: installedAt,
        type: 'point'
      });
    }

    if (guaranteeExpiryAt) {
      items.push({
        id: 'UNDER_WARRANTY',
        content: trans({ id: 'UNDER_WARRANTY' }),
        start: installedAt || '',
        end: guaranteeExpiryAt,
        type: 'background'
      });
    }

    if (contract?.startAt) {
      items.push({
        id: 'GUARANTEED_END_DATE',
        content: trans({ id: 'GUARANTEED_END_DATE' }),
        start: contract.startAt,
        end: contract.endAt,
        className: 'bg-light-primary',
        type: 'background'
      });
    }
    workOrderCollectionQuery.collection.forEach(workOrder => {
      const { id, name, nature, status, startAt, endAt } = workOrder;
      const option = NATURE_OPTIONS.find(option => option.id === nature);
      const variant = option?.color || 'dark';
      const duration = getDurationText({ start: startAt, end: endAt || moment().format() });

      let item: TimelineItem = {
        id,
        content: `<b>#${id}</b> ${name} (${duration})`,
        className: clsx(
          status && `bg-light-${variant} border-${variant} rounded-start`,
          endAt ? 'rounded-end' : 'rounded-end-0'
        ),
        start: ''
      };

      item.start = startAt;
      item.end = endAt || moment().toDate();
      items.push(item);
    });

    timeline.setItems(items);
  }, [timeline, asset, workOrderCollectionQuery]);

  const loading = assetQuery.isLoading || workOrderCollectionQuery.isLoading;


  return (
    <div className='card'>
      <div className='card-body'>
        <div className='d-md-flex align-items-center'>
          <div className='flex-grow-1'>
            <div className='d-flex align-items-end justify-content-end mt-3 mb-3'>
              {loading && (
                <div className='me-auto'>
                  <Trans id='LOADING' />
                </div>
              )}
              <FormGroup label='PAR_YEAR' className='mw-75px'>
                <DateTimePicker
                  views={['year']}
                  inputFormat='YYYY'
                  size='sm'
                  value={options.start}
                  onChange={value => {
                    const date = moment(value as DateType);
                    setOptions({
                      ...options,
                      start: date.startOf('y').format(),
                      end: date.endOf('y').format()
                    });
                  }}
                />
              </FormGroup>
              <div className='bullet bg-secondary h-35px w-1px mx-5' />
              <FormGroup label='PER_DURATION' className='pe-2'>
                <DateTimePicker
                  openTo='year'
                  size='sm'
                  value={options.start}
                  onChange={value => {
                    setOptions({ ...options, start: value as DateType });
                  }}
                />
              </FormGroup>
              <div>
                <DateTimePicker
                  openTo='year'
                  size='sm'
                  value={options.end}
                  onChange={value => {
                    setOptions({ ...options, end: value as DateType });
                  }}
                />
              </div>
            </div>
            <div className='border rounded'>
              <div ref={r => setElement(r)} />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <AssetDownTimeChart
              workOrders={workOrderCollectionQuery.collection}
              start={moment(options.start).format()}
              end={moment(options.end).format()}
            />
          </div>
        </div>
      </div>

      {workOrderId && (
        <Modal
          size='lg'
          show
          onHide={() => {
            setWorkOrderId(null);
          }}
          contentClassName='bg-light'
        >
          <Modal.Body>
            <WorkOrderTimeline id={workOrderId} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};