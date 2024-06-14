import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import moment from "moment";
import { InvoiceModel } from "../Invoice";
import { NestedArrayField } from "../../../_core/Column/Model/Nested/NestedArrayField";
import { ModelEnum } from "../types";
import { CreateViewType, ViewEnum } from "../../../_core/types/ModelMapping";

const PaymentTermsField: React.FC<any> = ({ fieldProps }) => {
  const { values, setFieldValue } = useFormikContext<InvoiceModel>();

  useEffect(() => {
    // Create a payment term for each purchase order
    const paymentTerms = values.purchaseOrders.map((purchaseOrder) => ({
      amount: purchaseOrder.totalInclTax,
      date: moment().add(60, "days").format(),
    }));
    setFieldValue("paymentTerms", paymentTerms);
  }, [values.purchaseOrders, setFieldValue]);

  return (
    <NestedArrayField
      {...fieldProps}
      modelName={ModelEnum.PaymentTerm}
      disabled={values.purchaseOrders.length === 0}
      view={
        {
          type: ViewEnum.Create,
          fields: {
            amount: true,
            date: true,
          },
        } as CreateViewType<ModelEnum.PaymentTerm>
      }
    />
  );
};

export default PaymentTermsField;
