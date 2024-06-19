import React from "react";
import { EmailLink } from "../../../components/Button/EmailLink";
import { PhoneNumberLink } from "../../../components/Button/PhoneNumberLink";
import { Bullet } from "../../../components/Bullet";
import { HydraItem } from "../../../types/hydra.types";
import Moment from "react-moment";
import clsx from "clsx";
import {
  DateFormatEnum,
  StringFormat,
  TimeFormatEnum,
} from "../../../Column/String/StringColumn";
import { SVG } from "../../../components/SVG/SVG";
import { Trans } from "../../../components/Trans";
import { I18nMessageKey } from "../../../i18n/I18nMessages";
import { Model, TypeColum } from "../../../types/ModelMapping";
import { ModelCell } from "./ModelCell";
import { ColumnTypeEnum } from "../../../types/types";
import { toAbsoluteApi } from "../../../../app/modules/utils";
import { ModelEnum } from "../../../../app/modules/types";
import { NumberCell } from "../../../Column/Number/NumberCell";
import { ObjectFormat } from "../../../Column/Object/ObjectColumn";
import { ObjectCell } from "../../../Column/Object/ObjectCell";

export type CellContentProps<M extends ModelEnum> = {
  item: Model<M>;
  columnName: keyof Model<M>;
  columnMapping: TypeColum;
  className?: string;
};
export const CellContent = <M extends ModelEnum>(
  props: CellContentProps<M>
) => {
  const { item, columnName, columnMapping } = props;
  const value = item[columnName] as any;

  switch (columnMapping.type) {
    case ColumnTypeEnum.Number:
      if (value !== 0 && !value) {
        return <Bullet />;
      }

      return (
        <NumberCell
          value={value as number}
          columnMapping={columnMapping}
        />
      );
    case ColumnTypeEnum.String:
      if (!value) {
        return <Bullet />;
      }

      switch (columnMapping.format) {
        case StringFormat.PhoneNumber:
          return <PhoneNumberLink phoneNumber={value as string} />;
        case StringFormat.Email:
          return <EmailLink email={value as string} />;
        case StringFormat.Datetime:
          return (
            <div className='d-flex flex-column'>
              <Moment
                date={value as string}
                format={columnMapping.dateFormat || DateFormatEnum.European}
              />
              <Moment
                className='text-gray-500'
                date={value as string}
                format={columnMapping.timeFormat || TimeFormatEnum.Full}
              />
            </div>
          );
        case StringFormat.Date:
          return (
            <Moment
              date={value as string}
              format={columnMapping.dateFormat || DateFormatEnum.European}
            />
          );
        case StringFormat.Time:
          return (
            <Moment
              date={value as string}
              format={columnMapping.timeFormat || TimeFormatEnum.Half}
            />
          );
        case StringFormat.Select:
          const option = columnMapping.options.find((o) => o.id === value);
          if (!option) return <></>;

          const { label, color = "primary" } = option;

          return (
            <span className={clsx(`badge fs-7 badge-light-${color}`)}>
              <Trans id={label || (option.id as I18nMessageKey)} />
            </span>
          );
        case StringFormat.Icon:
          return (
            <div className='symbol symbol-30px'>
              <span className='symbol-label'>
                <SVG
                  path={value as string}
                  variant='primary'
                  size='2'
                />
              </span>
            </div>
          );
        case StringFormat.Link:
          return <a href={value as string}>{value}</a>;
        case StringFormat.Qrcode:
          return <code className='text-truncate'>{value}</code>;
        default:
          return <>{value as string}</>;
      }
    case ColumnTypeEnum.Boolean:
      return (
        <div
          className={clsx(
            "badge",
            `badge-${value ? "light-success" : "light-danger"}`
          )}
        >
          <Trans id={value ? "YES" : "NO"} />
        </div>
      );
    case ColumnTypeEnum.Array:
      if (!Array.isArray(value)) return <></>;

      return <>{value.join(columnMapping.separator)}</>;
    case ColumnTypeEnum.Object:
      return (
        <ObjectCell
          item={item}
          columnName={columnName}
          columnMapping={columnMapping}
        />
      );
    default:
      if (!value) {
        return <Bullet />;
      }

      const values = ("multiple" in props ? value : [value]) as Array<
        HydraItem | string
      >;

      return (
        <>
          {values.map((item, index) => {
            if (typeof item === "string") {
              // TODO
              return item;
            }

            return (
              <ModelCell
                key={index}
                item={item}
              />
            );
          })}
        </>
      );
  }
};
