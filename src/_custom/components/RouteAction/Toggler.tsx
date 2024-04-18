import React, {forwardRef} from 'react'
import {TogglerProps} from './RouteAction.types'
import {Button} from '../Button'
import {SVG} from '../SVG/SVG'


export const Toggler = forwardRef<HTMLDivElement, TogglerProps>(({children, onClick}, ref) => (
  <div ref={ref} onClick={onClick}>
    <Button
      icon
      size="sm"
      className="btn-bg-light btn-active-color-primary w-30px h-30px"
    >
      <SVG
        path="/general/gen052.svg"
        size="5"
        className="svg-icon-gray-700"
      />
    </Button>
  </div>
))