import {FieldProps} from '../../../_custom/Column/controls/fields';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {useField, useFormikContext} from 'formik';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {HydraItem, JsonldCollectionResponse} from '../../../_custom/types/hydra.types';
import {DesiredProductModel} from '../DesiredProduct';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {ModelEnum} from '../types';
import axios from 'axios';
import {getRoutePrefix} from '../../../_custom/utils';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilter,
  PropertyFilterOperator
} from '../../../_custom/ListingView/Filter/Filter.types';
import {filterToParams, serializeSort} from '../../../_custom/ListingView/Filter/Filter.utils';
import {PurchaseOrderProductComponentModel} from '../PurchaseOrderProductComponent';
import {PurchaseOrderProductModel} from './index';
import {DiscountType} from './Model';

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export const ProductField = ({...props}: Pick<FieldProps, 'name'>) => {
  const {clinic} = useAuth();
  const {name} = props;
  const {values: purchaseOrder, setFieldValue} = useFormikContext<Partial<PurchaseOrderModel>>();
  const {taxIncluded, vendor} = purchaseOrder;
  const [, , {setValue: setPurchaseOrderProduct}] = useField<HydraItem | null>({name: name.replace('.product', '')});
  // TODO GENERATE
  const initialValues: PartialNullable<PurchaseOrderProductModel> = {
    product: null,
    designation: '',
    quantity: 0,
    grossPrice: 0,
    note: '',
    discountType: DiscountType.Percent,
    discountValue: 0,
    vatRate: 0.2,
    netPriceExclTax: 0,
    priceInclTax: 0,
    desiredProducts: [],
    components: []
  };

  const setValue = async (suffix: string, value: any) => {
    await setFieldValue(name.replace('product', suffix), value);
  };

  return (
    <div className='mw-250px'>
      <ModelAutocompleteField
        modelName={ModelEnum.Product}
        size='sm'
        onChange={async (event, value) => {
          if (Array.isArray(value)) return;
          await setPurchaseOrderProduct(initialValues);
          if (!value) return;

          await setValue('product', value);
          //
          const productId = value.id;
          const productUri = value['@id'];
          const detailedProduct = await axios.get<HydraItem<ModelEnum.Product>>(productUri).then(r => r.data);
          const {designation} = detailedProduct;
          await setValue('designation', designation);
          await setValue('note', detailedProduct.note);
          await setValue('vatRate', detailedProduct.vatRate);
          const desiredProduct: Partial<DesiredProductModel> = {
            designation,
            quantity: 0,
            address: clinic?.['@title'] || 'AKDITAL HOLDING'
          };
          await setValue('desiredProducts', [desiredProduct]);
          // pricing
          const pricingUri = getRoutePrefix(ModelEnum.ProductPricing);
          const pricingFilter: CompoundFilter<ModelEnum.ProductPricing> = {
            operator: CompoundFilterOperator.And,
            filters: [
              {
                property: 'product',
                operator: PropertyFilterOperator.Equal,
                value: productId
              },
              {
                property: 'vendor',
                operator: PropertyFilterOperator.Equal,
                value: vendor?.id
              }
            ]
          };
          const pricing = await axios.get<JsonldCollectionResponse<ModelEnum.ProductPricing>>(
            pricingUri,
            {
              params: {
                itemsPerPage: 1,
                ...serializeSort({applicatedAt: 'desc'}),
                ...filterToParams(pricingFilter, 'filter', ModelEnum.ProductPricing)
              }
            }
          ).then(r => r.data['hydra:member'].at(0));
          if (pricing) {
            await setValue('grossPrice', taxIncluded ? pricing.purchasePriceInclTax : pricing.purchasePriceExclTax);
            await setValue('discountValue', pricing.discountValue);
          }
          // components
          const componentUri = getRoutePrefix(ModelEnum.Component);
          const componentFilter: PropertyFilter<ModelEnum.Component> = {
            property: 'parentProduct',
            operator: PropertyFilterOperator.Equal,
            value: productId
          };
          const productComponents = await axios.get<JsonldCollectionResponse<ModelEnum.Component>>(
            componentUri,
            {
              params: filterToParams(componentFilter, 'filter', ModelEnum.Component)
            }
          ).then(r => r.data['hydra:member']);
          const components = productComponents.map(component => {
            const result: Partial<PurchaseOrderProductComponentModel> = {
              product: component.product,
              quantity: 0,
              componentQuantity: component.quantity,
              designation: component.product.designation,
            };

            return result;
          });

          await setValue('components', components);
        }}
        {...props}
      />
    </div>
  );
};