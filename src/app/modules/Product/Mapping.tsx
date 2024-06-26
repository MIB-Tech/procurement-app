import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { SelectField } from "../../../_core/Column/controls/fields/SelectField/SelectField";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import { PRODUCT_TYPES, ProductTypeEnum } from "./Model";
import React from "react";
import { FieldProps } from "../../../_core/Column/controls/fields";
import { useTrans } from "../../../_core/components/Trans";
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_core/ListingView/Filter/Filter.types";
import { VatRateSelectField } from "../VatRate/components/VatRateSelectField";
import { ModelAutocompleteField } from "../../../_core/Column/Model/Autocomplete/ModelAutocompleteField";
import { I18nMessageKey } from "../../../_core/i18n/I18nMessages";

const ProductTypeField = (props: FieldProps & { disabled?: boolean }) => {
  const { trans } = useTrans();

  return (
    <SelectField
      options={PRODUCT_TYPES.map((productType) => productType.id)}
      getOptionLabel={(option) =>
        trans({
          id:
            PRODUCT_TYPES.find((o) => o.id === option)?.label ||
            (option as I18nMessageKey),
        })
      }
      getOptionVariant={(option) =>
        PRODUCT_TYPES.find((o) => o.id === option)?.color
      }
      {...props}
      size='sm'
    />
  );
};

const SubCategoryField = ({ ...props }: FieldProps) => (
  <ModelAutocompleteField
    modelName={ModelEnum.Category}
    {...props}
    size='sm'
    getParams={(filter) => {
      const _filter: CompoundFilter<ModelEnum.Category> = {
        operator: CompoundFilterOperator.And,
        filters: [
          filter,
          {
            property: "parent",
            operator: PropertyFilterOperator.IsNotNull,
          },
        ],
      };

      return _filter;
    }}
  />
);

const mapping: ModelMapping<ModelEnum.Product> = {
  modelName: ModelEnum.Product,
  // hydraTitle: (item)=>(
  //   <div className='text-truncate mw-600px'>
  //     {item['@title']}
  //   </div>
  // ),
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    designation: {
      type: ColumnTypeEnum.String,
      validation: {
        max: 1500,
      },
    },
    code: {
      type: ColumnTypeEnum.String,
    },
    ref: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true,
      format: StringFormat.Text,
    },
    measurementUnit: {
      type: ColumnTypeEnum.String,
    },
    accountingAccount: {
      type: ColumnTypeEnum.String,
    },
    mobilised: {
      type: ColumnTypeEnum.Boolean,
    },
    stockable: {
      type: ColumnTypeEnum.Boolean,
    },
    vatRate: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
    },
    category: {
      type: ModelEnum.Category,
      nullable: true,
      title: "SUB_CATEGORY",
    },
    components: {
      type: ModelEnum.Component,
      multiple: true,
      embeddedForm: true,
    },
    parentComponents: {
      type: ModelEnum.Component,
      multiple: true,
    },
    purchaseNeedProducts: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true,
    },
    pricing: {
      type: ModelEnum.ProductPricing,
      multiple: true,
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true,
    },
    section: {
      type: ModelEnum.ProductSection,
      nullable: true,
    },
    productType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: PRODUCT_TYPES,
      nullable: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        category: true,
        measurementUnit: true,
        vatRate: true,
        mobilised: true,
        stockable: true,
        section: true,
      },
    },
    {
      type: ViewEnum.Create,
      slotProps: { item: { sm: 4, md: 3, lg: 2 } },
      fields: {
        productType: {
          defaultValue: ProductTypeEnum.Simple,
          render: ({ inputProps, metaProps }) => (
            <ProductTypeField
              {...inputProps}
              disabled={!!metaProps.value.components?.length}
            />
          ),
        },
        designation: {
          slotProps: { root: { sm: 8, md: 6, lg: 4 } },
        },
        accountingAccount: true,
        measurementUnit: {
          defaultValue: "U",
        },
        vatRate: {
          defaultValue: 0.2,
          render: ({ inputProps }) => <VatRateSelectField {...inputProps} />,
        },
        ref: true,
        category: {
          render: ({ inputProps }) => <SubCategoryField {...inputProps} />,
        },
        section: true,
        mobilised: {
          slotProps: { root: { sm: 2, md: 1.5, lg: 1 } },
        },
        stockable: {
          slotProps: { root: { sm: 2, md: 1.5, lg: 1 } },
        },
        note: {
          slotProps: { root: { sm: 12, md: 12, lg: 12 } },
        },
        components: {
          display: ({ item }) => item.productType === ProductTypeEnum.Combined,
          slotProps: { root: { sm: 12, md: 12, lg: 12 } },
        },
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: { item: { sm: 4, md: 3, lg: 2 } },
      fields: {
        designation: {
          slotProps: { root: { sm: 8, md: 6, lg: 4 } },
        },
        accountingAccount: true,
        measurementUnit: true,
        vatRate: {
          render: ({ inputProps }) => <VatRateSelectField {...inputProps} />,
        },
        ref: true,
        category: true,
        section: true,
        mobilised: {
          slotProps: { root: { sm: 2, md: 1.5, lg: 1 } },
        },
        stockable: {
          slotProps: { root: { sm: 2, md: 1.5, lg: 1 } },
        },
        note: {
          slotProps: { root: { sm: 12, md: 12, lg: 12 } },
        },
        components: {
          display: ({ item }) => item.productType === ProductTypeEnum.Combined,
          slotProps: { root: { sm: 12, md: 12, lg: 12 } },
        },
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        code: true,
        designation: true,
        note: true,
        category: true,
        section: true,
        measurementUnit: true,
        vatRate: true,
        mobilised: true,
        stockable: true,
        pricing: true,
        components: true,
      },
    },
  ],
};

export default mapping;
