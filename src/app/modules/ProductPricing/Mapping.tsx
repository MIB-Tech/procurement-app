import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import {
  DateFormatEnum,
  StringFormat,
} from "../../../_core/Column/String/StringColumn";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.ProductPricing> = {
  modelName: ModelEnum.ProductPricing,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    applicatedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      dateFormat: DateFormatEnum.Local,
    },
    bidPriceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0,
      },
    },
    discountValue: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
      precision: 7,
    },
    purchasePriceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0,
      },
    },
    purchasePriceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      validation: {
        min: 0,
      },
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    product: {
      type: ModelEnum.Product,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      filterColumns: {
        product: {
          quickFilter: true,
        },
        vendor: {
          quickFilter: true,
        },
        applicatedAt: true,
      },
      columns: {
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        applicatedAt: true,
        discountValue: true,
        product: {
          render: (props) => {
            return props.item.product.designation;
          },
        },
      },
    },
    {
      type: ViewEnum.Create,
      slotProps: { item: { sm: 3 } },
      fields: {
        product: { slotProps: { root: { sm: 4 } } },
        vendor: { slotProps: { root: { sm: 4 } } },
        applicatedAt: { slotProps: { root: { sm: 4 } } },
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: { item: { sm: 3 } },
      fields: {
        product: { slotProps: { root: { sm: 4 } } },
        vendor: { slotProps: { root: { sm: 4 } } },
        applicatedAt: { slotProps: { root: { sm: 4 } } },
        purchasePriceExclTax: true,
        purchasePriceInclTax: true,
        bidPriceInclTax: true,
        discountValue: true,
      },
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
      },
    },
  ],
};

export default mapping;
