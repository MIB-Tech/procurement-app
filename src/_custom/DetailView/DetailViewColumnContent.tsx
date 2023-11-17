import { CellContent, CellContentProps } from '../ListingView/TableView/BodyCell';
import { Bullet } from '../components/Bullet';
import { StringFormat } from '../Column/String/StringColumn';
import { QrCodePreview } from '../components/QrCodePreview';
import React from 'react';
import { ColumnTypeEnum } from '../types/types';
import { ModelEnum } from '../../app/modules/types';


export const DetailViewColumnContent = <M extends ModelEnum>(props: CellContentProps<M> & { className?: string }) => {
  const { item, type, columnName, render } = props;
  if (render) {
    return <>{render({ item })}</>;
  }

  const value = item[columnName];

  switch (type) {
    case ColumnTypeEnum.String:
      if (!value) {
        return <Bullet />;
      }
      switch (props.format) {
        case StringFormat.Qrcode:
          return (
            <div className='d-flex'>
              <QrCodePreview
                value={value as string}
                showValue
              />
            </div>
          );
        default:
          return <CellContent {...props} />;
      }
    default:
      return <CellContent {...props} />;
  }
};