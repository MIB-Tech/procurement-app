import React, { HTMLAttributes } from 'react';
import { SVGProps } from '../SVG/SVG.types';
import { ButtonProps } from '../Button';
import { RouteKeyEnum } from '../../../app/modules/Route/Model';



export type TogglerProps = HTMLAttributes<HTMLDivElement>

export type ItemOperation = {
  path?: string,
  routeKey: RouteKeyEnum
}
export type ActionDropdownProps = {
  itemOperations: ItemOperation[]
} & HTMLAttributes<HTMLDivElement>