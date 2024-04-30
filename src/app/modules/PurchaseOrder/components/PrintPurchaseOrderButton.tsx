import React, {FC, useMemo, useState} from 'react'
import {CustomItemActionProps} from '../../../../_custom/types/ModelMapping'
import {ModelEnum} from '../../types'
import {useUri} from '../../../../_custom/hooks/UseUri'
import {useItemQuery} from '../../../../_custom/hooks/UseItemQuery'
import {
  LineType,
  PurchaseOrderComponentPrint,
  PurchaseOrderLinePrint,
  PurchaseOrderPrint,
  PurchaseOrderProductPrint,
} from '../Model'
import {getNumberUnit} from '../../../../_custom/components/NumberUnit'
import moment from 'moment'
import {DiscountType} from '../../PurchaseOrderProduct/Model'
import {Button} from '../../../../_custom/components/Button'
import {Trans} from '../../../../_custom/components/Trans'
import {Modal} from 'react-bootstrap'
import ReportViewer from './ReportViewer'
import {HydraItem} from '../../../../_custom/types/hydra.types'

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

    const {
      taxIncluded,
      buyer,
      totalInclTax,
      totalExclTax,
      totalVatTax,
      totalDiscount,
      createdAt,
      desiredDeliveryDate,
      purchaseOrderProducts,
      currency,
      ref,
      referents,
    } = item
    const unit = currency?.code || 'DH';


    return {
      ...item,
      referentFullNames: referents.map(referent => (referent as HydraItem)['@title']).join(', '),
      buyer: (buyer as HydraItem | undefined)?.['@title'],
      reference: ref,
      taxType: taxIncluded ? 'TTC' : 'HT',
      currency: unit,
      totalInclTaxNumber: totalInclTax,
      totalExclTax: getNumberUnit({value: totalExclTax, precision: 2, unit}),
      totalInclTax: getNumberUnit({value: totalInclTax, precision: 2, unit}),
      totalVatTax: getNumberUnit({value: totalVatTax, precision: 2, unit}),
      totalDiscount: getNumberUnit({value: totalDiscount, precision: 2, unit}),
      createdAt: moment(createdAt).format('L'),
      desiredDeliveryDate: moment(desiredDeliveryDate).format('L'),
      lines: purchaseOrderProducts.reduce((lines, purchaseOrderProduct) => {
        const precision = 2;
        const {
          designation,
          note,
          discountType,
          discountValue,
          priceExclTax,
          priceInclTax,
          grossPrice,
          components,
          discountedUnitPrice
        } = purchaseOrderProduct;
        const isPercentCentDiscount = discountType === DiscountType.Percent;

        return [
          ...lines,
          {
            ...purchaseOrderProduct,
            type: LineType.Product,
            designation: `${designation}${note ? `\n\n${note}` : ''}`,
            netPrice: getNumberUnit({value: taxIncluded ? priceInclTax: priceExclTax, precision, unit: false}),
            discountedUnitPrice: getNumberUnit({value: discountedUnitPrice, unit: false}),
            discount: getNumberUnit({
              value: isPercentCentDiscount ?
                discountValue * 100 :
                discountValue,
              unit: isPercentCentDiscount ? '%' : unit,
              precision: isPercentCentDiscount ? 2 : precision,
            }),
            grossPrice: getNumberUnit({value: grossPrice, precision, unit: false}),
          } as PurchaseOrderProductPrint,
          ...components.map(component => ({
            type: LineType.Component,
            product: component.product,
            quantity: component.quantity,
            designation: component.designation
          } as PurchaseOrderComponentPrint))
        ];
      }, [] as Array<PurchaseOrderLinePrint>)
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