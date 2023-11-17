import React from 'react'
import {useLayout} from '../../core'
import {Toolbar1} from './Toolbar1'
import { Toolbar2 } from './Toolbar2';

const Toolbar = () => {
  const {config} = useLayout()

  switch (config.toolbar.layout) {
    case 'toolbar1':
      return <Toolbar1 />
    case 'toolbar2':
      return <Toolbar2 />

    default:
      return <Toolbar1 />
  }
}

export {Toolbar}
