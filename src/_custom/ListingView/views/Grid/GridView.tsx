import React, {HTMLAttributes, ReactNode} from 'react';
import {Skeleton} from '@mui/material';
import {ColumnDef, ColumnMapping, ListingColumns, Model} from '../../../types/ModelMapping';
import {HydraItem} from '../../../types/hydra.types';
import clsx from 'clsx';
import {ModelCell, ModelCellSkeleton} from '../Table/ModelCell';
import {useMapping} from '../../../hooks/UseMapping';
import {PaginationInput} from '../../Pagination/Pagination.types';
import {ModelEnum} from '../../../../app/modules/types';
import {DetailViewColumnContent} from '../../../DetailView/DetailViewColumnContent';
import {ItemView} from '../../../components/ItemView';
import {EmptyList} from '../Table/TableView';
import {RouteActionDropdownSkeleton} from '../../../components/RouteAction/RouteActionDropdown';
import {GridCard} from './GridCard';

type GridViewProps<M extends ModelEnum> = {
  modelName: M
  columns: ListingColumns<M>
  data: HydraItem<M>[],
  loading?: boolean
  renderAction?: (props: { item: HydraItem<M> }) => ReactNode
} & Pick<PaginationInput, 'itemsPerPage'> & HTMLAttributes<HTMLDivElement>

export const GridView = <M extends ModelEnum>(props: GridViewProps<M>) => {
  const {
    modelName,
    columns,
    data,
    loading,
    renderAction,
    itemsPerPage,
    className
  } = props;
  const { columnDef } = useMapping<M>({ modelName });
  const columnNames = (Object.keys(columns) as Array<keyof Model<M> | string>);

  if (!loading && data.length === 0) {
    return (
      <EmptyList bordered />
    );
  }

  const def = columnNames.reduce(
    (def, columnName) => ({
      ...def,
      [columnName]: columnDef[columnName] as ColumnMapping<M> | undefined
    }),
    {} as ColumnDef<M>
  )

  return (
    <div className={clsx('row row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-4 g-3', className)}>
      {loading && Array.from(Array(itemsPerPage).keys()).map(key => (
        <GridCard key={key}>
          <div className='d-flex justify-content-between gap-3'>
            <div className='flex-grow-1'>
              <ModelCellSkeleton />
            </div>
            <RouteActionDropdownSkeleton />
          </div>
          <div className='separator my-2' />
          <ItemView
            key={key}
            hideIcon
            rowClassName='g-2'
            labelClassName='mb-2'
            modelName={modelName}
            detailView
            columnDef={def}
            renderContent={() => <Skeleton />}
          />
        </GridCard>
      ))}
      {data.map(item => (
        <GridCard key={item.id}>
          <div className='d-flex justify-content-between'>
            <ModelCell item={item}/>
            {renderAction?.({ item })}
          </div>
          <div className='separator my-2' />
          <ItemView
            hideIcon
            rowClassName='g-2'
            labelClassName='mb-2'
            modelName={modelName}
            detailView
            columnDef={def}
            renderContent={({ columnName }) => {
              const def = columnDef[columnName];
              const column = columns[columnName];

              return (
                <DetailViewColumnContent
                  item={item}
                  columnName={columnName}
                  render={typeof column !== 'boolean' ? column?.render : undefined}
                  {...def}
                />
              );
            }}
          />
        </GridCard>
      ))}
    </div>
  );
};
