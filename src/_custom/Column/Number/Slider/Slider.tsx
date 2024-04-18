import React, {FC} from 'react'
import {Slider as MuiSlider, SliderProps} from '@mui/material'
import {Variant} from 'react-bootstrap/types'
import clsx from 'clsx'


export type RangeProps = {
  variant?: Variant
} & SliderProps

export const Slider: FC<RangeProps> = ({variant = 'primary', className, ...props}) => {

  return (
    <MuiSlider
      className={clsx(variant && `text-${variant}`, className)}
      {...props}
    />
  )
}