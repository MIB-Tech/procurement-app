import {
  NestedArrayField,
  NestedArrayFieldProps,
} from "../../../../_core/Column/Model/Nested/NestedArrayField";
import { ModelEnum } from "../../types";
import { FormFields, ViewEnum } from "../../../../_core/types/ModelMapping";
import React, { useMemo } from "react";
import { NumberColumnField } from "../../../../_core/Column/Number/NumberColumnField";
import { DiscountType } from "../../PurchaseOrderProduct/Model";
import { NumberFormat } from "../../../../_core/Column/Number/NumberColumn";
import { VatRateSelectField } from "../../VatRate/components/VatRateSelectField";
import { ProductField } from "./ProductField";
import { QuantityField } from "./QuantityField";
import { AmountUnit, getPriceExclTax, getPriceInclTax } from "./AmountUnit";
import { ReceiptProductsField } from "./ReceiptProductsField";
import { ModelAutocompleteField } from "../../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import { useFormikContext } from "formik";
import { HydraItem } from "../../../../_core/types/hydra.types";

type Props = Omit<
  NestedArrayFieldProps<ModelEnum.PurchaseOrderProduct>,
  "modelName"
>;
export const PurchaseOrderProductsFields = ({ ...props }: Props) => {
  const formik =
    useFormikContext<Partial<HydraItem<ModelEnum.PurchaseOrder>>>();
  const fields = useMemo<FormFields<ModelEnum.PurchaseOrderProduct>>(() => {
    return {
      product: {
        render: ({ fieldProps }) => <ProductField {...fieldProps} />,
      },
      designation: true,
      quantity: {
        render: ({ fieldProps }) => <QuantityField {...fieldProps} />,
      },
      grossPrice: {
        render: ({ item, fieldProps }) => (
          <NumberColumnField
            {...fieldProps}
            size='sm'
            disabled={!item.editablePrice}
          />
        ),
      },
      note: true,
      discountType: {
        defaultValue: DiscountType.Percent,
      },
      discountValue: {
        render: ({ item, fieldProps }) => (
          <NumberColumnField
            format={
              item.discountType === DiscountType.Percent
                ? NumberFormat.Percent
                : NumberFormat.Amount
            }
            {...fieldProps}
            size='sm'
            min={0}
            precision={7}
          />
        ),
      },
      vatRate: {
        defaultValue: 0.2,
        render: ({ fieldProps }) => (
          <VatRateSelectField fieldProps={{ ...fieldProps }} />
        ),
      },
      priceExclTax: {
        render: ({ item }) => (
          <AmountUnit
            getValue={(taxIncluded) =>
              getPriceExclTax({ ...item, taxIncluded })
            }
          />
        ),
      },
      priceInclTax: {
        render: ({ item }) => (
          <AmountUnit
            getValue={(taxIncluded) =>
              getPriceInclTax({ ...item, taxIncluded })
            }
          />
        ),
      },
      receiptProducts: {
        display: ({ item }) => !!item.product,
        render: ({ fieldProps }) => <ReceiptProductsField {...fieldProps} />,
      },
      components: {
        render: ({ item, fieldProps }) => {
          const fields: FormFields<ModelEnum.PurchaseOrderProductComponent> = {
            product: {
              render: ({ fieldProps }) => (
                <div className='mw-250px'>
                  <ModelAutocompleteField
                    {...fieldProps}
                    modelName={ModelEnum.Product}
                    size='sm'
                    disabled
                  />
                </div>
              ),
            },
            designation: true,
            quantity: true,
          };

          return (
            <NestedArrayField
              modelName={ModelEnum.PurchaseOrderProductComponent}
              {...fieldProps}
              disableInsert
              view={{
                type: item.id ? ViewEnum.Update : ViewEnum.Create,
                fields,
              }}
            />
          );
        },
      },
    };
  }, []);

  return (
    <NestedArrayField
      {...props}
      modelName={ModelEnum.PurchaseOrderProduct}
      view={{
        type: formik.values.id ? ViewEnum.Update : ViewEnum.Create,
        fields,
      }}
    />
  );
};
