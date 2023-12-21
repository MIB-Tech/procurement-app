import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


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
      format: StringFormat.Datetime
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
    product:{
      type:ModelEnum.Product
    }
  }
};

export default mapping;
