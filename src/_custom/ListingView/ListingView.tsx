import React from 'react';
import { TableView } from './TableView/TableView';
import { useRecoilState } from 'recoil';
import { Pagination } from './Pagination';
import { useMapping } from '../hooks/UseMapping';
import { SearchToolbar } from './Search/SearchToolbar';
import { FilterToolbar } from './Filter/FilterToolbar';
import { SortToolbar } from './Sort/SortToolbar';
import { LISTING_FAMILY } from '../../app/modules';
import { ColumnDef, FilterColumns, ListingColumns, Model } from '../types/ModelMapping';
import { RouteModel } from '../../app/modules/Route';
import { ListingViewProps } from './ListingView.types';
import { ToolbarWrapper } from './ToolbarWrapper';
import { StringFormat } from '../Column/String/StringColumn';
import { useAuth } from '../hooks/UseAuth';
import { RouteLinks } from '../components/RouteAction/RouteLinks';
import { RouteActionDropdown } from '../components/RouteAction/RouteActionDropdown';
import { useCollectionQuery } from '../hooks/UseCollectionQuery';
import { useOperation } from '../hooks/UseOperation';
import { ColumnTypeEnum } from '../types/types';
import { ModelEnum } from '../../app/modules/types';
import { getColumnMapping } from './Filter/Filter.utils';

const RELATED_MODELS = [
  ModelEnum.User,
  ModelEnum.Service,
  ModelEnum.Asset,
  ModelEnum.WorkOrder
];

export const isLocationColumn = <M extends ModelEnum>({ modelName, columnName }: {
  modelName: M,
  columnName: keyof Model<M> | string
}) => {
  const columnMapping = getColumnMapping({ modelName, columnName });

  return columnMapping?.type === ModelEnum.Location;
};

export const ListingView = <M extends ModelEnum>({ modelName, view, path, embedded }: ListingViewProps<M>) => {
  const { user, location } = useAuth();
  const { searchable, columnDef } = useMapping({ modelName });
  const { filterColumns, sortColumns, columns, routeKey, itemOperationRoutes } = view;
  // TODO: embedded state
  const [params, setParams] = useRecoilState(LISTING_FAMILY({ modelName, embedded }));
  const { collection, totalCount, isLoading } = useCollectionQuery<M>({
    modelName,
    queryKey: RELATED_MODELS.includes(modelName) && location,
    params,
    path
  });
  const { route, staticRoutes, dynamicRoutes } = useOperation(routeKey);
  const { search, filter, sort, page, itemsPerPage } = params;
  if (routeKey && !route) {
    return <>TODO ..</>;
  }

  const sortColumNames = sortColumns ?
    (Object.keys(sortColumns) as Array<keyof Model<M>>).filter(filterColumn => sortColumns[filterColumn]) :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (columnName === 'id') {
        return false;
      }
      const def = columnDef[columnName];
      switch (def.type) {
        case ColumnTypeEnum.String:
          switch (def.format) {
            case StringFormat.Select:
            case StringFormat.Password:
            case StringFormat.Text:
            case StringFormat.Icon:
            case StringFormat.Qrcode:
            case StringFormat.Link:
              return false;
            default:
              return true;
          }
        case ColumnTypeEnum.Number:
          return true;
        default:
          return false;
      }
    });

  const filterColumNames = filterColumns ?
    (Object.keys(filterColumns) as Array<string | keyof Model<M>>).filter(columnName => {
      if (location && isLocationColumn({ modelName, columnName })) {
        return false;
      }
      const columnFilterValue = filterColumns[columnName];
      if (typeof columnFilterValue === 'boolean') {
        return columnFilterValue;
      }

      return user && columnFilterValue?.display({ user });
    }) :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (columnName === 'id') {
        return false;
      }
      if (location && isLocationColumn({ modelName, columnName })) {
        return false;
      }
      const def = columnDef[columnName];
      switch (def.type) {
        case ColumnTypeEnum.String:
          return def.format !== StringFormat.Password;
        case ColumnTypeEnum.Number:
        case ColumnTypeEnum.Boolean:
          return true;
        case ColumnTypeEnum.Array:
          return false;
        default:
          return !('multiple' in def);
      }
    });

  const listingColumns = columns ?
    columns :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (columnName === 'id') {
        return false;
      }
      const def = columnDef[columnName];
      switch (def.type) {
        case ColumnTypeEnum.String:
          switch (def.format) {
            case StringFormat.Password:
            case StringFormat.Text:
              return false;
            default:
              return true;
          }
        case ColumnTypeEnum.Number:
        case ColumnTypeEnum.Boolean:
          return true;
        case ColumnTypeEnum.Array:
          return false;
        default:
          return !('multiple' in def);
      }
    }).reduce(
      (obj, columnName) => ({ ...obj, [columnName]: true }),
      {} as ListingColumns<M>
    );

  return (
    <>
      <ToolbarWrapper className='d-flex flex-wrap gap-4'>
        {searchable && (
          <SearchToolbar
            className='min-w-100px mw-200px'
            value={search}
            delay={500}
            onChange={search => {
              setParams({ ...params, search, page: 1 });
            }}
          />
        )}
        {filterColumNames.length > 0 && (
          <FilterToolbar
            modelName={modelName}
            columns={filterColumNames.reduce(
              (obj, columnName) => ({ ...obj, [columnName]: true }),
              {} as FilterColumns<M>
            )}
            value={filter}
            onChange={filter => {
              setParams({ ...params, filter, page: 1 });
            }}
          />
        )}
        {sortColumNames.length > 0 && (
          <SortToolbar
            sort={sort}
            columnDef={sortColumNames.reduce(
              (obj, columnName) => ({ ...obj, [columnName]: columnDef[columnName] }),
              {} as ColumnDef<M>
            )}
            onChange={sort => {
              setParams({ ...params, sort });
            }}
          />
        )}

        <RouteLinks
          className='ms-sm-auto'
          itemOperations={staticRoutes.map(({ routeKey }) => ({ routeKey }))}
        />
      </ToolbarWrapper>
      <div className='card'>
        <div className='card-body py-0 pe-2'>
          <TableView
            modelName={modelName}
            columns={(Object.keys(listingColumns) as Array<keyof Model<M>>).filter(columnName => {
              return !(location && isLocationColumn({ modelName, columnName }));
            }).reduce(
              (obj, columnName) => ({ ...obj, [columnName]: true }),
              {} as ListingColumns<M>
            )}
            data={collection}
            loading={isLoading}
            itemsPerPage={itemsPerPage}
            renderAction={({ item }) => {
              const routes: RouteModel[] = itemOperationRoutes?.({
                item,
                routes: dynamicRoutes,
                authUser: user
              }) || dynamicRoutes;
              if (routes.length === 0) {
                return <></>;
              }

              return (
                <RouteActionDropdown
                  itemOperations={routes.map(({ treePath, routeKey }) => ({
                    path: treePath.replace(':id', item.id.toString()),
                    routeKey
                  }))}
                />
              );
            }}
          />
        </div>
      </div>
      <Pagination
        page={page}
        onPageChange={page => {
          setParams({ ...params, page });
        }}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        className='pt-5 mx-2'
      />
    </>
  );
};
