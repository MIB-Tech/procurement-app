import React, {FC, useMemo, useState} from 'react';
import {CustomItemActionProps} from '../../../../_custom/types/ModelMapping';
import {ModelEnum} from '../../types';
import {useUri} from '../../../../_custom/hooks/UseUri';
import {useItemQuery} from '../../../../_custom/hooks/UseItemQuery';
import {PurchaseOrderPrint} from '../Model';
import {getNumberUnit} from '../../../../_custom/components/NumberUnit';
import moment from 'moment';
import {DiscountType} from '../../PurchaseOrderProduct/Model';
import {Button} from '../../../../_custom/components/Button';
import {Trans} from '../../../../_custom/components/Trans';
import {Modal} from 'react-bootstrap';
import ReportViewer from './ReportViewer';

export const PrintPurchaseOrderButton: FC<CustomItemActionProps<ModelEnum.PurchaseOrder>> = ({...props}) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.PurchaseOrder;
  const uri = useUri({modelName});
  const {item, isLoading} = useItemQuery<ModelEnum.PurchaseOrder>({
    modelName,
    path: `/print${uri}`,
    enabled: open
  });
  const params = useMemo<PurchaseOrderPrint | undefined>(() => {
    if (!item) return undefined;

    const unit = item?.currency?.code || 'DH';

    return {
      ...item,
      totalExclTax: getNumberUnit({value: item.totalExclTax, precision: 2, unit}),
      totalInclTax: getNumberUnit({value: item.totalInclTax, precision: 2}),
      totalVatTax: getNumberUnit({value: item.totalVatTax, precision: 2}),
      totalDiscount: getNumberUnit({value: item.totalDiscount, precision: 2}),
      createdAt: moment(item.createdAt).format('L'),
      desiredDeliveryDate: moment(item.desiredDeliveryDate).format('L'),
      purchaseOrderProducts: item.purchaseOrderProducts.map(purchaseOrderProduct => {
        const precision = 2;
        const {
          designation,
          note,
          discountType,
          discountValue,
          netPriceExclTax,
          vatRate,
          grossPrice,
          netPrice
        } = purchaseOrderProduct;
        const isPercentCentDiscount = discountType === DiscountType.Percent;

        return {
          ...purchaseOrderProduct,
          designation: `${designation}${note ? `\n\n${note}` : ''}`,
          netPriceExclTax: getNumberUnit({value: netPriceExclTax, precision}),
          discount: getNumberUnit({
            value: isPercentCentDiscount ?
              discountValue * 100 :
              discountValue,
            unit: isPercentCentDiscount ? '%' : unit,
            precision: isPercentCentDiscount ? 2 : precision,
          }),
          vatRate: getNumberUnit({value: vatRate, unit: '%', precision}),
          grossPrice: getNumberUnit({value: grossPrice, precision}),
          netPrice: getNumberUnit({value: netPrice, precision}),
        };
      })
    };
  }, [item]);

  return (
    <div>
      <div className='position-relative'>
        <Button
          size='sm'
          variant='outline-default'
          className='bg-white'
          onClick={() => setOpen(true)}
        >
          <Trans id='PRINT'/>
        </Button>
      </div>
      <Modal
        fullscreen
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header closeButton/>
        <Modal.Body>
          {isLoading && <Trans id='LOADING'/>}
          {params && (
            <ReportViewer
              fileName='purchase-order.mrt'
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};