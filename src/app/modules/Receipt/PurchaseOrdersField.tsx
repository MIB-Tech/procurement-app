import { FieldProps } from "../../../_core/Column/controls/fields";
import { useFormikContext } from "formik";
import { Model } from "../../../_core/types/ModelMapping";
import { ModelEnum } from "../types";
import { useCollectionQuery } from "../../../_core/hooks/UseCollectionQuery";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_core/ListingView/Filter/Filter.types";
import { ModelAutocompleteField } from "../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import { ValidationStatusEnum } from "../PurchaseOrder/Model";
import { Button } from "../../../_core/components/Button";
import { HydraItem } from "../../../_core/types/hydra.types";
import { RecursivePartial } from "../../../_core/types/types";
import { ReceiptProductModel } from "../ReceiptProduct";
import { Trans } from "../../../_core/components/Trans";
import React from "react";

export const PurchaseOrdersField = ({ name }: FieldProps) => {
  const { values, setFieldValue } =
    useFormikContext<Model<ModelEnum.Receipt>>();
  const { vendor, purchaseOrders } = values;
  const { isLoading, refetch } = useCollectionQuery<ModelEnum.DesiredProduct>({
    modelName: ModelEnum.DesiredProduct,
    params: {
      filter: {
        property: "purchaseOrderProduct.purchaseOrder",
        operator: PropertyFilterOperator.In,
        value: purchaseOrders,
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
            const r = await refetch();
            const desiredProducts = r.data?.data["hydra:member"] as Array<
              HydraItem<ModelEnum.DesiredProduct>
            >;
            const receiptProducts: Array<
              RecursivePartial<ReceiptProductModel>
            > = desiredProducts.map((desiredProduct) => ({
              desiredProduct,
              quantity: desiredProduct.restQuantity,
              note: "",
              desiredProductQuantity: desiredProduct.quantity,
              components: desiredProduct.purchaseOrderProduct.components.map(
                (component) => ({
                  quantity: component.restQuantity,
                  restQuantity: component.restQuantity,
                  purchaseOrderProductComponent: component,
                })
              ),
            }));
            await setFieldValue("receiptProducts", receiptProducts);
          }}
        >
          <Trans id='SHOW' />
        </Button>
      </div>
    </div>
  );
};
