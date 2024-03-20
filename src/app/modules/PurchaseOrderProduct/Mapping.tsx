import {
  ColumnMapping,
  CreateViewType,
  FormFields,
  ModelMapping,
  UpdateViewType,
  ViewEnum
} from '../../../_custom/types/ModelMapping';
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
import {NumberColumnField} from '../../../_custom/Column/Number/NumberColumnField';
import {QUANTITY_STATUS_OPTIONS} from '../PurchaseOrder/Model';
import {number} from 'yup';
import {DesiredProductModel} from '../DesiredProduct';
import {NestedArrayField} from '../../../_custom/Column/Model/Nested/NestedArrayField';
import {PurchaseOrderProductComponentModel} from '../PurchaseOrderProductComponent';
import {ProductField} from './ProductField';
import {useCollectionQuery} from "../../../_custom/hooks/UseCollectionQuery";
import {PropertyFilterOperator} from "../../../_custom/ListingView/Filter/Filter.types";



const AmountUnit = ({getValue, defaultValue = 0}: {
  defaultValue?: number,
  getValue: (taxIncluded: boolean) => number
}) => {
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
type NetPriceProps = Pick<Model, 'grossPrice' | 'vatRate' | 'discountType' | 'discountValue'>
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
type PriceExclTaxProps = NetPriceProps & Pick<Model, 'quantity'>
const getPriceExclTax = ({quantity, ...item}: PriceExclTaxProps) => getNetPrice(item) * quantity;
type PriceInclTaxProps = NetPriceProps & Pick<Model, 'quantity'>
const getPriceInclTax = (item: PriceInclTaxProps) => {
  const {taxIncluded, grossPrice, vatRate, quantity, discountType, discountValue} = item;
  if (!vatRate) return getPriceExclTax(item);

  const priceExclTax = getPriceExclTax(item);
  const discountAmount = discountType === DiscountType.Amount ?
    discountValue :
    grossPrice * discountValue;

  return taxIncluded ?
    (grossPrice - discountAmount) * quantity :
    priceExclTax + priceExclTax * vatRate;
};


const DesiredProductsField = ({...fieldProps}: FieldProps) => {
  const {values: purchaseOrder} = useFormikContext<Partial<PurchaseOrderModel>>();
  const {collection: deliveryDepots} = useCollectionQuery<ModelEnum.DeliveryDepot>({
    modelName: ModelEnum.DeliveryDepot,
    params: {
      itemsPerPage: 1,
      filter: {
        property: 'clinic',
        operator: PropertyFilterOperator.Equal,
        value: purchaseOrder.clinic?.id
      }
    }
  })

  const index = fieldProps.name.split('.').at(1);

  return (
    <NestedArrayField
      {...fieldProps}
      modelName={ModelEnum.DesiredProduct}
      extraAttribute={{
        designation: index && purchaseOrder.purchaseOrderProducts?.[parseInt(index)].designation,
        deliveryDepot: deliveryDepots.at(0)
      }}
    />
  );
};

const QuantityField = ({...props}: Pick<FieldProps, 'name'>) => {
  const {name} = props;
  const [field] = useField({name});
  const [{value: desiredProducts}, , {setValue: setDesiredProducts}] = useField<Array<Partial<DesiredProductModel>>>({name: name.replace('quantity', 'desiredProducts')});
  const [{value: components}, , {setValue: setComponents}] = useField<Array<Partial<PurchaseOrderProductComponentModel>>>({name: name.replace('quantity', 'components')});

  return (
    <NumberColumnField
      {...props}
      size='sm'
      onChange={async (event) => {
        field.onChange(event);

        const quantity = event.target.value as unknown as number;
        if (desiredProducts.length === 1) {
          await setDesiredProducts([{...desiredProducts.at(0), quantity}]);
        }
        await setComponents(components.map(component => ({
          ...component,
          quantity: quantity * (component.componentQuantity || 1)
        })));
      }}
    />
  );
};

const formFields: FormFields<ModelEnum.PurchaseOrderProduct> = {
  product: {
    render: ({fieldProps}) => <ProductField {...fieldProps}/>
  },
  designation: true,
  quantity: {
    render: ({fieldProps, item}) => (
      <QuantityField {...fieldProps} />
    )
  },
  grossPrice: {
    render: ({item}) => <NumberUnit value={item.grossPrice} />
  },
  note: true,
  discountType: {
    defaultValue: DiscountType.Percent,
  },
  discountValue: {
    render: ({item, fieldProps}) => (
      <NumberColumnField
        format={item.discountType === DiscountType.Percent ? NumberFormat.Percent : NumberFormat.Amount}
        {...fieldProps}
        size='sm'
        min={0}
        precision={5}
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
  priceExclTax: {
    render: ({item}) => (
      <AmountUnit
        getValue={taxIncluded => getPriceExclTax({...item, taxIncluded})}
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
  desiredProducts: {
    display: ({item}) => !!item.product,
    render: ({fieldProps}) => <DesiredProductsField {...fieldProps}/>
  },
  components: {
    display: () => false, // TODO
    render: ({item, fieldProps}) => {
      const view: CreateViewType<ModelEnum.PurchaseOrderProductComponent> | UpdateViewType<ModelEnum.PurchaseOrderProductComponent> = {
        type: item.id ? ViewEnum.Update : ViewEnum.Create,
        fields: {
          product: {
            render: ({fieldProps}) => (
              <div className='mw-250px'>
                <ModelAutocompleteField
                  modelName={ModelEnum.Product}
                  size='sm'
                  {...fieldProps}
                  disabled
                />
              </div>
            )
          },
          designation: true,
          quantity: true,
        }
      };

      return (
        <NestedArrayField
          modelName={ModelEnum.PurchaseOrderProductComponent}
          {...fieldProps}
          disableInsert
          view={view}
        />
      );
    }
  }
};

export const QUANTITY_STATUS_COLUMN: ColumnMapping<ModelEnum.PurchaseOrderProduct> = {
  type: ColumnTypeEnum.String,
  format: StringFormat.Select,
  readOnly: true,
  title: 'DELIVERY_STATUS',
  options: QUANTITY_STATUS_OPTIONS
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
      type: ColumnTypeEnum.Number,
      schema: number()
        .positive()
        .test(
          'is-valid',
          'VALIDATION.PURCHASE_ORDER_PRODUCT.QUANTITY',
          (quantity, context) => {
            const {desiredProducts} = context.parent as Model;
            const count = desiredProducts.reduce(
              (count, desiredProduct) => count + desiredProduct.quantity,
              0
            );
            return count === quantity;
          }
        )
    },
    grossPrice: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      precision: 5,
      footer: () => <Bullet/>,
      title: 'UNIT_PRICE',
    },
    note: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
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
      precision: 5,
      footer: () => <></>
    },
    priceExclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      readOnly: true,
      precision: 2,
      nullable: true,
      footer: ({collection, value}) => (
        <AmountUnit
          defaultValue={value as number}
          getValue={taxIncluded => collection.reduce(
            (a, item) => a + getPriceExclTax({...item, taxIncluded}),
            0
          )}
        />
      )
    },
    status: QUANTITY_STATUS_COLUMN,
    vatTax: {
      type: ColumnTypeEnum.Boolean,
      readOnly: true,
    },
    priceInclTax: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      readOnly: true,
      precision: 2,
      nullable: true,
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
      embeddedForm: true,
    },
    components: {
      type: ModelEnum.PurchaseOrderProductComponent,
      multiple: true,
      embeddedForm: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      // bulkActions: [
      //   {render: props => <PrintButton selectedItems={props.selectedItems}/>}
      // ],
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
        vatRate: true,
        priceExclTax: true,
        priceInclTax: true,
        status: true,
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
        vatRate: true,
        priceExclTax: true,
        priceInclTax: true,
        note: true,
        desiredProducts: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: formFields
    },
    {
      type: ViewEnum.Update,
      fields: formFields
    }
  ]
};
export default mapping;
