import { FieldProps } from "../../../../_core/Column/controls/fields";
import { useFormikContext } from "formik";
import { Model } from "../../../../_core/types/ModelMapping";
import { ModelEnum } from "../../types";
import { useCollectionQuery } from "../../../../_core/hooks/UseCollectionQuery";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../../_core/ListingView/Filter/Filter.types";
import { ModelAutocompleteField } from "../../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import { ValidationStatusEnum } from "../../PurchaseOrder/Model";
import { Button } from "../../../../_core/components/Button";
import { Trans } from "../../../../_core/components/Trans";
import React from "react";

export const PurchaseOrdersField = ({ name }: FieldProps) => {
  const formik = useFormikContext<Model<ModelEnum.Receipt>>();
  const { values, setFieldValue } = formik;
  const { vendor, purchaseOrders } = values;
  const { isLoading, refetch } = useCollectionQuery<ModelEnum.ReceiptProduct>({
    modelName: ModelEnum.ReceiptProduct,
    params: {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: "purchaseOrderProduct.purchaseOrder",
            operator: PropertyFilterOperator.In,
            value: purchaseOrders,
          },
          {
            property: "receipt",
            operator: PropertyFilterOperator.IsNull,
          },
        ],
      },
    },
    options: { enabled: false },
  });

  return (
    <div className='d-flex gap-3'>
      <div className='flex-grow-1'>
        <ModelAutocompleteField
          size='sm'
          modelName={ModelEnum.PurchaseOrder}
          multiple
          disabled={!vendor && purchaseOrders.length === 0}
          name={name}
          getParams={(filter) => {
            const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
              operator: CompoundFilterOperator.And,
              filters: [
                filter,
                {
                  property: "vendor",
                  operator: PropertyFilterOperator.Equal,
                  value: vendor,
                },
                {
                  property: "validationStatus",
                  operator: PropertyFilterOperator.Equal,
                  value: ValidationStatusEnum.Validated,
                },
                {
                  property: "invoice",
                  operator: PropertyFilterOperator.IsNull,
                },
              ],
            };
            return newFilter;
          }}
        />
      </div>
      <div>
        <Button
          size='sm'
          variant='primary'
          disabled={purchaseOrders.length === 0}
          loading={isLoading}
          loadingLabel='SHOW'
          onClick={async () => {
            const { data } = await refetch();
            const receiptProducts = data?.data["hydra:member"] || [];
            await setFieldValue(
              "receiptProducts",
              receiptProducts.map((receiptProduct) => ({
                ...receiptProduct,
                initialQuantity: receiptProduct.quantity,
                components: [],
              }))
            );
          }}
        >
          <Trans id='SHOW' />
        </Button>
      </div>
    </div>
  );
};
