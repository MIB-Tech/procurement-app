import React, {FC, HTMLAttributes} from 'react'
import clsx from 'clsx'
import {Variant} from 'react-bootstrap/types'


export type BulletProps = {
    type?: 'dot' | 'vertical' | 'line'
    variant?: Variant
  }
  & HTMLAttributes<HTMLSpanElement>
export const Bullet: FC<BulletProps> = ({variant, type, className}) => {

  return (
    <span
      className={clsx(
        'bullet',
        type && `bullet-${type}`,
        variant && `bg-${variant}`,
        className,
      )}
    />
  )
}