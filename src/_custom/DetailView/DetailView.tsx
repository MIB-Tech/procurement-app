import React, { useMemo } from 'react';
import { useMapping } from '../hooks/UseMapping';
import { ItemView } from '../components/ItemView';
import { Skeleton } from '@mui/material';
import { Trans } from '../components/Trans';
import clsx from 'clsx';
import {
  ColumnDef,
  ColumnMapping,
  DetailColumns,
  DetailViewType,
  ListingViewType,
  Model,
  ModelMapping,
  ViewEnum
} from '../types/ModelMapping';
import { TitleContent } from '../ListingView/TableView/HeaderCell';
import { isLocationColumn, ListingView } from '../ListingView/ListingView';
import { RouteModel } from '../../app/modules/Route';
import { generatePath, Link } from 'react-router-dom';
import { DetailViewColumnContent } from './DetailViewColumnContent';
import { useAuth } from '../hooks/UseAuth';
import { MODEL_MAPPINGS } from '../../app/modules';
import { camelCaseToDash } from '../utils';
import { ToolbarWrapper } from '../ListingView/ToolbarWrapper';
import { StringFormat } from '../Column/String/StringColumn';
import { GoBackButton } from '../components/Button/GoBackButton';
import { RouteLinks } from '../components/RouteAction/RouteLinks';
import { useProperty } from '../hooks/UseProperty';
import { useItemQuery } from '../hooks/UseItemQuery';
import { useUri } from '../hooks/UseUri';
import { useOperation } from '../hooks/UseOperation';
import { ColumnTypeEnum } from '../types/types';
import { ModelEnum } from '../../app/modules/types';


export const DetailView = <M extends ModelEnum>({ modelName, view }: { view: DetailViewType<M>, modelName: M }) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { isGrantedOneOf, user/*, location*/ } = useAuth();
  const { routeKey, itemOperationRoutes } = view;
  const { dynamicRoutes } = useOperation(routeKey);
  const { property, pathname } = useProperty<M>();
  const isOverview = !property || !isNaN(+property.toString());
  const columns = view.columns ?
    view.columns :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (columnName === 'id') {
        return false;
      }
      const def = columnDef[columnName];
      switch (def.type) {
        case ColumnTypeEnum.String:
          return def.format !== StringFormat.Password;
        case ColumnTypeEnum.Array:
          return false;
        default:
          return true;
      }
    }).reduce(
      (obj, columnName) => ({ ...obj, [columnName]: true }),
      {} as DetailColumns<M>
    );

  const column = property && columns[property];
  const uri = useUri({ modelName });
  const { item, isLoading } = useItemQuery<M>({
    modelName,
    // enabled: isOverview || (typeof column !== 'boolean' && column?.as === 'TAB')
  });
  const columnNames = (Object.keys(columns) as Array<keyof typeof columns>).filter(columnName => {
    const column = property && columns[columnName];

    // if (location && isLocationColumn({ modelName, columnName })) {
    //   return false;
    // }

    if (typeof column === 'boolean') {
      return column;
    }

    const display = column?.display;
    if (display && item) {
      return display({ item });
    }

    const grantedRoles = column?.grantedRoles;

    return !grantedRoles || isGrantedOneOf(grantedRoles);
  });
  const embeddedColumnNames = columnNames.filter(columnName => {
    const def = columnDef[columnName] as ColumnMapping<M> | undefined;
    if (!def) {
      const column = columns[columnName];

      return typeof column !== 'boolean' && column?.as === 'TAB';
    }

    switch (def.type) {
      case ColumnTypeEnum.String:
      case ColumnTypeEnum.Number:
      case ColumnTypeEnum.Boolean:
      case ColumnTypeEnum.Array:
        return false;
      default:
        return 'multiple' in def;
    }
  });

  const emptyColumnNames = columnNames.filter(columnName => {
    const column = columns[columnName];

    return typeof column !== 'boolean' && column?.as === 'EMPTY';
  });
  const overviewColumnNames = columnNames.filter(columnName => {
    return !embeddedColumnNames.includes(columnName) && !emptyColumnNames.includes(columnName);
  });
  const operations = useMemo(() => {
    if (!item) {
      return [];
    }

    const routes: RouteModel[] = itemOperationRoutes?.({ item, routes: dynamicRoutes, authUser: user }) || dynamicRoutes;

    return routes.map(({ routeKey, treePath }) => ({ routeKey, path: generatePath(treePath, item) }));
  }, [dynamicRoutes, item]);

  const type = property && columnDef[property]?.type;
  const embeddedView = useMemo(() => {
    switch (type) {
      case undefined:
      case ColumnTypeEnum.String:
      case ColumnTypeEnum.Number:
      case ColumnTypeEnum.Boolean:
      case ColumnTypeEnum.Array:
        return null;
      default:
        const { views } = MODEL_MAPPINGS[type] as ModelMapping<any>;

        return views?.find(view => view.type === ViewEnum.Listing) as ListingViewType<any> | undefined;
    }
  }, [type]);


  return (
    <>
      <ToolbarWrapper className='d-flex align-items-center justify-content-between'>
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
          <li className='nav-item mt-2'>
            <Link
              to={uri}
              relative={isOverview ? 'route' : 'path'}
              className={clsx('nav-link text-active-primary ms-0 me-8', isOverview && 'active')}
            >
              <Trans id='OVERVIEW' />
            </Link>
          </li>

          {!isLoading && embeddedColumnNames.map(columnName => {
            const to = camelCaseToDash(columnName.toString());
            const def = columnDef[columnName] as ColumnMapping<M> | undefined;

            return (
              <li key={to} className='nav-item mt-2'>
                <Link
                  to={to}
                  className={clsx(
                    'nav-link text-active-primary ms-0 me-8',
                    property === columnName && 'active'
                  )}
                >
                  <TitleContent columnName={columnName.toString()} title={def?.title} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='d-flex align-items-center gap-2 gap-lg-3'>
          <GoBackButton size='sm'/>
          <RouteLinks itemOperations={operations} />
        </div>
      </ToolbarWrapper>

      {isOverview && (
        <>
          {emptyColumnNames.map(columnName => {
            const def = columnDef[columnName] as ColumnMapping<M> | undefined;
            const column = columns[columnName];
            const render = typeof column !== 'boolean' ? column?.render : undefined;

            return (
              <div key={columnName.toString()} className='mb-5'>
                {isLoading && (<Skeleton />)}
                {item && (
                  <>
                    {def ?
                      <DetailViewColumnContent
                        item={item}
                        columnName={columnName as keyof Model<M>}
                        render={render}
                        {...def}
                      /> :
                      render?.({ item })
                    }
                  </>
                )}
              </div>
            );
          })}
          <div className='card'>
            <div className='card-body'>
              <ItemView
                modelName={modelName}
                detailView
                columnDef={overviewColumnNames.reduce(
                  (prev, curr) => ({ ...prev, [curr]: columnDef[curr as keyof Model<M>] }),
                  {} as ColumnDef<M>
                )}
                renderContent={({ columnName }) => {
                  if (isLoading) {
                    return <Skeleton className='mw-200px' />;
                  }

                  if (!item) {
                    return <>NO ITEM</>;
                  }

                  const def = columnDef[columnName];
                  const column = columns[columnName];

                  // if (columnName.toString().includes('.')) {
                  //   console.log(getColumnMapping({modelName, columnName}), def);
                  // }



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
            </div>
          </div>
        </>
      )}
      {!isOverview && (
        <>
          {(
            !type ||
            type === ColumnTypeEnum.String ||
            type === ColumnTypeEnum.Number ||
            type === ColumnTypeEnum.Boolean ||
            type === ColumnTypeEnum.Array
          ) ?
            item && (
              <DetailViewColumnContent
                item={item}
                columnName={property}
                render={typeof column !== 'boolean' ? column?.render : undefined}
                {...columnDef[property]}
              />
            ) :
            embeddedView && (
              <ListingView
                modelName={type}
                view={embeddedView}
                path={pathname}
                embedded
              />
            )
          }
        </>
      )}
    </>
  );
};
