import {Variant} from 'react-bootstrap/types'
import React, {FC, ReactNode} from 'react'
import {NumberUnit} from '../../../_custom/components/NumberUnit'
import clsx from 'clsx'
import {SVG} from '../../../_custom/components/SVG/SVG'

type WidgetProps = {
  variant?: Variant
  title: string
  value: ReactNode,
  items: Array<{icon?: string, title: string, subTitle: string, value: ReactNode}>
}
export const Widget: FC<WidgetProps> = ({variant = 'primary', title, value, items}) => (
  <div className="card">
    <div className="card-body p-0">
      <div className={`px-5 pt-7 card-rounded h-275px w-100 bg-${variant}`}>
        <h3 className="m-0 text-white fw-bolder fs-3">
          {title}
        </h3>
        <div className="text-end text-white pt-5 fw-bolder fs-4x pt-">
          {value}
        </div>
      </div>
      <div
        className="shadow-xs card-rounded mx-7 mb-7 px-4 py-7 position-relative z-index-1 bg-white"
        style={{marginTop: '-130px'}}
      >
        {items.map((item, index) => (
          <div key={item.title} className={clsx('d-flex align-items-center', index + 1 < items.length && 'mb-6')}>
            {item.icon && (
              <div className="symbol symbol-45px w-40px me-5">
                <div className="symbol-label bg-lighten">
                  <SVG path={item.icon} />
                </div>
              </div>
            )}
            <div className="d-flex align-items-center flex-wrap w-100">
              <div className="flex-grow-1">
                <a
                  href="#"
                  className="fs-5 text-gray-800 text-hover-primary fw-bolder"
                  onClick={e => e.preventDefault()}
                >
                  {item.title}
                </a>
                <div className="text-gray-400 fw-bold fs-7">
                  {item.subTitle}
                </div>
              </div>
              <div className="fw-bolder fs-5 text-gray-800 pe-1">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)