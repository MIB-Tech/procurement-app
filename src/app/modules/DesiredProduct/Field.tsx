import {FieldProps} from '../../../_custom/Column/controls/fields';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {useFormikContext} from 'formik';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {ModelEnum} from '../types';
import axios from 'axios';
import {HydraItem} from '../../../_custom/types/hydra.types';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator
} from '../../../_custom/ListingView/Filter/Filter.types';
import {DeliveryDepotModel} from "../DeliveryDepot";
import {DesiredProductModel} from "./index";

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export const Field = ({...props}: Pick<FieldProps, 'name'>) => {
  const {clinic} = useAuth();
  const {name} = props;
  const {setFieldValue} = useFormikContext<Partial<PurchaseOrderModel>>();
  const initialValues: PartialNullable<DeliveryDepotModel> = {
    address: '',
    clinic: null,
    desiredProducts: []
  };

  const setValue = async (suffix: string, value: any) => {
    await setFieldValue(name.replace('address', suffix), value);
  };

  const handleAddressChange = async (event: React.ChangeEvent<any>, value: any) => {
    if (Array.isArray(value)) return;
    if (!value) return;

    await setValue('address', value);

    const address = value.address;
    const addressUri = value['@id'];
    const detailedProduct = await axios.get<HydraItem<ModelEnum.DeliveryDepot>>(addressUri).then(r => r.data);

    const desiredProduct: Partial<DesiredProductModel> = {
      deliveryDepot: clinic?.deliveryDepots.at(0)
    };
    await setValue('desiredProducts', [desiredProduct]);
  };

  const deliveryDepotFilter: CompoundFilter<ModelEnum.DeliveryDepot> = {
    operator: CompoundFilterOperator.And,
    filters: [
      {
        property: 'clinic',
        operator: PropertyFilterOperator.Equal,
        value: clinic?.id
      }
    ]
  };

  return (
    <div className='mw-250px'>
      <ModelAutocompleteField
        modelName={ModelEnum.DeliveryDepot}
        size='sm'
        onChange={handleAddressChange}
        getParams={(filter) => ({
          ...filter, // Ajoutez d'autres filtres existants s'il y en a
          operator: CompoundFilterOperator.And,
          filters: [
            ...(filter.filters || []), // Ajoutez d'autres filtres existants s'il y en a
            {
              property: 'clinic',
              operator: PropertyFilterOperator.Equal,
              value: clinic?.id
            }
          ]
        })}
        {...props}
      />

    </div>
  );
};
