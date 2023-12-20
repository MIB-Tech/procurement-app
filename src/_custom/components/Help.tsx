import React, { FC, HTMLAttributes, useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import { nanoid } from '@reduxjs/toolkit';
import { OverlayTriggerProps } from 'react-bootstrap/OverlayTrigger';


type HelpProps = {
  overlay?: any
  duration?: number
} & Omit<OverlayTriggerProps, 'overlay' | 'children'> & HTMLAttributes<HTMLSpanElement>
const Help: FC<HelpProps> = ({ overlay, ...props }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <span
        ref={target}
        // onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...props}
      />
      <Overlay
        target={target.current}
        show={show}
        placement='top'
        onEnter={() => {
          setShow(true);
        }}
        {...props}
      >
        {tooltipProps => (
          <Tooltip
            id={nanoid()}
            {...tooltipProps}
          >
            {overlay}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
export { Help };
