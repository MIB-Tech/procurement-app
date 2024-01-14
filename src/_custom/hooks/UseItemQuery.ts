import { useQuery } from 'react-query';
import axios, {AxiosResponse} from 'axios';
import { HydraItem } from '../types/hydra.types';
import { useUri } from './UseUri';
import { getDetailQueryKey } from '../utils';
import { useToastr } from '../Toastr/UseToastr';
import { ModelEnum } from '../../app/modules/types';
import {QueryObserverOptions} from 'react-query/types/core/types';


export const useItemQuery = <M extends ModelEnum>({
  modelName,
  path,
  ...options
}: { modelName: M, path?: string } & Pick<QueryObserverOptions<AxiosResponse<HydraItem<M>>>, 'enabled' | 'refetchOnWindowFocus'>) => {
  const { itemNotFoundError } = useToastr();
  const uri = useUri({ modelName });
  const url = path || uri;
  const result = useQuery<AxiosResponse<HydraItem<M>>>(
    [getDetailQueryKey(modelName), url],
    () => axios.get(url),
    {
      ...options,
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