import React, { FC } from 'react';
import { ActionDropdownProps } from './RouteAction.types';
import { Dropdown } from 'react-bootstrap';
import { Toggler } from './Toggler';
import { Menu } from './Menu';


export const RouteActionDropdown: FC<ActionDropdownProps> = ({ itemOperations }) => (
  <Dropdown>
    <Dropdown.Toggle as={Toggler} />
    <Dropdown.Menu
      align='start'
      as={Menu}
      itemOperations={itemOperations}
    />
  </Dropdown>
);