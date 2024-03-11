import { FieldProps } from '../../../_custom/Column/controls/fields';
import { useAuth } from '../../../_custom/hooks/UseAuth';
import { useFormikContext } from 'formik';
import { PurchaseOrderModel } from '../PurchaseOrder';
import { ModelAutocompleteField } from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import { ModelEnum } from '../types';
import axios from 'axios';
import { HydraItem } from '../../../_custom/types/hydra.types';

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export const Field = ({ ...props }: Pick<FieldProps, 'name'>) => {
  const { clinic } = useAuth();
  const { name } = props;
  const { setFieldValue } = useFormikContext<Partial<PurchaseOrderModel>>();

  const setValue = async (suffix: string, value: any) => {
    await setFieldValue(name.replace('clinic', suffix), value);
  };

  const fetchDeliveryDepots = async () => {
    try {
      // Récupérer les adresses des dépôts de livraison associés à la clinique connectée
      const response = await axios.get<HydraItem<ModelEnum.DeliveryDepot>[]>(
        `/api/delivery_depots?clinic=${clinic?.id}`
      );

      const deliveryDepots = response.data;

      // Extraire les adresses des dépôts de livraison
      const depotAddresses = deliveryDepots.map((depot) => depot.address);

      return depotAddresses;
    } catch (error) {
      console.error('Error fetching delivery depots:', error);
      return [];
    }
  };

  return (
    <div className='mw-250px'>
      <ModelAutocompleteField
        modelName={ModelEnum.DeliveryDepot}
      //  name={name}
        //options={await fetchDeliveryDepots()} // Utilisez le tableau directement
        onChange={async (event, value) => {
          if (!value) return;

          await setValue('clinic', value);

          // Autres traitements
        }}
        {...props}
      />
    </div>
  );
};
