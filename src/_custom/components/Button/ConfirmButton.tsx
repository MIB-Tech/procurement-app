import { Button, ButtonProps } from './index';
import React, { FC, useState } from 'react';
import { SVG } from '../SVG/SVG';
import { Trans } from '../Trans';


type ConfirmButtonProps = {} & ButtonProps
export const ConfirmButton: FC<ConfirmButtonProps> = ({ onClick, ...props }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const variant = clicked ? 'danger' : 'warning';


  return (
    <Button
      {...props}
      variant={`outline-${variant}`}
      activeVariant={variant}
      onClick={event => {
        if (clicked) {
          onClick && onClick(event);
        }
        setClicked(!clicked);
      }}
    >
      {clicked && <SVG path='/general/gen044.svg' variant={variant} />}
      <Trans id={clicked ? 'CONFIRM' : 'DELETE'} />
    </Button>
  );
};