import React, { FC, HTMLAttributes } from 'react';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../setup';
import { RouteKeyEnum } from '../../app/modules/Route/Model';
import { RoleKeyEnum } from '../../app/modules/Role/Model';
import { UserModel } from '../../app/modules/User';
import { AuthState } from '../../app/pages/auth';


export const useAuth = () => {
  const navigate = useNavigate();
  const { user, location } = useSelector<RootState>(({ auth }) => {
    return auth
  }, shallowEqual) as Required<Pick<AuthState, 'user'>> & Pick<AuthState, 'location'>;
  const { role } = user;
  const routes = role?.routes || [];

  const isGranted = (roleKey: RoleKeyEnum) => role && role.roleKey === roleKey;

  const isGrantedOneOf = (roleKeys: RoleKeyEnum[]) => role && roleKeys.includes(role.roleKey);
  const isRouteGranted = (routeKeys: RouteKeyEnum[]) => {
    return routes.findIndex(({ routeKey }) => routeKeys.includes(routeKey)) !== -1;
  };
  const getRouteNode = (routeKey: RouteKeyEnum) => routes.find((node) => node.routeKey === routeKey);
  const getPath = (routeKey: RouteKeyEnum) => getRouteNode(routeKey)?.treePath || '/';


  return {
    user,
    location,
    routes,
    isGranted,
    isGrantedOneOf,
    isRouteGranted,
    getPath,
    getRouteNode,
    navigate
  };
};


export type GrantedProps = {
  routeKey: RouteKeyEnum
  params?: Partial<Record<keyof UserModel, string | number>>
  to?: string
  className?: string
}
export const GrantedLink: FC<GrantedProps> = ({ to, params = {}, routeKey, children, ...props }) => {
  const { isRouteGranted, getPath } = useAuth();
  let path = isRouteGranted([routeKey]) && (to || getPath(routeKey));
  if (!path) {
    return <span {...props}>{children}</span>
  }

  return (
    <Link to={to || generatePath(path, params)} {...props}>
      {children}
    </Link>
  );
};


export const IsGranted: FC<{ routeKeys: RouteKeyEnum[] } & HTMLAttributes<HTMLDivElement>> = ({
  routeKeys,
  children
}) => {
  const { isRouteGranted } = useAuth();

  if (!isRouteGranted(routeKeys)) return <></>;


  return <>{children}</>;
};