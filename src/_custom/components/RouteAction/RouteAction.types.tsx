import { HTMLAttributes } from 'react';
import { RoleModel } from '../../../app/modules/Role';


export type TogglerProps = HTMLAttributes<HTMLDivElement>


export type ActionDropdownProps = {
  params?: Record<string, string | number>
} & Pick<RoleModel, 'operations'> & HTMLAttributes<HTMLDivElement>