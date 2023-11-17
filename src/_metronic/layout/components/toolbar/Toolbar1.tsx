/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import { useLayout, usePageData } from '../../core';

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const {toolbar} = usePageData()

  return (
    <div className='toolbar' id='kt_toolbar'>
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' ')/*, 'd-flex flex-stack'*/)}
      >
        <div className='d-flex align-items-center justify-content-between'>
          {toolbar}
        </div>
      </div>
    </div>
  )
}

export {Toolbar1}
