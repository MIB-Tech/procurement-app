import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";
import { number } from "yup";
import { QUANTITY_STATUS_OPTIONS } from "../PurchaseOrder/Model";
import { ModelAutocompleteField } from "../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField";
import { FieldProps } from "../../../_custom/Column/controls/fields";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_custom/ListingView/Filter/Filter.types";
import { useFormikContext } from "formik";
import { PurchaseOrderModel } from "../PurchaseOrder";

const DeliveryDepotField = ({ ...props }: FieldProps) => {
  const {
    values: { clinic },
  } = useFormikContext<Partial<PurchaseOrderModel>>();

  return (
    <ModelAutocompleteField
      modelName={ModelEnum.DeliveryDepot}
      {...props}
      size='sm'
      getParams={(filter) => {
        if (!clinic) return filter;
        const _filter: CompoundFilter<ModelEnum.DeliveryDepot> = {
          operator: CompoundFilterOperator.And,
          filters: [
            filter,
            {
              property: "clinic",
              operator: PropertyFilterOperator.Equal,
              value: clinic?.id,
            },
          ],
        };
        return _filter;
      }}
    />
  );
};

const mapping: ModelMapping<ModelEnum.DesiredProduct> = {
  modelName: ModelEnum.DesiredProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    designation: {
      type: ColumnTypeEnum.String,
      max: 1000,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      title: "RECEIVED_QUANTITY",
      schema: number().positive(),
    },
    restQuantity: {
      type: ColumnTypeEnum.Number,
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      title: "DELIVERY_STATUS",
      options: QUANTITY_STATUS_OPTIONS,
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct,
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct,
    },
    deliveryDepot: {
      type: ModelEnum.DeliveryDepot,
      nullable: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        deliveryDepot: true,
        quantity: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        designation: true,
        quantity: true,
        deliveryDepot: {
          render: ({ fieldProps }) => <DeliveryDepotField {...fieldProps} />,
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        designation: true,
        quantity: true,
        deliveryDepot: {
          render: ({ fieldProps }) => <DeliveryDepotField {...fieldProps} />,
        },
      },
    },
  ],
};
export default mapping;
