import React, { FC, useMemo, useState } from "react";
import { CustomItemActionProps } from "../../../_custom/types/ModelMapping";
import { ModelEnum } from "../types";
import { useUri } from "../../../_custom/hooks/UseUri";
import { useItemQuery } from "../../../_custom/hooks/UseItemQuery";
import { getNumberUnit } from "../../../_custom/components/NumberUnit";
import moment from "moment";
import { Button } from "../../../_custom/components/Button";
import { Trans } from "../../../_custom/components/Trans";
import { Modal } from "react-bootstrap";
import ReportViewer from "../PurchaseOrder/components/ReportViewer";
import { DiscountType } from "../PurchaseOrderProduct/Model";
import { PurchaseOrderProductModel } from "../PurchaseOrderProduct";
import { VendorModel } from "../Vendor";
import { InvoicePrint } from "./Model";
import { LineType } from "../PurchaseOrder/Model";

export const PrintInvoiceButton: FC<
  CustomItemActionProps<ModelEnum.Invoice>
> = ({ ...props }) => {
  const [open, setOpen] = useState<boolean>();
  const modelName = ModelEnum.Invoice;
  const uri = useUri({ modelName });
  const { item, isLoading } = useItemQuery<ModelEnum.Invoice>({
    modelName,
    path: `/print${uri}`,
    enabled: open,
  });
  const params = useMemo<InvoicePrint | undefined>(() => {
    if (!item) return undefined;
    const { purchaseOrders } = item;

    const unit = /*item.currency?.code || */ "DH"; // TODO
    const purchaseOrderProducts = purchaseOrders.reduce(
      (a, b) => [...a, ...b.purchaseOrderProducts],
      [] as PurchaseOrderProductModel[]
    );
    const paymentModalities = purchaseOrders
      // @ts-ignore
      .map(({ paymentModality }) => paymentModality["@title"])
      .join(", ");
    const orderNumber = purchaseOrders
      .map(({ orderNumber }) => orderNumber)
      .join(", ");
    const vendor = purchaseOrders.at(0)?.vendor as VendorModel;
    const {
      invoiceNumber,
      totalExclTax = 0,
      totalInclTax = 0,
      totalVatTax = 0,
      totalDiscount = 0,
      createdAt,
    } = item;

    const result: InvoicePrint = {
      ...item,
      currencyCode: unit,
      bill: invoiceNumber,
      orderNumber,
      paymentModality: {
        name: paymentModalities,
      },
      vendor,
      totalExclTax: getNumberUnit({ value: totalExclTax, precision: 2, unit }),
      totalInclTax: getNumberUnit({ value: totalInclTax, precision: 2 }),
      totalVatTax: getNumberUnit({ value: totalVatTax, precision: 2 }),
      totalDiscount: getNumberUnit({ value: totalDiscount, precision: 2 }),
      createdAt: moment(createdAt).format("L"),
      lines: purchaseOrderProducts.map((purchaseOrderProduct) => {
        const precision = 2;
        const {
          designation,
          note,
          discountType,
          discountValue,
          priceExclTax,
          vatRate,
          grossPrice,
          priceInclTax,
        } = purchaseOrderProduct;
        const isPercentCentDiscount = discountType === DiscountType.Percent;

        return {
          ...purchaseOrderProduct,
          type: LineType.Product,
          designation: `${designation}${note ? `\n\n${note}` : ""}`,
          netPriceExclTax: getNumberUnit({ value: priceExclTax, precision }),
          netPriceInclTax: getNumberUnit({ value: priceInclTax, precision }),
          discount: getNumberUnit({
            value: isPercentCentDiscount ? discountValue * 100 : discountValue,
            unit: isPercentCentDiscount ? "%" : unit,
            precision: isPercentCentDiscount ? 2 : precision,
          }),
          vatRate: getNumberUnit({
            value: vatRate * 100,
            unit: "%",
            precision,
          }),
          grossPrice: getNumberUnit({ value: grossPrice, precision }),
          // netPrice: getNumberUnit({value: netPrice, precision}),
        };
      }),
    };

    return result;
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
          <Trans id='PRINT' />
        </Button>
      </div>
      <Modal
        fullscreen
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          {isLoading && <Trans id='LOADING' />}
          {item && params && (
            <ReportViewer
              fileName='purchase-order-invoice.mrt'
              // fileName={item.taxIncluded ?
              //   'purchase-order-invoice-tax-included.mrt' :
              //   'purchase-order-invoice.mrt'
              // }
              // params={example}
              params={params}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
