import clsx from 'clsx'
import {ButtonProps} from './Button.types'
import React from 'react'
import {Trans} from '../Trans'


export default (
  {
    variant,
    activeVariant,
    hoverEffect,
    size,
    icon,
    dashed,
    flush,
    pulse,
    pulseVariant,
    className,
    loading,
    loadingLabel,
    children,
    onClick,
    ...props
  }: ButtonProps,
) => {

  return (
    <button
      type="button"
      data-kt-indicator={loading && 'on'}
      className={clsx(
        'btn',
        variant?.startsWith('outline') && 'btn-outline',
        variant === 'outline-default' && 'bg-white',
        variant && (`btn-${variant}`),
        dashed && 'btn-outline-dashed',
        size && `btn-${size}`,
        flush && `btn-flush`,
        activeVariant && `btn-active-${activeVariant}`,
        hoverEffect && `btn-hover-${hoverEffect}`,
        icon && 'btn-icon',
        pulse && clsx('pulse', pulseVariant && `pulse-${pulseVariant}`),
        className,
      )}
      disabled={loading}
      onClick={loading ? () => {
      } : onClick}
      {...props}
    >
      {pulse && <span className="pulse-ring" />}
      {loading ? (
        <>
          <span className="indicator-label">
          {children}
          </span>
          <span className="indicator-progress">
            {loadingLabel !== false &&
              <Trans id={typeof loadingLabel === 'undefined' ? 'PLEASE_WAIT' : loadingLabel} />}
            <span className="spinner-border spinner-border-sm align-middle ms-2" />
          </span>
        </>
      ) : children}

    </button>
  )
}