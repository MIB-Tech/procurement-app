import { useQuery } from 'react-query';
import axios from 'axios';
import { HydraItem } from '../types/hydra.types';
import { useUri } from './UseUri';
import { getDetailQueryKey } from '../utils';
import { useToastr } from '../Toastr/UseToastr';
import { ModelEnum } from '../../app/modules/types';


export const useItemQuery = <M extends ModelEnum>({
  modelName,
  enabled,
  path
}: { modelName: M, path?: string, enabled?: boolean }) => {
  const { itemNotFoundError } = useToastr();
  const uri = useUri({ modelName });
  const url = path || uri;
  const result = useQuery(
    [getDetailQueryKey(modelName), url],
    () => axios.get<HydraItem<M>>(url),
    {
      enabled,
      onError: () => {
        itemNotFoundError();
      }
    }
  );

  return {
    ...result,
    item: result.data?.data
  };
};