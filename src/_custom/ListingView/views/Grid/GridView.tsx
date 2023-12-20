import { TitleContent } from '../Table/HeaderCell';
import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { CellContent } from '../Table/BodyCell';
import { Skeleton } from '@mui/material';
import { ColumnDef, ListingColumns, Model } from '../../../types/ModelMapping';
import { HydraItem } from '../../../types/hydra.types';
import { Trans } from '../../../components/Trans';
import clsx from 'clsx';
import { ModelCell, ModelCellSkeleton } from '../Table/ModelCell';
import { useMapping } from '../../../hooks/UseMapping';
import { stringToI18nMessageKey } from '../../../utils';
import { PaginationInput } from '../../Pagination/Pagination.types';
import { ModelEnum } from '../../../../app/modules/types';
import { DetailViewColumnContent } from '../../../DetailView/DetailViewColumnContent';
import { ItemView } from '../../../components/ItemView';
import { EmptyList } from '../Table/TableView';
import { SVG } from '../../../components/SVG/SVG';
import { ModelLink } from '../Table/ModelLink';
import { RouteActionDropdownSkeleton } from '../../../components/RouteAction/RouteActionDropdown';

type GridViewProps<M extends ModelEnum> = {
  modelName: M
  columns: ListingColumns<M>
  data: HydraItem<M>[],
  loading?: boolean
  renderAction?: (props: { item: HydraItem<M> }) => ReactNode
} & Pick<PaginationInput, 'itemsPerPage'> & HTMLAttributes<HTMLDivElement>

const GridCard:FC<HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => (
  <div>
    <div className='card card-bordered h-100'>
      <div
        className={clsx('card-body', className)}
        {...props}
      />
    </div>
  </div>
)

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
  const columnNames = (Object.keys(columns) as Array<keyof Model<M>>);

  if (!loading && data.length === 0) {
    return (
      <EmptyList bordered />
    );
  }

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
            columnDef={columnNames.reduce(
              (prev, curr) => ({ ...prev, [curr]: columnDef[curr as keyof Model<M>] }),
              {} as ColumnDef<M>
            )}
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
            columnDef={columnNames.reduce(
              (prev, curr) => ({ ...prev, [curr]: columnDef[curr as keyof Model<M>] }),
              {} as ColumnDef<M>
            )}
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
