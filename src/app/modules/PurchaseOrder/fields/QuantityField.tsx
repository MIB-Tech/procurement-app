import { FieldProps } from "../../../../_core/Column/controls/fields";
import { useField } from "formik";
import { ReceiptProductModel } from "../../ReceiptProduct";
import { PurchaseOrderProductComponentModel } from "../../PurchaseOrderProductComponent";
import { NumberColumnField } from "../../../../_core/Column/Number/NumberColumnField";
import React from "react";

export const QuantityField = ({ ...props }: Pick<FieldProps, "name">) => {
  const { name } = props;
  const [field] = useField({ name });
  const [{ value: receiptProducts }, , { setValue: setReceiptProducts }] =
    useField<Array<Partial<ReceiptProductModel>>>({
      name: name.replace("quantity", "receiptProducts"),
    });
  const [{ value: components }, , { setValue: setComponents }] = useField<
    Array<Partial<PurchaseOrderProductComponentModel>>
  >({ name: name.replace("quantity", "components") });

  return (
    <NumberColumnField
      {...props}
      size='sm'
      onChange={async (event) => {
        field.onChange(event);

        const quantity = event.target.value as unknown as number;
        if (receiptProducts.length === 1) {
          await setReceiptProducts([{ ...receiptProducts.at(0), quantity }]);
        }
        await setComponents(
          components.map((component) => ({
            ...component,
            quantity: quantity * (component.componentQuantity || 1),
          }))
        );
      }}
    />
  );
};
