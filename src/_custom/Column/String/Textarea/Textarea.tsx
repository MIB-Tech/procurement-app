import React, {InputHTMLAttributes} from 'react'
import clsx from 'clsx'
import {FormControlProps} from '../InputBase/Input.types'
import {TextareaAutosize, TextareaAutosizeProps} from '@mui/material'


export type TextareaProps =
  FormControlProps
  & TextareaAutosizeProps
  & Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((
  {
    size,
    bg,
    className,
    ...props
  }, ref) => {

  return (
    <TextareaAutosize
      className={clsx(
        'form-control',
        bg && `form-control-${bg}`,
        size && `form-control-${size}`,
        className,
      )}
      minRows={2}
      {...props}
      ref={ref}
    />
  )
})