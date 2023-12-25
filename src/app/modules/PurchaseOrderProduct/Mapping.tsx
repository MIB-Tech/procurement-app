import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {NumberFormat} from '../../../_custom/Column/Number/NumberColumn';
import Model, {DiscountType} from './Model';
import {CellContent} from '../../../_custom/ListingView/views/Table/BodyCell';
import {SelectField} from '../../../_custom/Column/controls/fields/SelectField/SelectField';
import {useFormikContext} from 'formik';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {Bullet} from '../../../_custom/components/Bullet';
import {NumberUnit} from '../../../_custom/components/NumberUnit';

type NetPriceProps =
  Pick<Model, 'grossPrice' | 'vatRate' | 'discountType' | 'discountValue'>
  & Pick<PurchaseOrderModel, 'taxIncluded'>

const getNetPrice = (item: NetPriceProps) => {
  const {taxIncluded, grossPrice, vatRate, discountType, discountValue} = item;

  const amount = taxIncluded ?
    grossPrice / (1 + vatRate) :
    grossPrice;

  const discountAmount = discountType === DiscountType.Amount ?
    discountValue :
    amount * discountValue;

  return amount - discountAmount;
};


const NetPrice = (item: Omit<NetPriceProps, 'taxIncluded'>) => {
  const {values: {taxIncluded, currency}} = useFormikContext<Partial<PurchaseOrderModel>>();
  if (typeof taxIncluded === 'undefined') {
    return <Bullet/>;
  }

  return (
    <NumberUnit
      value={getNetPrice({...item, taxIncluded})}
      unit={currency?.code}
    />
  );
};


type NetPriceExclTaxProps = NetPriceProps & Pick<Model, 'quantity'>
const getNetPriceExclTax = ({quantity, ...item}: NetPriceExclTaxProps) => getNetPrice(item) * quantity;
const NetPriceExclTax = (item: Omit<NetPriceExclTaxProps, 'taxIncluded'>) => {
  const {values: {taxIncluded, currency}} = useFormikContext<Partial<PurchaseOrderModel>>();
  if (typeof taxIncluded === 'undefined') {
    return <Bullet/>;
  }

  return (
    <NumberUnit
      value={getNetPriceExclTax({...item, taxIncluded})}
      unit={currency?.code}
    />
  );
};
//
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
const PriceInclTax = (item: Omit<NetPriceExclTaxProps, 'taxIncluded'>) => {
  const {values: {taxIncluded, currency}} = useFormikContext<Partial<PurchaseOrderModel>>();
  if (typeof taxIncluded === 'undefined') {
    return <Bullet/>;
  }

  return (
    <NumberUnit
      value={getPriceInclTax({...item, taxIncluded})}
      unit={currency?.code}
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
    quantity: {
      type: ColumnTypeEnum.Number
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
    },
    netPriceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    status: {
      type: ColumnTypeEnum.Boolean
    },
    vatTax: {
      type: ColumnTypeEnum.Boolean
    },
    priceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 2,
    },
    product: {
      type: ModelEnum.Product
    },
    purchaseOrder: {
      type: ModelEnum.PurchaseOrder
    },
    desiredProducts: {
      type: ModelEnum.DesiredProduct,
      multiple: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        quantity: true,
        discountValue: {
          render: ({item: {discountType, discountValue, purchaseOrder}}) => (
            <CellContent
              value={discountValue}
              type={ColumnTypeEnum.Number}
              format={discountType === DiscountType.Amount ? NumberFormat.Amount : NumberFormat.Percent}
              unit={discountType === DiscountType.Amount ? purchaseOrder.currency.code : '%'}
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
              unit={discountType === DiscountType.Amount ? purchaseOrder.currency.code : '%'}
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
        product: true,
        designation: true,
        quantity: true,
        discountType: {
          defaultValue: DiscountType.Percent,
        },
        discountValue: true,
        grossPrice: true,
        netPrice: {
          render: ({item}) => <NetPrice {...item}/>
        },
        vatRate: {
          defaultValue: .2,
          render: ({item}) => (
            <SelectField
              size='sm'
              name='vatRate'
              options={[0, .07, .1, .14, .2]}
              getOptionLabel={varRate => `${(varRate * 100).toFixed(0)} %`}
            />
          )
        },
        netPriceExclTax: {
          render: ({item}) => <NetPriceExclTax {...item} />
        },
        priceInclTax: {
          render: ({item}) => <PriceInclTax {...item}/>
        },
      }
    }
  ]
};

export default mapping;
