import { TitleContent } from './HeaderCell';
import React, { HTMLAttributes, ReactNode } from 'react';
import { CellContent } from './BodyCell';
import { Skeleton } from '@mui/material';
import { ColumnMapping, ListingColumns, ListingViewType, Model } from '../../types/ModelMapping';
import { HydraItem } from '../../types/hydra.types';
import { Trans } from '../../components/Trans';
import clsx from 'clsx';
import { ModelCell } from './ModelCell';
import { useMapping } from '../../hooks/UseMapping';
import { stringToI18nMessageKey } from '../../utils';
import { PaginationInput } from '../Pagination/Pagination.types';
import { ModelEnum } from '../../../app/modules/types';


export type TableViewColumnMapping<M extends ModelEnum> = ColumnMapping<M>

type TableViewProps<M extends ModelEnum> = {
  modelName: M
  columns: ListingColumns<M>
  data: HydraItem<M>[],
  loading?: boolean
  renderAction?: (props: { item: HydraItem<M> }) => ReactNode
} & Pick<PaginationInput, 'itemsPerPage'> & HTMLAttributes<HTMLDivElement>
export const TableView = <M extends ModelEnum>(props: TableViewProps<M>) => {
  const {
    modelName,
    columns,
    data,
    loading,
    renderAction,
    itemsPerPage = 1,
    className,
  } = props;
  const {columnDef} = useMapping<M>({modelName})
  const columnNames = (Object.keys(columns) as Array<keyof Model<M>>);

  return (
    <div className={clsx('table-responsive', className)}>
      <table className={clsx('table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0')}>
        <thead className='fs-7 text-gray-400 text-uppercase'>
        {columnNames.length > 0 && (
          <tr>
            <th className='text-truncate text-uppercase border-end border-2'>
              <Trans id={stringToI18nMessageKey(modelName)}/>
            </th>
            {columnNames.map(columnName => (
              <th key={columnName.toString()} className='text-truncate text-uppercase'>
                <TitleContent columnName={columnName} title={columnDef[columnName].title}/>
              </th>
            ))}
            {renderAction && <th className='text-end' />}
          </tr>
        )}
        </thead>
        <tbody>
        {loading && Array.from(Array(itemsPerPage).keys()).map(key => (
          <tr key={key}>
            {Array.from(Array(columnNames.length + 1).keys()).map((index) => (
              <td key={`${key}.${index}`} className={clsx(index === 0 && 'border-end border-2')}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
        {!loading && data.length === 0 && (
          <tr>
            <td colSpan={columnNames.length + 1} className='text-center fw-bolder'>
              <Trans id='NO_ITEM_FOUND' />
            </td>
          </tr>
        )}
        {data.map(item => (
          <tr key={item.id}>
            <td className='border-end border-2'>
              <ModelCell item={item}/>
            </td>
            {columnNames.map(columnName => {
              const def = columnDef[columnName];
              const column = columns[columnName];
              const render = typeof column !== 'boolean' ? column?.render : undefined;

              return (
                <td key={`${item.id}.${columnName.toString()}`}>
                  <CellContent item={item} columnName={columnName} render={render} {...def}/>
                </td>
              );
            })}
            {renderAction && (
              <td className='text-end w-30px'>
                {renderAction({ item })}
              </td>
            )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
