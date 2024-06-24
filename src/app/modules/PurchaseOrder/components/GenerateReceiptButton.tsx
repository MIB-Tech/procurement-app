import React, { FC } from "react";
import {
  CustomItemActionProps,
  ViewEnum,
} from "../../../../_core/types/ModelMapping";
import { ModelEnum } from "../../types";
import { useTrans } from "../../../../_core/components/Trans";
import { useAuth } from "../../../../_core/hooks/UseAuth";
import { ReceiptModel } from "../../Receipt";
import { RouteLinks } from "../../../../_core/components/RouteAction/RouteLinks";

export const GenerateReceiptButton: FC<
  CustomItemActionProps<ModelEnum.PurchaseOrder>
> = ({ item }) => {
  const { trans } = useTrans();
  const { operations } = useAuth();
  const createOperation = operations.find(({ resource, operationType }) => {
    return (
      resource.name === ModelEnum.Receipt && operationType === ViewEnum.Create
    );
  });
  if (!createOperation) {
    return <></>;
  }
  const state: Partial<ReceiptModel> = {
    vendor: item.vendor,
    purchaseOrders: [item],
  };
  return (
    <RouteLinks
      operations={[
        { ...createOperation, title: trans({ id: "GENERATE_RECEIPT" }) },
      ]}
      linkProps={{ state }}
    />
  );
};
