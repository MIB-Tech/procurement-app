import { RouteKeyEnum } from '../../app/modules/Route/Model';
import { useAuth } from './UseAuth';


export const useOperation = (routeKey?: RouteKeyEnum) => {
  const { routes } = useAuth();
  const route = routes.find(route => routeKey && (route.routeKey === routeKey));
  const childRoutes = routes.filter(({ parent }) => route?.treePath && parent?.treePath?.startsWith(route.treePath));

  return {
    route,
    staticRoutes: childRoutes.filter(({ treePath }) => !treePath?.includes(':')),
    dynamicRoutes: childRoutes.filter(({ treePath }) => treePath?.includes(':'))
  };
};