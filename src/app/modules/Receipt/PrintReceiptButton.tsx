import React, {FC, useMemo, useState} from 'react';
import {CustomItemActionProps} from '../../../_custom/types/ModelMapping';
import {ModelEnum} from '../types';
import {useUri} from '../../../_custom/hooks/UseUri';
import {useItemQuery} from '../../../_custom/hooks/UseItemQuery';
import {ReceiptLineComponentPrint, ReceiptLineProductPrint, ReceiptPrint, ReceiptPrintLine} from './Model';
import moment from 'moment/moment';
import {Button} from '../../../_custom/components/Button';
import {Trans} from '../../../_custom/components/Trans';
import {Modal} from 'react-bootstrap';
import ReportViewer from '../PurchaseOrder/components/ReportViewer';
import {LineType, PurchaseOrderProductPrint} from '../PurchaseOrder/Model';

export const PrintReceiptButton: FC<CustomItemActionProps<ModelEnum.Receipt>> = ({...props}) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.Receipt;
  const uri = useUri({modelName});
  const {item, isLoading} = useItemQuery<ModelEnum.Receipt>({
    modelName,
    path: `/print${uri}`,
    enabled: open
  });
  const params = useMemo<ReceiptPrint | undefined>(() => {
    if (!item) return undefined;

    return {
      ...item,
      receivedAt: moment(item.receivedAt).format('L'),
      lines: item.receiptProducts.reduce((lines, receiptProduct) => {
        const {desiredProduct, components} = receiptProduct;
        const {designation, purchaseOrderProduct, quantity} = desiredProduct;
        const {product, note} = purchaseOrderProduct;

        return [
          ...lines,
          {
            ...receiptProduct,
            type: LineType.Product,
            reference: product.code,
            designation: `${designation}${note ? `\n\n${note}` : ''}`,
            desiredProductQuantity: quantity,
          } as ReceiptLineProductPrint,
          ...components.map(component => ({
            type: LineType.Component,
            reference: component.purchaseOrderProductComponent.product.code,
            designation: component.purchaseOrderProductComponent.designation,
            desiredProductQuantity: component.purchaseOrderProductComponent.quantity,
            quantity: component.quantity,
          } as ReceiptLineComponentPrint))
        ];
      }, [] as Array<ReceiptPrintLine>)
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
              fileName='receipt.mrt'
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};