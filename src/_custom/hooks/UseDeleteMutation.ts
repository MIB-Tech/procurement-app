import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { getRoutePrefix } from '../utils';
import { queryClient } from '../../index';
import { getListingQueryKey } from '../ListingView/ListingView.utils';
import { useUri } from './UseUri';
import { useToastr } from '../Toastr/UseToastr';
import { ErrorResponse, SuccessResponse } from '../types/types';
import { ModelEnum } from '../../app/modules/types';


export const useDeleteMutation = <M extends ModelEnum>({ modelName }: { modelName: M }) => {
  const navigate = useNavigate();
  const uri = useUri({ modelName });
  const { deleteMutationError } = useToastr();

  const mutation = useMutation<SuccessResponse, ErrorResponse<M>>(
    () => axios.delete(uri),
    {
      onSuccess: () => {
        navigate(getRoutePrefix(modelName));
        queryClient.invalidateQueries({ queryKey: [getListingQueryKey(modelName)] });
      },
      onError: () => {
        deleteMutationError();
      }
    }
  );


  return { ...mutation };
};