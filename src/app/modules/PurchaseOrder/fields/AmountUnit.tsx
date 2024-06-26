import Model, { DiscountType } from "../../PurchaseOrderProduct/Model";
import { useFormikContext } from "formik";
import { PurchaseOrderModel } from "../index";
import {
  CurrencyProps,
  NumberUnit,
} from "../../../../_core/components/NumberUnit";
import { Bullet } from "../../../../_core/components/Bullet";
import React, { FC } from "react";

export const AmountUnit = ({
  getValue,
  defaultValue = 0,
}: {
  defaultValue?: number;
  getValue: (taxIncluded: boolean) => number;
}) => {
  const formik = useFormikContext<Partial<PurchaseOrderModel>>();
  if (!formik) {
    return <NumberUnit value={defaultValue} />;
  }

  const {
    values: { taxIncluded, currency },
  } = formik;
  if (typeof taxIncluded === "undefined") {
    return <Bullet />;
  }

  return (
    <PurchaseOrderNumberUnit
      value={getValue(taxIncluded)}
      unit={currency?.code}
    />
  );
};
type NetPriceProps = Pick<
  Model,
  "grossPrice" | "vatRate" | "discountType" | "discountValue"
> &
  Pick<PurchaseOrderModel, "taxIncluded">;
const getNetPrice = (item: NetPriceProps) => {
  const { taxIncluded, grossPrice, vatRate, discountType, discountValue } =
    item;
  if (!grossPrice) {
    return 0;
  }

  const amount = taxIncluded ? grossPrice / (1 + vatRate) : grossPrice;

  const discountAmount =
    discountType === DiscountType.Amount
      ? discountValue
      : amount * discountValue;

  return amount - discountAmount;
};
type PriceExclTaxProps = NetPriceProps & Pick<Model, "quantity">;
export const getPriceExclTax = ({ quantity, ...item }: PriceExclTaxProps) =>
  getNetPrice(item) * quantity;
type PriceInclTaxProps = NetPriceProps & Pick<Model, "quantity">;
export const getPriceInclTax = (item: PriceInclTaxProps) => {
  const {
    taxIncluded,
    grossPrice,
    vatRate,
    quantity,
    discountType,
    discountValue,
  } = item;
  if (!vatRate) return getPriceExclTax(item);

  const priceExclTax = getPriceExclTax(item);
  const discountAmount =
    discountType === DiscountType.Amount
      ? discountValue
      : grossPrice * discountValue;

  return taxIncluded
    ? (grossPrice - discountAmount) * quantity
    : priceExclTax + priceExclTax * vatRate;
};
const PurchaseOrderNumberUnit: FC<CurrencyProps> = (props) => {
  const formik = useFormikContext<Partial<PurchaseOrderModel>>();
  return (
    <NumberUnit
      {...props}
      unit={formik.values.currency?.code}
    />
  );
};
