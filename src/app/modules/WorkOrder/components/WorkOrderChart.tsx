import React from 'react';
import moment from 'moment/moment';
import { Trans } from '../../../../_custom/components/Trans';
import { I18nMessageKey } from '../../../../_custom/i18n/I18nMessages';
import { InterventionModel } from '../../Intervention';
import Model from '../Model';
import { getDurationTextFromDiff } from '../../utils';


export const WorkOderWidgets = ({ workOrder }: { workOrder: Model }) => {
  const { startAt, endAt, companyCalledAt, progressStartedAt, interventions } = workOrder;
  const workOrderDiff = moment(endAt ?? undefined).diff(startAt);

  let delays: { key: I18nMessageKey, diff: number }[] = [
    { key: 'DURATION', diff: workOrderDiff }
  ];

  const comparisonTime = companyCalledAt ?? progressStartedAt;
  if (interventions.length && comparisonTime) {
    let firstIntervention: InterventionModel | undefined = interventions[0];
    const lastIntervention = interventions[interventions.length - 1];
    if (companyCalledAt) {
      firstIntervention = interventions.find(({ startAt }) => moment(startAt).isAfter(companyCalledAt));
    }
    const internalDiff = firstIntervention ? moment(firstIntervention.startAt).diff(comparisonTime) : 0;
    const externalDiff = lastIntervention ? moment(lastIntervention.endAt).diff(comparisonTime) : 0;

    delays.push(
      { key: 'INTERVENTION_DELAY', diff: internalDiff },
      { key: 'REPAIR_DELAY', diff: externalDiff }
    );
  }


  return (
    <div className={`row row-cols-${delays.length} mb-5`}>
      {delays.map(({ diff, key }) => (
        <div key={key}>
          <div className='card'>
            <div className='card-body d-flex justify-content-between align-items-start flex-column'>
              <div className='d-flex flex-column mt-3 mb-5'>
                <span className='fw-semibold fs-2x text-gray-800 lh-1 ls-n2'>
                  {getDurationTextFromDiff({ diff })}
                </span>
              </div>
              <div className='m-0'>
                <span className='fw-semibold fs-6 text-gray-400'>
                  <Trans id={key} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};