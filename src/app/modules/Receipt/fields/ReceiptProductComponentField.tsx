import { useFormikContext } from "formik";
import {
  CreateViewType,
  FormFields,
  Model,
  ViewEnum,
} from "../../../../_core/types/ModelMapping";
import { ModelEnum } from "../../types";
import { useCollectionQuery } from "../../../../_core/hooks/UseCollectionQuery";
import { PropertyFilterOperator } from "../../../../_core/ListingView/Filter/Filter.types";
import { QuantityStatusEnum } from "../../PurchaseOrder/Model";
import React, { useMemo } from "react";
import { CellContent } from "../../../../_core/ListingView/views/Table/BodyCell";
import { PURCHASE_ORDER_PRODUCT_MAPPING } from "../../PurchaseOrderProduct";
import { BooleanField } from "../../../../_core/Column/Boolean/BooleanField";
import { PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING } from "../../PurchaseOrderProductComponent";
import {
  NestedArrayField,
  NestedArrayFieldProps,
} from "../../../../_core/Column/Model/Nested/NestedArrayField";
import { HydraItem } from "../../../../_core/types/hydra.types";
import { Bullet } from "../../../../_core/components/Bullet";

type ReceiptProductsFieldProps = {} & Omit<
  NestedArrayFieldProps<ModelEnum.ReceiptProductComponent>,
  "modelName"
>;

export const ReceiptProductsField = ({
  ...props
}: ReceiptProductsFieldProps) => {
  const formik = useFormikContext<Model<ModelEnum.Receipt>>();
  const { id } = formik.values;

  const fields = useMemo<FormFields<ModelEnum.ReceiptProductComponent>>(() => {
    return {
      purchaseOrderProductComponent: {
        render: ({ metaProps }) => (
          <div className='text-truncate'>
            {
              (
                metaProps.value.purchaseOrderProductComponent as
                  | HydraItem
                  | undefined
              )?.["@title"]
            }
          </div>
        ),
      },
      orderedQuantity: {
        render: ({ metaProps }) =>
          metaProps.value.purchaseOrderProductComponent?.quantity,
      },
      restQuantity: {
        render: ({ metaProps }) => metaProps.value.restQuantity,
      },
      quantity: true,
      status: {
        render: ({ metaProps }) => {
          const { purchaseOrderProductComponent } = metaProps.value;
          if (!purchaseOrderProductComponent) return <Bullet />;

          return (
            <CellContent<ModelEnum.PurchaseOrderProductComponent>
              columnMapping={
                PURCHASE_ORDER_PRODUCT_COMPONENT_MAPPING.columnDef.status
              }
              item={purchaseOrderProductComponent}
              columnName='status'
            />
          );
        },
      },
      received: {
        render: ({ inputProps, metaProps }) => (
          <BooleanField
            {...inputProps}
            size='sm'
            disabled={
              metaProps.value.purchaseOrderProductComponent?.status ===
              QuantityStatusEnum.FullyReceived
            }
          />
        ),
      },
    };
  }, []);

  return (
    <NestedArrayField
      {...props}
      modelName={ModelEnum.ReceiptProductComponent}
      disableInsert
      disableDelete
      view={{
        type: id ? ViewEnum.Update : ViewEnum.Create,
        fields,
      }}
    />
  );
};
