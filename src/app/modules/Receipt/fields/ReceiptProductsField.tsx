import { useFormikContext } from "formik";
import {
  FormFields,
  Model,
  ViewEnum,
} from "../../../../_core/types/ModelMapping";
import { ModelEnum } from "../../types";
import { QuantityStatusEnum } from "../../PurchaseOrder/Model";
import React, { useMemo } from "react";
import { BooleanField } from "../../../../_core/Column/Boolean/BooleanField";
import {
  NestedArrayField,
  NestedArrayFieldProps,
} from "../../../../_core/Column/Model/Nested/NestedArrayField";
import { NumberField } from "../../../../_core/Column/Number/NumberField";

type ReceiptProductsFieldProps = {} & Omit<
  NestedArrayFieldProps<ModelEnum.ReceiptProduct>,
  "modelName"
>;

export const ReceiptProductsField = ({
  ...props
}: ReceiptProductsFieldProps) => {
  const formik = useFormikContext<Model<ModelEnum.Receipt>>();
  const { id } = formik.values;

  const fields = useMemo<FormFields<ModelEnum.ReceiptProduct>>(() => {
    if (id) {
      return {
        designation: true,
        quantity: {
          render: ({ inputProps }) => (
            <NumberField
              {...inputProps}
              disabled
            />
          ),
        },
        note: true,
        // components: {
        //   render: ({ inputProps }) => <ReceiptProductsField {...inputProps} />,
        // },
      };
    }

    return {
      designation: true,
      initialQuantity: {
        render: ({ metaProps }) => metaProps.value.initialQuantity,
      },
      restQuantity: {
        render: ({ metaProps }) => {
          const { initialQuantity = 0, quantity = 0 } = metaProps.value;

          return initialQuantity - quantity;
        },
      },
      quantity: true,
      note: true,
      received: {
        render: ({ inputProps, metaProps }) => (
          <BooleanField
            {...inputProps}
            disabled={
              metaProps.value.purchaseOrderProduct?.receiptStatus ===
              QuantityStatusEnum.FullyReceived
            }
            size='sm'
          />
        ),
      },
      // components: {
      //   render: ({ inputProps }) => <ReceiptProductsField {...inputProps} />,
      // },
    };
  }, [id]);

  return (
    <NestedArrayField
      {...props}
      modelName={ModelEnum.ReceiptProduct}
      disableInsert
      disableDelete
      view={{
        type: id ? ViewEnum.Update : ViewEnum.Create,
        fields,
      }}
    />
  );
};
