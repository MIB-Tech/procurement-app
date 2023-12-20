import React, { FC } from 'react';
import { ActionDropdownProps } from './RouteAction.types';
import { Dropdown } from 'react-bootstrap';
import { Toggler } from './Toggler';
import { Menu } from './Menu';
import { Skeleton } from '@mui/material';


export const RouteActionDropdownSkeleton = () => (
  <Skeleton variant='rounded' className='rounded' width={30} height={30}/>
)
export const RouteActionDropdown: FC<ActionDropdownProps> = props => (
  <Dropdown>
    <Dropdown.Toggle as={Toggler} />
    <Dropdown.Menu
      align='end'
      as={Menu}
      {...props}
    />
  </Dropdown>
);