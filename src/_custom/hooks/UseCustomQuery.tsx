import { useUri } from "./UseUri";
import { getRoutePrefix } from "../utils";
import axios from "axios";
import { HydraItem } from "../types/hydra.types";
import { useQuery } from "react-query";
import { EditQueryProps } from "../FormView/FormView.types";
import { useToastr } from "../Toastr/UseToastr";
import { ModelEnum } from "../../app/modules/types";

export const useCustomQuery = <M extends ModelEnum>({
  modelName,
  url,
  enabled,
}: EditQueryProps<M>) => {
  const { itemNotFoundError } = useToastr();
  const uri = useUri({ modelName });
  const queryKey = getRoutePrefix(modelName);
  const queryFn = () => axios.get<HydraItem<M>>(url || `/update${uri}`);
  const query = useQuery(queryKey, queryFn, {
    enabled,
    cacheTime: 0,
    onError: () => {
      itemNotFoundError();
    },
  });
  const item = query.data?.data;

  return {
    ...query,
    item,
  };
};
