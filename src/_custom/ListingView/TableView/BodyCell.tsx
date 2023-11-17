import React from 'react';
import { EmailLink } from '../../components/Button/EmailLink';
import { PhoneNumberLink } from '../../components/Button/PhoneNumberLink';
import { Bullet } from '../../components/Bullet';
import { HydraItem } from '../../types/hydra.types';
import Moment from 'react-moment';
import { Currency } from '../../components/Currency';
import clsx from 'clsx';
import { NumberFormat } from '../../Column/Number/NumberColumn';
import { DateFormatEnum, StringFormat, TimeFormatEnum } from '../../Column/String/StringColumn';
import { SVG } from '../../components/SVG/SVG';
import { Trans } from '../../components/Trans';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { KTSVG } from '../../../_metronic/helpers';
import { DisplayViewBaseColum, Model, TypeColum } from '../../types/ModelMapping';
import { ModelCell } from './ModelCell';
import { bytesToSize } from '../../components/File/File.utils';
import { ColumnTypeEnum } from '../../types/types';
import { ModelEnum } from '../../../app/modules/types';


export type CellContentProps<M extends ModelEnum> = {
  item: HydraItem<M>
  columnName: keyof Model<M>
} & TypeColum & Pick<DisplayViewBaseColum<M>, 'render'>
export const CellContent = <M extends ModelEnum>(props: CellContentProps<M> & { className?: string }) => {
  const { item, type, columnName, render } = props;
  if (render) {
    return <>{render({ item })}</>;
  }

  const value = item[columnName] as unknown;

  switch (type) {
    case ColumnTypeEnum.Number:
      if (value !== 0 && !value) {
        return <Bullet />;
      }

      switch (props.format) {
        case NumberFormat.Currency:
          return <Currency value={value as number} />;
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
          const option = props.options.find(o => o.id === value);
          if (!option) {
            return <></>;
          }
          const { label, color = 'light' } = option;

          return (
            <span className={clsx(`badge fs-7 badge-light-${color}`)}>
              <Trans id={label || (option.id as I18nMessageKey)} />
            </span>
          );
        case StringFormat.Icon:
          return (
            <div className='symbol symbol-30px'>
              <span className='symbol-label'>
                <KTSVG
                  path={value as string}
                  className='svg-icon-dark svg-icon-fluid -align-self-center'
                />
              </span>
            </div>
          );
        case StringFormat.Link:
          return (
            <a href={value as string}>
              {value}
            </a>
          );
        case StringFormat.Qrcode:
          return (
            <code className='text-truncate'>
              {value}
            </code>
          );
        default:
          return <>{value as string}</>;
      }
    case ColumnTypeEnum.Boolean:
      return (
        <SVG
          size='2'
          path={value ? '/general/gen037.svg' : '/general/gen036.svg'}
          variant={value ? 'primary' : 'dark'}
        />
      );
    case ColumnTypeEnum.Array:
      return <>{(value as Array<any>).join(props.separator)}</>;
    default:
      if (!value) {
        return <Bullet />;
      }

      const values = ('multiple' in props ? value : [value]) as Array<HydraItem<M> | string>

      return (
        <>
          {values.map((item, index) => {
            if (typeof item === 'string') {
              // TODO
              return item
            }

            return <ModelCell key={index} item={item} />
          })}
        </>
      );
  }
};

