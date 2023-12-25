import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import Model, {DiscountType} from './Model';
import {CellContent} from '../../../_custom/ListingView/views/Table/BodyCell';
import {SelectField} from '../../../_custom/Column/controls/fields/SelectField/SelectField';
import {useField, useFormikContext} from 'formik';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {Bullet} from '../../../_custom/components/Bullet';
import {NumberUnit} from '../../../_custom/components/NumberUnit';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {FieldProps} from '../../../_custom/Column/controls/fields';
import {useEffect} from 'react';
import {HydraItem} from '../../../_custom/types/hydra.types';
import {NumberColumnField} from '../../../_custom/Column/Number/NumberColumnField';
import {PrintButton} from '../PurchaseOrder/PrintButton';

type NetPriceProps =
  Pick<Model, 'grossPrice' | 'vatRate' | 'discountType' | 'discountValue'>
  & Pick<PurchaseOrderModel, 'taxIncluded'>

const getNetPrice = (item: NetPriceProps) => {
  const {taxIncluded, grossPrice, vatRate, discountType, discountValue} = item;
  if (!grossPrice) {
    return 0;
  }

  const amount = taxIncluded ?
    grossPrice / (1 + vatRate) :
    grossPrice;

  const discountAmount = discountType === DiscountType.Amount ?
    discountValue :
    amount * discountValue;

  return amount - discountAmount;
};

const AmountUnit = ({getValue, defaultValue = 0}: { defaultValue?: number, getValue: (taxIncluded: boolean) => number }) => {
  const formik = useFormikContext<Partial<PurchaseOrderModel>>();
  if (!formik) {
    return <NumberUnit value={defaultValue}/>;
  }

  const {values: {taxIncluded, currency}} = formik;
  if (typeof taxIncluded === 'undefined') {
    return <Bullet/>;
  }

  return (
    <NumberUnit
      value={getValue(taxIncluded)}
      unit={currency?.code}
    />
  );
};
type NetPriceExclTaxProps = NetPriceProps & Pick<Model, 'quantity'>
const getNetPriceExclTax = ({quantity, ...item}: NetPriceExclTaxProps) => getNetPrice(item) * quantity;
type PriceInclTaxProps = NetPriceProps & Pick<Model, 'quantity'>
const getPriceInclTax = (item: PriceInclTaxProps) => {
  const {taxIncluded, grossPrice, vatRate, quantity} = item;
  if (!vatRate) {
    return 0;
  }

  const netPriceExclTax = getNetPriceExclTax(item);

  return taxIncluded ?
    grossPrice * quantity :
    netPriceExclTax + netPriceExclTax * vatRate;
};

const ProductField = ({...props}: Pick<FieldProps, 'name'>) => {
  const {name} = props;
  const [{value: product}] = useField<HydraItem | null>({name});
  const [, , {setValue: setDesignation}] = useField({name: name.replace('product', 'designation')});
  const productName = product?.['@title'];
  useEffect(() => {
    setDesignation(productName || '');
  }, [productName]);

  return (
    <ModelAutocompleteField
      modelName={ModelEnum.Product}
      size='sm'
      {...props}
    />
  );
};
const mapping: ModelMapping<ModelEnum.PurchaseOrderProduct> = {
  modelName: ModelEnum.PurchaseOrderProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    designation: {
      type: ColumnTypeEnum.String
    },
    quantity:{
      type:ColumnTypeEnum.Number
    },
    grossPrice: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    note: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text
    },
    vatRate: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
      footer: () => <></>
    },
    discountType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: Object.values(DiscountType).map(id => ({id}))
    },
    discountValue: {
      type: ColumnTypeEnum.Number,
      precision: 2,
      footer: () => <></>
    },
    netPrice: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      footer: ({collection, value}) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={taxIncluded => collection.reduce(
            (a, item) => a + getNetPrice({...item, taxIncluded}),
            0
          )}
        />
      )
    },
    netPriceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      footer: ({collection, value}) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={taxIncluded => collection.reduce(
            (a, item) => a + getNetPriceExclTax({...item, taxIncluded}),
            0
          )}
        />
      )
    },
    priceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
      footer: ({collection, value}) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={taxIncluded => collection.reduce(
            (a, item) => a + getPriceInclTax({...item, taxIncluded}),
            0
          )}
        />
      )
    },
    product: {
      type: ModelEnum.Product
    },
    purchaseOrder: {
      type: ModelEnum.PurchaseOrder
    },
    desiredProducts: {
      type: ModelEnum.DesiredProduct,
      multiple: true,
      embeddedForm: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      bulkActions: [
        {render: props => <PrintButton selectedItems={props.selectedItems}/>}
      ],
      columns: {
        quantity: true,
        discountValue: {
          render: ({item: {discountType, discountValue, purchaseOrder}}) => (
            <CellContent
              value={discountValue}
              type={ColumnTypeEnum.Number}
              format={discountType === DiscountType.Amount ? NumberFormat.Amount : NumberFormat.Percent}
              unit={discountType === DiscountType.Amount ? purchaseOrder.currency?.code : '%'}
              precision={2}
            />
          )
        },
        grossPrice: true,
        netPrice: true,
        vatRate: true,
        netPriceExclTax: true,
        priceInclTax: true,
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        purchaseOrder: true,
        product: true,
        designation: true,
        quantity: true,
        discountValue: {
          render: ({item: {discountType, discountValue, purchaseOrder}}) => (
            <CellContent
              value={discountValue}
              type={ColumnTypeEnum.Number}
              format={discountType === DiscountType.Amount ? NumberFormat.Amount : NumberFormat.Percent}
              unit={discountType === DiscountType.Amount ? purchaseOrder.currency?.code : '%'}
              precision={2}
            />
          )
        },
        grossPrice: true,
        netPrice: true,
        vatRate: true,
        netPriceExclTax: true,
        priceInclTax: true,
        note: true,
        desiredProducts: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        desiredProducts: true,
        product: {
          render: ({fieldProps}) => (
            <ProductField {...fieldProps}/>
          )
        },
        designation: true,
        quantity: true,
        grossPrice: true,
        discountType: {
          defaultValue: DiscountType.Percent,
        },
        discountValue: {
          render: ({item, fieldProps}) => (
            <NumberColumnField
              format={item.discountType === DiscountType.Percent ? NumberFormat.Percent : NumberFormat.Amount}
              {...fieldProps}
              size='sm'
              hideAdornment
              min={0}
            />
          )
        },
        netPrice: {
          render: ({item}) => (
            <AmountUnit
              getValue={taxIncluded => getNetPrice({...item, taxIncluded})}
            />
          )
        },
        vatRate: {
          defaultValue: .2,
          render: ({item, fieldProps}) => (
            <SelectField
              size='sm'
              options={[0, .07, .1, .14, .2]}
              getOptionLabel={varRate => `${(varRate * 100).toFixed(0)} %`}
              placeholder='TVA'
              {...fieldProps}
            />
          )
        },
        netPriceExclTax: {
          render: ({item}) => (
            <AmountUnit
              getValue={taxIncluded => getNetPriceExclTax({...item, taxIncluded})}
            />
          )
        },
        priceInclTax: {
          render: ({item}) => (
            <AmountUnit
              getValue={taxIncluded => getPriceInclTax({...item, taxIncluded})}
            />
          )
        },
      }
    }
  ]
};

export default mapping;
