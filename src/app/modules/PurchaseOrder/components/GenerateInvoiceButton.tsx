import React, {FC} from 'react';
import {CustomItemActionProps, ViewEnum} from '../../../../_custom/types/ModelMapping';
import {ModelEnum} from '../../types';
import {useTrans} from '../../../../_custom/components/Trans';
import {useAuth} from '../../../../_custom/hooks/UseAuth';
import {InvoiceModel} from '../../Invoice';
import {RouteLinks} from '../../../../_custom/components/RouteAction/RouteLinks';

export const GenerateInvoiceButton: FC<CustomItemActionProps<ModelEnum.PurchaseOrder>> = ({item}) => {
  const {trans} = useTrans();
  const {operations} = useAuth();
  const createOperation = operations.find(({resource, operationType}) => {
    return resource.name === ModelEnum.Invoice && operationType === ViewEnum.Create;
  });
  if (!createOperation) {
    return <></>;
  }
  const state: Partial<InvoiceModel> = {
    vendor: item.vendor,
    purchaseOrders: [item]
  };

  return (
    <RouteLinks
      operations={[{...createOperation, title: trans({id: 'GENERATE_INVOICE'})}]}
      linkProps={{state}}
    />
  );
};