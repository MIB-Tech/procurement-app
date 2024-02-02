import React, {Fragment, HTMLAttributes, useMemo} from 'react';
import {useMapping} from '../hooks/UseMapping';
import {ItemView} from '../components/ItemView';
import {Skeleton} from '@mui/material';
import {Trans} from '../components/Trans';
import clsx from 'clsx';
import {ColumnDef, ColumnMapping, DetailColumns, DetailViewType, Model, ViewEnum} from '../types/ModelMapping';
import {TitleContent} from '../ListingView/views/Table/HeaderCell';
import {ListingView} from '../ListingView/ListingView';
import {Link, useParams} from 'react-router-dom';
import {DetailViewColumnContent} from './DetailViewColumnContent';
import {useAuth} from '../hooks/UseAuth';
import {camelCaseToDash} from '../utils';
import {StringFormat} from '../Column/String/StringColumn';
import {RouteLinks} from '../components/RouteAction/RouteLinks';
import {useProperty} from '../hooks/UseProperty';
import {useItemQuery} from '../hooks/UseItemQuery';
import {useUri} from '../hooks/UseUri';
import {ColumnTypeEnum} from '../types/types';
import {ModelEnum} from '../../app/modules/types';
import {SVG} from '../components/SVG/SVG';
import {IconButton} from '../components/Button/IconButton';
import {Help} from '../components/Help';
import {ModelCellSkeleton} from '../ListingView/views/Table/ModelCell';
import {islocationColumn} from '../ListingView/ListingView.utils';
import {useCurrentOperation} from '../../_metronic/layout/components/header/page-title/DefaultTitle';
import {Button} from '../components/Button';

export const DEFAULT_DETAIL_VIEW: DetailViewType<any> = {
  type: ViewEnum.Detail
};

export const ItemOverview = <M extends ModelEnum>({modelName, children}: {modelName: M} & HTMLAttributes<HTMLDivElement>) => {
  const {views} = useMapping<M>({modelName});
  const { id:uid } = useParams<{ id: string }>();
  const {operations} = useAuth();
  const currentOperation = useCurrentOperation();
  const {item, isLoading} = useItemQuery<M>({
    modelName,
    // enabled: isOverview || (typeof column !== 'boolean' && column?.as === 'TAB')
  });

  const view = (views?.find(view => view.type === ViewEnum.Detail) || DEFAULT_DETAIL_VIEW) as DetailViewType<M>;
  const {itemOperationRoutes, customActions} = view;
  const _operations = useMemo(() => {
    if (!item) {
      return [];
    }

    const itemOperations = operations.filter(({ resource, operationType }) => {
      if (resource.name !== modelName) return false

      return currentOperation?.operationType &&
        [ViewEnum.Listing, ViewEnum.Update, ViewEnum.Delete, ViewEnum.Detail]
          .filter(viewEnum => viewEnum !== currentOperation.operationType)
          .includes(operationType)
    });

    return itemOperationRoutes?.({ item, operations: itemOperations }) || itemOperations;
  }, [item]);

  return (
    <div className='card mb-3'>
      <div className={clsx('card-body', children && 'pb-0')}>
        <div className={clsx('d-flex flex-wrap flex-xs-nowrap', children && 'mb-5')}>
          {isLoading && (
            <ModelCellSkeleton
              iconSize={75}
              titleHeight={26}
              subTitleHeight={25}
            />
          )}
          {item?.['@icon'] && (
            <div className='symbol -symbol-75px me-3'>
              <div className='symbol-label bg-light-primary'>
                <SVG path={item['@icon']} size='3x' variant='primary'/>
              </div>
            </div>
          )}
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap gap-3'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                    {item?.['@title']}
                  </a>
                </div>
                {/*<div className='d-flex flex-wrap fw-semibold fs-5 text-gray-500'>*/}
                {/*  {uid !== item?.['@subTitle'] && item?.['@subTitle']}*/}
                {/*</div>*/}
                {/*<Help overlay='Copier' placement='right' className='mt-1 d-flex'>*/}
                {/*  <a*/}
                {/*    href='#'*/}
                {/*    className='d-flex align-items-center bg-gray-200 rounded ps-2 text-muted text-hover-primary'*/}
                {/*    onClick={e => {*/}
                {/*      e.preventDefault();*/}
                {/*      if (uid) {*/}
                {/*        navigator.clipboard.writeText(uid);*/}
                {/*      }*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <small className='fw-bold fs-8'>*/}
                {/*      {uid}*/}
                {/*    </small>*/}
                {/*    <IconButton path='/general/gen054.svg' size='2'/>*/}
                {/*  </a>*/}
                {/*</Help>*/}
              </div>
              <div className='d-flex gap-3'>
                {item && customActions?.map(({render}, index) => (
                  <Fragment key={index}>
                    {render({item})}
                  </Fragment>
                ))}
                {uid && (
                  <RouteLinks
                    operations={_operations}
                    params={{id: uid}}
                    // useContextualTitle
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const DetailView = <M extends ModelEnum>({modelName}: { modelName: M }) => {
  const {columnDef, views} = useMapping<M>({modelName});
  const {isGranted, location,} = useAuth();
  const view = (views?.find(view => view.type === ViewEnum.Detail) || DEFAULT_DETAIL_VIEW) as DetailViewType<M>;
  const {property} = useProperty<M>();
  const isOverview = !property || property.toString().includes('_');

  const columns = view.columns ?
    view.columns :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (['id', 'uid'].includes(columnName.toString())) {
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

    if (location && islocationColumn({ modelName, columnName })) {
      return false;
    }

    if (typeof column === 'boolean') {
      return column;
    }

    const display = column?.display;
    if (display && item) {
      return display({ item });
    }

    const grantedRoles = column?.grantedRoles;

    return !grantedRoles || isGranted(grantedRoles);
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

  const embeddedModelNameType = property && columnDef[property]?.type;

  return (
    <div>
      <ItemOverview modelName={modelName}>
        <div className='separator' />
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
          <li className='nav-item'>
            <Link
              to={uri}
              relative={isOverview ? 'route' : 'path'}
              className={clsx(
                'nav-link text-active-primary py-2 me-3',
                isOverview && 'active'
              )}
            >
              <Trans id='OVERVIEW' />
            </Link>
          </li>

          {!isLoading && embeddedColumnNames.map(columnName => {
            const to = camelCaseToDash(columnName.toString());
            const def = columnDef[columnName] as ColumnMapping<M> | undefined;

            return (
              <li key={to} className='nav-item'>
                <Link
                  to={to}
                  className={clsx(
                    'nav-link text-active-primary py-3',
                    property === columnName && 'active'
                  )}
                >
                  <TitleContent columnName={columnName.toString()} title={def?.title} />
                </Link>
              </li>
            );
          })}
        </ul>
      </ItemOverview>
      <div className=''>
        {isOverview && (
          <div className='d-flex flex-column gap-3'>
            {emptyColumnNames.map(columnName => {
              const def = columnDef[columnName] as ColumnMapping<M> | undefined;
              const column = columns[columnName];
              const render = typeof column !== 'boolean' ? column?.render : undefined;

              return (
                <div key={columnName.toString()} className='mb-5'>
                  {isLoading && <Skeleton />}
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
                  rowClassName='row row-cols-sm-3'
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
          </div>
        )}
        {!isOverview && (
          <>
            {(
              !embeddedModelNameType ||
              embeddedModelNameType === ColumnTypeEnum.String ||
              embeddedModelNameType === ColumnTypeEnum.Number ||
              embeddedModelNameType === ColumnTypeEnum.Boolean ||
              embeddedModelNameType === ColumnTypeEnum.Array
            ) ?
              item && (
                <DetailViewColumnContent
                  item={item}
                  columnName={property}
                  render={typeof column !== 'boolean' ? column?.render : undefined}
                  {...columnDef[property]}
                />
              ) :
              <ListingView
                modelName={embeddedModelNameType}
                parentModelName={modelName}
                parent={item}
              />
            }
          </>
        )}
      </div>
    </div>
  );
};
