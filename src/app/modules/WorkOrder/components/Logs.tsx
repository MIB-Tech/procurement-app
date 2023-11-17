import React from 'react';
import { useParams } from 'react-router-dom';
import { KTSVG } from '../../../../_metronic/helpers';
import Moment from 'react-moment';
import clsx from 'clsx';
import { LogActionEnum } from '../../WorkOrderLog';
import { PropertyFilterOperator } from '../../../../_custom/ListingView/Filter/Filter.types';
import { WorkOrderStatus } from './WorkOrderStatus';
import { WorkOrderStatusEnum } from '../Model';
import { useCollectionQuery } from '../../../../_custom/hooks/UseCollectionQuery';
import { ModelEnum } from '../../types';


const Logs = () => {
  const params = useParams<{ id: string }>();
  const query = useCollectionQuery<ModelEnum.WorkOrderLog>({
    modelName: ModelEnum.WorkOrderLog,
    params: {
      filter: {
        operator: PropertyFilterOperator.Equal,
        property: 'objectId',
        value: params.id
      }
    }
  });

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='timeline'>
          {query.collection.map((log, index) => {
            const { id, action, username = 'Guest', loggedAt, data, oldData } = log;
            // const { icon, variant } = LOG_CONFIG[action];
            const status = data?.status || WorkOrderStatusEnum.Open;
            // const { icon, variant } = STATUSES[status];

            return (
              <div key={id} className='timeline-item'>
                <div className='timeline-line w-40px' />

                {/*<div className='timeline-icon symbol symbol-circle symbol-40px'>*/}
                {/*  <div className='symbol-label bg-light'>*/}
                {/*    <SVG*/}
                {/*      path={icon}*/}
                {/*      variant={variant}*/}
                {/*      size='1'*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}

                <div className={clsx(
                  'timeline-content -mb-10 -mt-n2 mb-2'
                )}>
                  <div className='pe-3 mb-5'>
                    <div className='fs-5 fw-bold mb-2'>
                      {action === LogActionEnum.Create ? 'Crée' : 'Mis à jour'}
                      {` `}
                      {username}
                    </div>
                  </div>
                  <div className='overflow-auto -pb-5'>
                    <div
                      className='d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3'>
                      <span className='fs-5 text-muted text-hover-primary fw-bold w-375px min-w-200px'>
                        <Moment date={loggedAt} format='LLLL' />
                      </span>
                      {oldData?.status && (
                        <>
                          <div className='symbol-group symbol-hover flex-nowrap pe-2'>
                            {oldData.status && <WorkOrderStatus status={oldData.status} />}
                          </div>
                          <div>
                            <KTSVG
                              path='/media/icons/duotune/arrows/arr064.svg'
                              className='svg-icon-2'
                            />
                          </div>
                        </>
                      )}
                      <div className='symbol-group symbol-hover flex-nowrap flex-grow-1 pe-2'>
                        {status && <WorkOrderStatus status={status} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Logs;
