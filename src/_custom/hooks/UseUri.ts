import { useParams } from 'react-router-dom';
import { getRoutePrefix } from '../utils';


export const useUri = ({ modelName }: { modelName: string }) => {
  const { id } = useParams<{ id: string }>();
  const routePrefix = getRoutePrefix(modelName);

  return `${routePrefix}/${id}`;
};