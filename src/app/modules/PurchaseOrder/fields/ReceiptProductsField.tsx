import { FieldProps } from "../../../../_core/Column/controls/fields";
import { useFormikContext } from "formik";
import { PurchaseOrderModel } from "../index";
import { useCollectionQuery } from "../../../../_core/hooks/UseCollectionQuery";
import { ModelEnum } from "../../types";
import { PropertyFilterOperator } from "../../../../_core/ListingView/Filter/Filter.types";
import { NestedArrayField } from "../../../../_core/Column/Model/Nested/NestedArrayField";
import React from "react";
import { FormFields, ViewEnum } from "../../../../_core/types/ModelMapping";

export const ReceiptProductsField = ({ ...fieldProps }: FieldProps) => {
  const formik = useFormikContext<Partial<PurchaseOrderModel>>();
  const { clinic, purchaseOrderProducts } = formik.values;
  const fields: FormFields<ModelEnum.ReceiptProduct> = {
    designation: true,
    quantity: true,
    deliveryDepot: true,
  };
  const { collection: deliveryDepots } =
    useCollectionQuery<ModelEnum.DeliveryDepot>({
      modelName: ModelEnum.DeliveryDepot,
      params: {
        itemsPerPage: 1,
        filter: {
          property: "clinic",
          operator: PropertyFilterOperator.Equal,
          value: clinic?.id,
        },
      },
    });

  const index = fieldProps.name.split(".").at(1);
  const purchaseOrderProduct = index
    ? purchaseOrderProducts?.[parseInt(index)]
    : undefined;

  return (
    <NestedArrayField
      {...fieldProps}
      modelName={ModelEnum.ReceiptProduct}
      disableInsert={!purchaseOrderProduct?.product}
      view={{
        type: purchaseOrderProduct?.id ? ViewEnum.Update : ViewEnum.Create,
        fields,
      }}
      extraAttribute={{
        designation: purchaseOrderProduct?.designation,
        deliveryDepot: deliveryDepots.at(0),
      }}
    />
  );
};
