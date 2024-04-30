import {CellContent} from '../ListingView/views/Table/BodyCell'
import {Bullet} from '../components/Bullet'
import {StringFormat} from '../Column/String/StringColumn'
import {QrCodePreview} from '../components/QrCodePreview'
import React from 'react'
import {ColumnTypeEnum} from '../types/types'
import {ModelEnum} from '../../app/modules/types'
import {DisplayViewBaseColum, Model, TypeColum} from '../types/ModelMapping'


type DetailViewColumnContentProps<M extends ModelEnum> = {
  item: Model<M>
  columnName: keyof Model<M>
  className?: string
} & TypeColum & Pick<DisplayViewBaseColum<M>, 'render'>

export const DetailViewColumnContent = <M extends ModelEnum>(props: DetailViewColumnContentProps<M>) => {
  const {item, type, columnName, render} = props
  if (render) {
    return <>{render({item})}</>
  }

  const value = item[columnName]

  switch (type) {
    case ColumnTypeEnum.String:
      if (!value) {
        return <Bullet />
      }
      switch (props.format) {
        case StringFormat.Qrcode:
          return (
            <div className="d-flex">
              <QrCodePreview
                value={value as string}
                showValue
              />
            </div>
          )
        default:
          return <CellContent {...props} value={value} />
      }
    default:
      return <CellContent {...props} value={value} />
  }
}