import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';


const mapping: ModelMapping<ModelEnum.VendorOffer> = {
  modelName: ModelEnum.VendorOffer,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    status: {
      type: ColumnTypeEnum.Boolean,
    },
    receiveAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    quoteDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    VATIncluded: {
      type: ColumnTypeEnum.Boolean
    },
    quoteNumber: {
      type: ColumnTypeEnum.Number,
    },
    note: {
      type: ColumnTypeEnum.String
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    vendorOfferProducts: {
      type: ModelEnum.VendorOffer,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        vendor: true,
        note: true,
        devisNumber: true,
        devisDate: true,
        receiveAt: true,
        vatIncluded: true,
        status: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        vendor: true,
        note: true,
        devisNumber: true,
        devisDate: true,
        receiveAt: true,
        vatIncluded: true,
        status: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        note: true,
        vatIncluded: true,
        status: true,
      }
    }
  ]
};

export default mapping;
