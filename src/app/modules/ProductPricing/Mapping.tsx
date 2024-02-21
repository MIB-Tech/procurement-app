import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';


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
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0
      }
    },
    discountValue: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
      precision: 2
    },
    purchasePriceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0
      }
    },
    purchasePriceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0
      }
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
      slotProps: {item: {sm: 3}},
      fields: {
        product: {slotProps: {root: {sm: 4}}},
        vendor: {slotProps: {root: {sm: 4}}},
        applicatedAt: {slotProps: {root: {sm: 4}}},
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
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
