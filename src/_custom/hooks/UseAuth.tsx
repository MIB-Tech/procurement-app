import React, { FC } from 'react';
import { generatePath, Link, LinkProps, useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../setup';
import { RoleKeyEnum } from '../../app/modules/Role/Model';
import { UserModel } from '../../app/modules/User';
import { AuthState } from '../../app/pages/auth';
import { ModelEnum } from '../../app/modules/types';
import { getRoutePrefix } from '../utils';
import { ViewEnum } from '../types/ModelMapping';
import {OperationModel} from '../../app/modules/Operation';
import {RESOURCE_MAPPING} from "../../app/modules/Resource";


export type OperationPermission = {
  resourceName: ModelEnum,
  operationType: ViewEnum,
}
export type Permission = OperationPermission | RoleKeyEnum


export const useAuth = () => {
  const navigate = useNavigate();
  const { user, clinic } = useSelector<RootState>(({ auth }) => {
    return auth;
  }, shallowEqual) as Required<Pick<AuthState, 'user'>> & Pick<AuthState, 'clinic'>;
  const { role } = user;
  const operations = (role?.operations || []) ;

  const isGranted = (permissions: Permission[]) => {
    let granted = false;
    permissions.forEach(permission => {
      if (typeof permission === 'object') {
        const operation = operations.find(operation => {
          return operation.resource.name === permission.resourceName && operation.operationType === permission.operationType;
        });

        if (operation) {
          granted = true;
        }
      } else {
        if (role?.roleKey === permission) {
          granted = true;
        }
      }
    });

    return granted;
  };

  const getPath = ({ resourceName, suffix, params }: Pick<OperationPermission, 'resourceName'> & {
    suffix: string
    params?: Record<'id', string | number>
  }) => {

    const path = getRoutePrefix(resourceName) + `/${suffix}`;

    return params ? path.replace(':id', params.id.toString()) : path;
  };

  return {
    user,
    clinic,
    operations,
    isGranted,
    getPath,
    navigate,
  };
};


export type GrantedProps = {
  params?: Partial<Record<keyof UserModel, string | number>>
  to?: string
  className?: string
} & Pick<LinkProps, 'relative'>
  & OperationPermission
  & Pick<OperationModel, 'suffix'>
export const GrantedLink: FC<GrantedProps> = ({
  to,
  params = {},
  resourceName,
  operationType,
  suffix,
  children,
  ...props
}) => {
  const { isGranted, getPath } = useAuth();
  let path = isGranted([{ resourceName, operationType }]) && (to || getPath({ suffix, resourceName }));
  if (!path) {
    return <span {...props}>{children}</span>;
  }

  return (
    <Link to={to || generatePath(path, params)} {...props}>
      {children}
    </Link>
  );
};
