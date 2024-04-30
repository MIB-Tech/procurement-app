import React from 'react'
import {Button} from '../index'
import {SVG} from '../../SVG/SVG'
import {IconButtonProps} from './IconButton.types'
import clsx from 'clsx'
import {SVGProps} from '../../SVG/SVG.types'


export default ({variant, activeVariant, path, size, children, svgProps, ...props}: IconButtonProps & {
  svgProps?: Omit<SVGProps, 'path'>
}) => (
  <Button
    size="sm"
    className="h-25px w-25px"
    icon
    flush
    activeVariant={clsx(activeVariant && `color-${activeVariant}`)}
    {...props}
  >
    <SVG
      path={path}
      size={size}
      {...svgProps}
      className={clsx(variant && `svg-icon-${variant}`, svgProps?.className)}
    />
    {children}
  </Button>
)