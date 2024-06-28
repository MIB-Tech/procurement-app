import {
  CreateViewType,
  ModelMapping,
  UpdateViewType,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { NestedArrayField } from "../../../_core/Column/Model/Nested/NestedArrayField";

const mapping: ModelMapping<ModelEnum.Vendor> = {
  modelName: ModelEnum.Vendor,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    code: {
      type: ColumnTypeEnum.String,
    },
    ice: {
      type: ColumnTypeEnum.String,
    },
    email: {
      type: ColumnTypeEnum.String,
    },
    phoneNumber: {
      type: ColumnTypeEnum.String,
    },
    secondaryPhoneNumber: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    defaultAddress: {
      type: ModelEnum.VendorAddress,
    },
    productPricing: {
      type: ModelEnum.ProductPricing,
      multiple: true,
    },
    addresses: {
      type: ModelEnum.VendorAddress,
      multiple: true,
      embeddedForm: true,
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
      nullable: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        code: true,
        ice: true,
        phoneNumber: true,
      },
    },
    {
      type: ViewEnum.Create,
      slotProps: { item: { sm: 4 } },
      fields: {
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        paymentModality: true,
        addresses: {
          slotProps: { root: { sm: 12 } },
        },
        // addresses: {
        //   render: ({fieldProps}) => (
        //     <NestedArrayField
        //       modelName={ModelEnum.VendorAddress}
        //       name={name}
        //       view={{
        //         type: ViewEnum.Create,
        //         fields: {
        //           address: true,
        //           postalCode: true,
        //           cityName: true,
        //           isMain: true
        //         }
        //       } as CreateViewType<ModelEnum.VendorAddress>}
        //     />
        //   )
        // },
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: { item: { sm: 4 } },
      fields: {
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        paymentModality: true,
        addresses: {
          slotProps: { root: { sm: 12 } },
        },
        // addresses: {
        //   render: ({fieldProps}) => (
        //     <NestedArrayField
        //       modelName={ModelEnum.VendorAddress}
        //       name={name}
        //       view={{
        //         type: ViewEnum.Update,
        //         fields: {
        //           address: true,
        //           postalCode: true,
        //           cityName: true,
        //           isMain: true
        //         }
        //       } as UpdateViewType<ModelEnum.VendorAddress>}
        //     />
        //   )
        // },
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        addresses: true,
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        productPricing: true,
        paymentModality: true,
      },
    },
  ],
};

export default mapping;
