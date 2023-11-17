import React, { useEffect } from 'react';
import { getCSSVariableValue } from '../../../../_metronic/assets/ts/_utils';
import { Chart, ChartConfiguration } from 'chart.js';
import moment from 'moment/moment';
import { useTrans } from '../../../../_custom/components/Trans';
import { NatureEnum } from '../../WorkOrder/Model';
import { getDurationTextFromDiff } from '../../utils';
import { NATURE_OPTIONS } from '../../WorkOrder/components/WorkOrderStatus';
import { HydraItem } from '../../../../_custom/types/hydra.types';
import { ModelEnum } from '../../types';


const elementId = 'TODO_gdf';

export const AssetDownTimeChart = ({
  workOrders,
  start,
  end
}: { workOrders: Array<HydraItem<ModelEnum.WorkOrder>>, start: string, end: string }) => {
  const { trans } = useTrans();

  useEffect(() => {
    const element = document.getElementById(elementId) as HTMLCanvasElement;
    if (!element) {
      return;
    }

    const _workOrders = workOrders.filter(workOrder => workOrder.nature !== NatureEnum.Breakdown);

    const rangeDiff = moment(end).diff(start);
    let upTimeDiff = rangeDiff;

    let data: number[] = [];
    let colors: string[] = [getCSSVariableValue('--bs-gray-700')];
    let labels: string[] = [trans({ id: 'UPTIME' })];

    (Object.values(NatureEnum) as NatureEnum[]).forEach(nature => {
      const isBlocking = ![NatureEnum.Breakdown].includes(nature);
      if (isBlocking) {
        const natureDiff = _workOrders.filter(workOrder => workOrder.nature === nature)
        .reduce((diff, { startAt, endAt }) => diff + moment(endAt).diff(startAt), 0);
        data.push(natureDiff);
        const option = NATURE_OPTIONS.find(option => option.id === nature);
        colors.push(getCSSVariableValue(`--bs-${option?.color || 'dark'}`));
        labels.push(trans({ id: nature }));

        upTimeDiff -= natureDiff;
      }
    });

    data.unshift(upTimeDiff);

    const options: ChartConfiguration = {
      type: 'pie',
      data: {
        datasets: [
          {
            data,
            backgroundColor: colors
          }
        ],
        labels
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: ({ parsed, label }) => {
                const percent = 100 * parsed / rangeDiff;

                return `${label} : ${percent.toFixed(2)}%`;
              },
              footer: (tooltipItems) => {
                const diff = tooltipItems.reduce((diff, tooltipItem) => diff + tooltipItem.parsed, 0);

                return trans({ id: 'TOTAL' }) + ': ' + getDurationTextFromDiff({ diff });
              }
            }
          }
        },
        responsive: false,
        maintainAspectRatio: false
      }
    };

    const ctx = element.getContext('2d');
    let myDoughnut: Chart | null;
    if (ctx) {
      myDoughnut = new Chart(ctx, options);
    }

    return () => myDoughnut?.destroy();
  }, [workOrders, start, end]);

  return <canvas id={elementId} />;
};