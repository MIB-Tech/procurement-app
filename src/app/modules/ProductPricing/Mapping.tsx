import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';


const mapping: ModelMapping<ModelEnum.ProductPricing> = {
  modelName: ModelEnum.ProductPricing,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    applicatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date
    },
    bidPriceInclTax: {
      type: ColumnTypeEnum.Number
    },
    discountValue: {
      type: ColumnTypeEnum.Number
    },
    purchasePriceExclTax: {
      type: ColumnTypeEnum.Number
    },
    purchasePriceInclTax: {
      type: ColumnTypeEnum.Number
    },
    vendor: {
      type: ModelEnum.Vendor
    },
    product: {
      type: ModelEnum.Product
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        product: true,
        vendor: true,
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        applicatedAt: true,
        discountValue: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        vendor: true,
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
        applicatedAt: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: true,
        vendor: true,
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
        applicatedAt: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        product: true,
        vendor: true,
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
        applicatedAt: true,
      }
    }

  ]
};

export default mapping;
