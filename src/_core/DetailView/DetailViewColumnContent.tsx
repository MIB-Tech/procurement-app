import {
  CellContent,
  CellContentProps,
} from "../ListingView/views/Table/BodyCell";
import { Bullet } from "../components/Bullet";
import { StringFormat } from "../Column/String/StringColumn";
import { QrCodePreview } from "../components/QrCodePreview";
import React from "react";
import { ColumnTypeEnum } from "../types/types";
import { ModelEnum } from "../../app/modules/types";
import { DisplayViewBaseColum } from "../types/ModelMapping";
import { ObjectFormat } from "../Column/Object/ObjectColumn";
import { ObjectCell } from "../Column/Object/ObjectCell";

type DetailViewColumnContentProps<M extends ModelEnum> = CellContentProps<M> &
  Pick<DisplayViewBaseColum<M>, "render">;

export const DetailViewColumnContent = <M extends ModelEnum>(
  props: DetailViewColumnContentProps<M>
) => {
  const { item, columnName, columnMapping, render } = props;
  if (render) {
    return <>{render({ item })}</>;
  }

  const value = item[columnName];

  switch (columnMapping.type) {
    case ColumnTypeEnum.String:
      if (!value) {
        return <Bullet />;
      }
      switch (columnMapping.format) {
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
    case ColumnTypeEnum.Object:
      return (
        <ObjectCell
          className='symbol-150px'
          item={item}
          columnMapping={columnMapping}
          columnName={columnName}
        />
      );
    default:
      return <CellContent {...props} />;
  }
};
