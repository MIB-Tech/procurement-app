import React, {Fragment, useMemo, useState} from 'react'
import {ColumnDef, FilterColumns, ListingColumns, ListingViewType, Model, ViewEnum} from '../types/ModelMapping'
import {DatesSet, ExtendedProps, ListingModeEnum, ListingViewProps} from './ListingView.types'
import {ModelEnum} from '../../app/modules/types'
import {useParams} from 'react-router-dom'
import {useAuth} from '../hooks/UseAuth'
import {useMapping} from '../hooks/UseMapping'
import {useRecoilState} from 'recoil'
import {LISTING_FAMILY} from '../../app/modules'
import {useCollectionQuery} from '../hooks/UseCollectionQuery'
import {CompoundFilter, CompoundFilterOperator, Filter, PropertyFilterOperator} from './Filter/Filter.types'
import {ColumnTypeEnum} from '../types/types'
import {DateFormatEnum, StringFormat, TimeFormatEnum} from '../Column/String/StringColumn'
import moment from 'moment'
import {Trans, useTrans} from '../components/Trans'
import {EventInput, EventSourceInput} from '@fullcalendar/core'
import clsx from 'clsx'
import {SearchToolbar} from './Search/SearchToolbar'
import {AdvancedFilterToolbar} from './Filter/AdvancedFilterToolbar'
import {SortToolbar} from './Sort/SortToolbar'
import {Radio} from '../Column/controls/base/Radio/Radio'
import {RouteLinks} from '../components/RouteAction/RouteLinks'
import {TableView} from './views/Table/TableView'
import {Pagination} from './Pagination'
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import {GridView} from './views/Grid/GridView'
import {Help} from '../components/Help'
import {DetailViewColumnContent} from '../DetailView/DetailViewColumnContent'
import {ItemView} from '../components/ItemView'
import {DEFAULT_VIEW, isClinicColumn, RELATED_MODELS} from './ListingView.utils'
import {BasicFilterToolbar} from './Filter/BasicFilterToolbar'
import {getAdvancedPropertyFilter, getColumnMapping} from './Filter/Filter.utils'
import {ItemAction} from './ItemAction'
import {Button} from '../components/Button'
import {getRoutePrefix, stringToI18nMessageKey} from '../utils'
import {utils, writeFile} from 'xlsx'
import {plural} from 'pluralize'
import {HydraItem} from '../types/hydra.types'

const ModelExportButton = <M extends ModelEnum>({modelName}: {modelName: M}) => {
  const {exportableColumnNames, columnDef} = useMapping<M>({modelName})
  const {trans} = useTrans()
  const {isLoading, refetch} = useCollectionQuery<M>({
    modelName,
    path: `/export${getRoutePrefix(modelName)}`,
    options: {
      enabled: false,
    },
  })

  return (
    <Button
      variant="outline-default"
      size="sm"
      className="bg-white"
      loading={isLoading}
      onClick={async () => {
        const headers = exportableColumnNames.map(exportableColumnName => trans({id: stringToI18nMessageKey(exportableColumnName.toString())}))
        const response = await refetch()
        const collection = (response.data?.data['hydra:member']) as Array<HydraItem<M>>
        const dataRows = collection.map(item => exportableColumnNames.map(exportableColumnName => {
          const value = item[exportableColumnName]
          const def = columnDef[exportableColumnName]
          switch (def.type) {
            case ColumnTypeEnum.String:
              switch (def.format) {
                case StringFormat.Time:
                  return moment(value as string).format(def.timeFormat || TimeFormatEnum.Full)
                case StringFormat.Date:
                  return moment(value as string).format(def.dateFormat || DateFormatEnum.European)
                case StringFormat.Datetime:
                  return moment(value as string).format(`${def.dateFormat || DateFormatEnum.European} ${def.timeFormat || TimeFormatEnum.Full}`)
                default:
                  return value
              }
            case ColumnTypeEnum.Number:
            case ColumnTypeEnum.Boolean:
              return value
            case ColumnTypeEnum.Array:
              return (value as Array<any>)?.join(', ')
            default:
              return 'multiple' in def ?
                (value as Array<string | HydraItem> | undefined)?.map(item => typeof item === 'string' ? item : item['@title']) :
                typeof value === 'string' ? value : (value as HydraItem)?.['@title']
          }
        }))
        const workSheet = utils.aoa_to_sheet([
          headers,
          ...dataRows,
        ])
        const workBook = utils.book_new()
        utils.book_append_sheet(workBook, workSheet, 'Sheet1')

        const fileName = `${trans({id: stringToI18nMessageKey(plural(modelName))})}.${moment().format()}.xlsx`
        writeFile(workBook, fileName)
      }}
    >
      <Trans id="EXPORT" />
    </Button>
  )
}

export const ListingView = <M extends ModelEnum>({modelName, parentModelName, parent}: ListingViewProps<M>) => {
  const [datesSet, setDatesSet] = useState<DatesSet>({
    start: moment().startOf('month').toDate(),
    end: moment().endOf('month').toDate()
  });
  const {id} = useParams<{ id?: string }>();
  const {user, operations, clinic, navigate} = useAuth();
  const {searchable, exportable, columnDef, views} = useMapping({modelName})
  const view = (views?.find(view => view.type === ViewEnum.Listing) || DEFAULT_VIEW) as ListingViewType<M>;
  const {
    filterColumns,
    sortColumns,
    columns,
    itemOperationRoutes,
    bulkActions
  } = view;
  const [state, setState] = useRecoilState(LISTING_FAMILY({modelName, embedded: !!parentModelName}));
  const {selectedItems, basicFilter, ...params} = state;
  const {sort, page, itemsPerPage, mode, search} = params;
  const isCalendar = mode === ListingModeEnum.Calendar;
  const columnNames = (Object.keys(columnDef) as Array<keyof Model<M>>)
  const parentProperty = columnNames.find(columnName => columnDef[columnName].type === parentModelName);

  // FIXME: causes state reset
  // useEffect(() => {
  //
  //   return () => {
  //     setState({...state, selectedItems: []});
  //   };
  // }, [modelName]);

  const {dateFields = []} = view;
  const filter = useMemo<Filter<M>>(() => {
    let filters: Array<Filter<any>> = 'filters' in state.filter ? [...state.filter.filters] : [];

    const filledColumnNames = Object.keys(basicFilter);
    if (filledColumnNames.length > 0) {
      filledColumnNames.forEach(filledColumnName => {
        const value = basicFilter[filledColumnName];
        const columnMapping = getColumnMapping({modelName, columnName: filledColumnName});

        const {operator} = getAdvancedPropertyFilter(columnMapping);
        const defaultFilter = {
          property: filledColumnName,
          operator,
          value
        };
        switch (columnMapping.type) {
          case ColumnTypeEnum.String:
            switch (columnMapping.format) {
              case StringFormat.Date:
              case StringFormat.Datetime:
              case StringFormat.Time:
                const [start, end] = [...value];
                if (start) {
                  filters.push({
                    ...defaultFilter,
                    operator: PropertyFilterOperator.GreaterThanOrEqual,
                    value: start
                  });
                }
                if (end) {
                  filters.push({
                    ...defaultFilter,
                    operator: PropertyFilterOperator.LessThanOrEqual,
                    value: end
                  });
                }
                break;
              default:
                if (value) {
                  filters.push(defaultFilter);
                }
            }
            break;
          default:
            if (value) {
              filters.push(defaultFilter);
            }
        }

      });

    }

    if (isCalendar) {
      filters.push({
        operator: CompoundFilterOperator.Or,
        filters: dateFields.map(dateField => {
          const {startProperty, endProperty} = dateField;
          const dateFilter: CompoundFilter<M> = {
            operator: CompoundFilterOperator.And,
            filters: [
              {
                operator: CompoundFilterOperator.Or,
                filters: [
                  {
                    property: startProperty,
                    operator: PropertyFilterOperator.IsNull
                  },
                  {
                    property: startProperty,
                    operator: PropertyFilterOperator.LessThanOrEqual,
                    value: datesSet.end
                  }
                ]
              }
            ]
          };

          if (endProperty) {
            dateFilter.filters.push({
              operator: CompoundFilterOperator.Or,
              filters: [
                {
                  property: endProperty,
                  operator: PropertyFilterOperator.IsNull
                },
                {
                  property: endProperty,
                  operator: PropertyFilterOperator.GreaterThanOrEqual,
                  value: datesSet.start
                }
              ]
            });
          }

          return dateFilter;
        })
      });
    }

    if (id && parentProperty) {
      filters.push({
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: `${parentProperty.toString()}.uid`,
            operator: PropertyFilterOperator.Equal,
            value: id
          },
          state.filter
        ]
      });
    }

    return {
      operator: CompoundFilterOperator.And,
      filters
    };
  }, [state.filter, basicFilter, id, parentProperty, isCalendar, dateFields]);

  const {collection, totalCount, isLoading} = useCollectionQuery<M>({
    modelName,
    queryKey: RELATED_MODELS.includes(modelName) && clinic?.id,
    params: {
      ...params,
      filter,
      page: isCalendar ? undefined : page,
      itemsPerPage: isCalendar ? undefined : itemsPerPage
    }
  });

  const isColumnHidden = (columnName: string | keyof Model<M>) => {
    if (parentModelName === columnName) {
      return true;
    }

    return clinic && isClinicColumn({modelName, columnName});
  };

  const sortColumNames = (Object.keys(sortColumns || columnDef) as Array<keyof Model<M>>).filter(columnName => {
    if (isColumnHidden(columnName)) {
      return false;
    }
    if (sortColumns) {
      return sortColumns[columnName];
    }
    if (['id', 'uid'].includes(columnName.toString())) {
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

  //
  const {locale, trans} = useTrans();
  const events = useMemo<EventSourceInput>(() => {
    let _events: EventInput[] = [];
    collection.forEach(item => {
      dateFields?.forEach(dateField => {
        const {startProperty, endProperty, variant} = dateField;
        const extendedProps: ExtendedProps<M> = {
          hydraItem: item,
          dateField
        };

        _events.push({
          id: item['@id'],
          title: item['@title'],
          extendedProps,
          date: item[startProperty] as string | undefined,
          end: endProperty && item[endProperty] as string | undefined,
          className: clsx(variant && `bg-${variant} text-inverse-${variant}`)
        });
      });
    });

    return _events;
  }, [collection, dateFields]);

  const advancedFilterColumNames = (Object.keys(filterColumns || columnDef) as Array<string | keyof Model<M>>).filter(
    columnName => {
      if (isColumnHidden(columnName)) {
        return false;
      }
      if (filterColumns) {
        const columnFilterValue = filterColumns[columnName];
        if (typeof columnFilterValue === 'boolean') {
          return columnFilterValue;
        }

        return !columnFilterValue?.display || (user && columnFilterValue.display({user}));
      }

      if (['id', 'uid'].includes(columnName.toString())) {
        return false;
      }
      const def = columnDef[columnName as keyof Model<M>];
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
  const basicFilterColumNames = advancedFilterColumNames.filter(columnName => {
    const columnFilterValue = filterColumns?.[columnName];

    return typeof columnFilterValue === 'object' && columnFilterValue.quickFilter;
  });

  const listingColumns = (Object.keys(columns || columnDef) as Array<keyof Model<M>>).filter(columnName => {
    if (isColumnHidden(columnName)) {
      return false;
    }
    if (columns) {
      return columns[columnName];
    }
    if (['id', 'uid'].includes(columnName.toString())) {
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
    (obj, columnName) => ({...obj, [columnName]: columns?.[columnName] || true}),
    {} as ListingColumns<M>
  );

  const parentDef = columnDef;
  const inverseBy = parentDef && (Object.keys(parentDef) as Array<keyof Model<any>>).find(key => {
    // @ts-ignore
    return parentDef[key]?.type === parentModelName;
  });
  // @ts-ignore
  const parentColumnMapping = inverseBy && parentDef[inverseBy];
  const item = parent && {
    id: parent.id,
    uid: parent.uid,
    '@id': parent['@id'],
    '@title': parent['@title'],
    '@subTitle': parent['@subTitle']
  };


  return (
    <div className='d-grid gap-3'>
      <div className='d-flex flex-wrap gap-3'>
        {searchable && (
          <SearchToolbar
            className='min-w-100px mw-200px'
            value={search}
            delay={500}
            onChange={search => {
              setState({...state, search, page: 1});
            }}
          />
        )}

        {basicFilterColumNames.length > 0 && (
          <BasicFilterToolbar
            modelName={modelName}
            columns={basicFilterColumNames.reduce(
              (obj, columnName) => ({...obj, [columnName]: true}),
              {} as FilterColumns<M>
            )}
            value={basicFilter}
            onChange={filter => {
              setState({...state, basicFilter: filter, page: 1});
            }}
          />
        )}

        {advancedFilterColumNames.length > 0 && (
          <AdvancedFilterToolbar
            modelName={modelName}
            columns={advancedFilterColumNames.reduce(
              (obj, columnName) => ({...obj, [columnName]: true}),
              {} as FilterColumns<M>
            )}
            value={state.filter}
            onChange={filter => setState({...state, filter, page: 1})}
          />
        )}

        {sortColumNames.length > 0 && (
          <SortToolbar
            sort={sort}
            columnDef={sortColumNames.reduce(
              (obj, columnName) => ({...obj, [columnName]: columnDef[columnName]}),
              {} as ColumnDef<M>
            )}
            onChange={sort => setState({...state, sort})}
          />
        )}

        <Radio
          scrollDisabled
          className='bg-white'
          size='sm'
          options={dateFields.length ?
            Object.values(ListingModeEnum) :
            [ListingModeEnum.Listing, ListingModeEnum.Gallery]
          }
          getOptionLabel={option => trans({id: option})}
          value={state.mode}
          onChange={mode => setState({
            ...state,
            mode: mode || ListingModeEnum.Listing
          })}
        />
        <div className='d-flex gap-3 ms-sm-auto'>
          {bulkActions?.map(({render}, index) => (
            <Fragment key={index}>
              {render({selectedItems})}
            </Fragment>
          ))}
          {exportable && <ModelExportButton modelName={modelName} />}
          <RouteLinks
            operations={operations.filter(({resource, operationType}) => resource.name === modelName && operationType === ViewEnum.Create)}
            linkProps={{
              state: parentColumnMapping && item && {
                [inverseBy]: 'multiple' in parentColumnMapping ? [item] : item
              }
            }}
          />
        </div>
      </div>
      {mode === ListingModeEnum.Listing && (
        <div className='card card-bordered'>
          <div className='card-body py-1 px-3'>
            <TableView
              modelName={modelName}
              columns={listingColumns}
              data={collection}
              loading={isLoading}
              itemsPerPage={itemsPerPage}
              selectedItems={selectedItems}
              setSelectedItems={bulkActions ?
                selectedItems => setState({...state, selectedItems}) :
                undefined
              }
              renderAction={({item}) => (
                <ItemAction
                  item={item}
                  itemOperationRoutes={itemOperationRoutes}
                  modelName={modelName}
                />
              )}
            />
          </div>
        </div>
      )}
      {mode === ListingModeEnum.Gallery && (
        <GridView
          modelName={modelName}
          columns={listingColumns}
          data={collection}
          loading={isLoading}
          itemsPerPage={itemsPerPage}
          renderAction={({item}) => (
            <ItemAction
              item={item}
              itemOperationRoutes={itemOperationRoutes}
              modelName={modelName}
            />
          )}
        />
      )}
      {mode === ListingModeEnum.Calendar && (
        <div className='card card-bordered'>
          <div className='card-body'>
            <FullCalendar
              height='auto'
              plugins={[momentPlugin, dayGridPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              navLinks
              initialView='dayGridMonth'
              buttonText={{
                prevYear: trans({id: 'PREV_YEAR'}),
                nextYear: trans({id: 'NEXT_YEAR'}),
                today: trans({id: 'TODAY'}),
                month: trans({id: 'MONTH'}),
                week: trans({id: 'WEEK'}),
                day: trans({id: 'DAY'})
              }}
              eventContent={({event}) => {
                const {hydraItem} = event.extendedProps as ExtendedProps<M>;
                const title = hydraItem['@title'];

                return (
                  <Help
                    overlay={(
                      <ItemView
                        rowClassName='w-300px text-start'
                        hideIcon
                        modelName={modelName}
                        detailView
                        columnDef={(Object.keys(listingColumns) as Array<keyof Model<M>>).reduce(
                          (prev, curr) => ({...prev, [curr]: columnDef[curr as keyof Model<M>]}),
                          {} as ColumnDef<M>
                        )}
                        renderContent={({columnName}) => {
                          const def = columnDef[columnName];
                          const column = listingColumns[columnName];

                          return (
                            <DetailViewColumnContent
                              item={hydraItem}
                              columnName={columnName}
                              render={typeof column !== 'boolean' ? column?.render : undefined}
                              {...def}
                            />
                          );
                        }}
                      />
                    )}
                  >
                    <div className='fw-bolder text-truncate ms-2'>
                      {title}
                    </div>
                  </Help>
                );
              }}
              locale={locale}
              events={events}
              firstDay={1}
              datesSet={setDatesSet}
              eventClick={arg => navigate(arg.event.id)}
              eventMouseEnter={({el}) => el.classList.add('cursor-pointer')}
              eventMouseLeave={({el}) => el.classList.remove('cursor-pointer')}
            />
          </div>
        </div>
      )}
      {mode !== ListingModeEnum.Calendar && (
        <Pagination
          size='sm'
          page={page}
          onPageChange={page => {
            setState({...state, page});
          }}
          onItemsPerPageChange={itemsPerPage => {
            setState({...state, page: 1, itemsPerPage});
          }}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};
