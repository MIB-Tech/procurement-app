import React, { Fragment, ReactNode } from 'react';
import { TitleContent } from '../ListingView/TableView/HeaderCell';
import { ColumnDef, Model } from '../types/ModelMapping';
import clsx, { ClassValue } from 'clsx';
import { ColumnIcon } from '../ListingView/TableView/ColumnIcon';
import { ModelEnum } from '../../app/modules/types';
import { getColumnMapping } from '../ListingView/Filter/Filter.utils';


export type ItemViewProps<M extends ModelEnum> = {
  modelName: M,
  columnDef: ColumnDef<M>,
  renderContent: (props: { columnName: keyof Model<M> }) => ReactNode
  labelClassName?: ClassValue
  detailView?: boolean
}
export const ItemView = <M extends ModelEnum>({
  modelName,
  columnDef,
  renderContent,
  labelClassName,
  detailView
}: ItemViewProps<M>) => {
  const columnNames = Object.keys(columnDef) as Array<keyof Model<M>>;

  return (
    <>
      {columnNames.map((columnName, index) => {
        const def = getColumnMapping({modelName, columnName});
        const _columnName:string = columnName.toString().split('.').pop() as string

        return (
          <Fragment key={_columnName}>
            <div className='row '>
              <label
                className={clsx(
                  'col-sm-4 d-flex fw-semibold text-muted align-items-center',
                  !detailView && !('multiple' in def) && !def.nullable && 'required',
                  labelClassName
                )}>
                <ColumnIcon {...def} size='2' className='me-2' />
                <div className='text-truncate text-muted'>
                  <TitleContent
                    columnName={_columnName}
                    {...def}
                  />
                </div>
              </label>
              <div className='col-sm-8'>
                {renderContent({ columnName })}
              </div>
            </div>
            {columnNames.length > index + 1 && <div className='separator my-3' />}
          </Fragment>
        )
      })}
    </>
  );
};
