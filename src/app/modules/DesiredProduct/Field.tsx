import {FieldProps} from '../../../_custom/Column/controls/fields';
import {useAuth} from '../../../_custom/hooks/UseAuth';
import {useField, useFormikContext} from 'formik';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {HydraItem} from '../../../_custom/types/hydra.types';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {ModelEnum} from '../types';
import {PropertyFilterOperator} from '../../../_custom/ListingView/Filter/Filter.types';
import axios from "axios";
import {response} from "express";

type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

// Fonction fictive pour récupérer les dépôts de livraison en fonction de la clinique sélectionnée
async function fetchDeliveryDepots(clinicId: string): Promise<string[]> {
  try {
    // Vous pouvez utiliser Axios ou toute autre méthode pour effectuer une requête HTTP
    const response = await axios.get<string[]>(`/api/clinics/${clinicId}/deliveryDepots`);
    return response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des dépôts de livraison :', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }

}

console.log(response)


export const ClinicField = ({...props}: Pick<FieldProps, 'name'>) => {
  const {clinic} = useAuth();
  const {name} = props;
  const {setFieldValue} = useFormikContext<Partial<PurchaseOrderModel>>();
  const [, , {setValue: setDeliveryDepotsOptions}] = useField<HydraItem | null>({name: name.replace('.clinic', '')});

  const initialValues: PartialNullable<PurchaseOrderModel> = {
    clinic: null,
  };

  const setValue = async (suffix: string, value: any) => {
    await setFieldValue(name.replace('clinic', suffix), value);
  };

  return (
    <div className='mw-250px'>
      <ModelAutocompleteField
        modelName={ModelEnum.DeliveryDepot}
        size='sm'
        onChange={async (event, value) => {
          if (!value) return;

          await setValue('deliveryDepot', value);

          // Filtrer les dépôts de livraison en fonction de la clinique choisie
          const depots = Array.isArray(value)
            ? await Promise.all(value.map(async (deliveryDepot) => await fetchDeliveryDepots(deliveryDepot.address)))
            : await fetchDeliveryDepots(value.address);
          // Mettez à jour les options du champ de dépôt de livraison avec les dépôts récupérés
          setDeliveryDepotsOptions(depots);

          // Vous pouvez également enregistrer le dépôt de livraison dans le formulaire si nécessaire
          // await setValue('deliveryDepot', depots[0]); // Par exemple, sélectionnez le premier dépôt par défaut
        }}
        getParams={(filter) => ({
          ...filter,
          filters: [
            ...(filter.filters || []),
            {
              property: 'depotDelivery',
              operator: PropertyFilterOperator.IsNotNull,
              value: null
            }
          ]
        })}
        {...props}
      />
    </div>
  );
};
