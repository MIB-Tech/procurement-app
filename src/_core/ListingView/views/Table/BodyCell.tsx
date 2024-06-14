import React from "react";
import { EmailLink } from "../../../components/Button/EmailLink";
import { PhoneNumberLink } from "../../../components/Button/PhoneNumberLink";
import { Bullet } from "../../../components/Bullet";
import { HydraItem } from "../../../types/hydra.types";
import Moment from "react-moment";
import { NumberUnit } from "../../../components/NumberUnit";
import clsx from "clsx";
import { NumberFormat } from "../../../Column/Number/NumberColumn";
import {
  DateFormatEnum,
  StringFormat,
  TimeFormatEnum,
} from "../../../Column/String/StringColumn";
import { SVG } from "../../../components/SVG/SVG";
import { Trans } from "../../../components/Trans";
import { I18nMessageKey } from "../../../i18n/I18nMessages";
import { TypeColum } from "../../../types/ModelMapping";
import { ModelCell } from "./ModelCell";
import { bytesToSize } from "../../../components/File/File.utils";
import { ColumnTypeEnum } from "../../../types/types";
import { toAbsoluteApi } from "../../../../app/modules/utils";

export type CellContentProps = {
  value: any;
} & TypeColum;
export const CellContent = (
  props: CellContentProps & { className?: string }
) => {
  const { value, type } = props;

  switch (type) {
    case ColumnTypeEnum.Number:
      if (value !== 0 && !value) {
        return <Bullet />;
      }

      switch (props.format) {
        case NumberFormat.Amount:
          return <NumberUnit {...props} />;
        case NumberFormat.Percent:
          return (
            <NumberUnit
              {...props}
              value={value * 100}
              unit='%'
            />
          );
        case NumberFormat.DecimalUnit:
          return <>{bytesToSize(value as number)}</>;
        default:
          return <>{value as number}</>;
      }
    case ColumnTypeEnum.String:
      if (!value) {
        return <Bullet />;
      }

      switch (props.format) {
        case StringFormat.PhoneNumber:
          return <PhoneNumberLink phoneNumber={value as string} />;
        case StringFormat.Email:
          return <EmailLink email={value as string} />;
        case StringFormat.Datetime:
          return (
            <div className='d-flex flex-column'>
              <Moment
                date={value as string}
                format={props.dateFormat || DateFormatEnum.European}
              />
              <Moment
                className='text-gray-500'
                date={value as string}
                format={props.timeFormat || TimeFormatEnum.Full}
              />
            </div>
          );
        case StringFormat.Date:
          return (
            <Moment
              date={value as string}
              format={props.dateFormat || DateFormatEnum.European}
            />
          );
        case StringFormat.Time:
          return (
            <Moment
              date={value as string}
              format={props.timeFormat || TimeFormatEnum.Half}
            />
          );
        case StringFormat.Select:
          const option = props.options.find((o) => o.id === value);
          if (!option) {
            return <></>;
          }
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
        case StringFormat.ContentUrl:
          return (
            <span className='symbol symbol-40px me-4'>
              <img
                className='rounded-1'
                src={toAbsoluteApi(value)}
                alt=''
              />
            </span>
          );
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

      return <>{value.join(props.separator)}</>;
    case ColumnTypeEnum.Object:
      return <>TODO OBJECT</>;
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
