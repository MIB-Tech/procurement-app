import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.VendorOffer> = {
  modelName: ModelEnum.VendorOffer,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    status: {
      type: ColumnTypeEnum.String,
    },
    receiveAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
    },
    quoteDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
    },
    VATIncluded: {
      type: ColumnTypeEnum.Boolean,
    },
    quoteNumber: {
      type: ColumnTypeEnum.Number,
    },
    note: {
      type: ColumnTypeEnum.String,
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    vendorOfferProducts: {
      type: ModelEnum.VendorOffer,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        vendor: true,
        note: true,
        quoteDate: true,
        quoteNumber: true,
        receiveAt: true,
        status: true,
        VATIncluded: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        vendor: true,
        note: true,
        quoteDate: true,
        quoteNumber: true,
        receiveAt: true,
        status: true,
        VATIncluded: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        note: true,
        vatIncluded: true,
        status: true,
      },
    },
  ],
};

export default mapping;
