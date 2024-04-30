import React, {forwardRef} from 'react'
import {ActionDropdownProps} from './RouteAction.types'
import {useAuth} from '../../hooks/UseAuth'
import {Link} from 'react-router-dom'
import {Trans} from '../Trans'
import {SVG} from '../SVG/SVG'


export const Menu = forwardRef<HTMLDivElement, ActionDropdownProps>((props, ref) => {
  const {
    style,
    className,
    'aria-labelledby': labeledBy,
    operations,
    params,
  } = props
  const {getPath} = useAuth()

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <ul className="px-0 mb-0">
        {operations.map((operation, index) => {
          const {suffix, resource, icon, operationType} = operation

          return (
            <Link key={index} to={getPath({suffix, resourceName: resource.name, params})} className="text-gray-900">
              <li className="dropdown-item">
                <SVG path={icon} className="me-2" />
                <Trans id={operationType} />
                {/*resource.contextualTitle || title*/}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
})