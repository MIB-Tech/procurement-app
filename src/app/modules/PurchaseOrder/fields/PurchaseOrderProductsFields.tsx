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
        render: ({ inputProps }) => <ProductField {...inputProps} />,
      },
      designation: true,
      quantity: {
        render: ({ inputProps }) => <QuantityField {...inputProps} />,
      },
      grossPrice: {
        render: ({ inputProps, metaProps }) => (
          <NumberColumnField
            {...inputProps}
            size='sm'
            disabled={!metaProps.value.editablePrice}
          />
        ),
      },
      note: true,
      discountType: {
        defaultValue: DiscountType.Percent,
      },
      discountValue: {
        render: ({ inputProps, metaProps }) => (
          <NumberColumnField
            {...inputProps}
            format={
              metaProps.value.discountType === DiscountType.Percent
                ? NumberFormat.Percent
                : NumberFormat.Amount
            }
            size='sm'
            min={0}
            precision={7}
          />
        ),
      },
      vatRate: {
        defaultValue: 0.2,
        render: ({ inputProps }) => <VatRateSelectField {...inputProps} />,
      },
      priceExclTax: {
        render: ({ metaProps }) => {
          const {
            grossPrice = 0,
            vatRate = 0,
            quantity = 0,
            discountType = DiscountType.Amount,
            discountValue = 0,
          } = metaProps.value;

          return (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceExclTax({
                  taxIncluded,
                  grossPrice,
                  vatRate,
                  quantity,
                  discountType,
                  discountValue,
                })
              }
            />
          );
        },
      },
      priceInclTax: {
        render: ({ metaProps }) => {
          const {
            grossPrice = 0,
            vatRate = 0,
            quantity = 0,
            discountType = DiscountType.Amount,
            discountValue = 0,
          } = metaProps.value;

          return (
            <AmountUnit
              getValue={(taxIncluded) =>
                getPriceInclTax({
                  taxIncluded,
                  grossPrice,
                  vatRate,
                  quantity,
                  discountType,
                  discountValue,
                })
              }
            />
          );
        },
      },
      receiptProducts: {
        display: ({ item }) => !!item.product,
        render: ({ inputProps }) => <ReceiptProductsField {...inputProps} />,
      },
      components: {
        render: (pp) => {
          const { inputProps, metaProps } = pp;

          const fields: FormFields<ModelEnum.PurchaseOrderProductComponent> = {
            product: {
              render: ({ inputProps }) => (
                <div className='mw-250px'>
                  <ModelAutocompleteField
                    {...inputProps}
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
              {...inputProps}
              modelName={ModelEnum.PurchaseOrderProductComponent}
              disableInsert
              view={{
                type: metaProps.value.id ? ViewEnum.Update : ViewEnum.Create,
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
