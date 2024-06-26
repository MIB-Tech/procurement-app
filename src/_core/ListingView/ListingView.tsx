import React, { Fragment, useMemo, useState } from "react";
import {
  ColumnDef,
  FilterColumns,
  ListingColumns,
  ListingViewType,
  Model,
  ViewEnum,
} from "../types/ModelMapping";
import {
  DatesSet,
  ExtendedProps,
  ListingModeEnum,
  ListingViewProps,
} from "./ListingView.types";
import { ModelEnum } from "../../app/modules/types";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { useMapping } from "../hooks/UseMapping";
import { useRecoilState } from "recoil";
import { getRecoilState, ListingState } from "../../app/modules";
import { useCollectionQuery } from "../hooks/UseCollectionQuery";
import {
  CompoundFilter,
  CompoundFilterOperator,
  Filter,
  PropertyFilterOperator,
} from "./Filter/Filter.types";
import { ColumnTypeEnum } from "../types/types";
import { StringFormat } from "../Column/String/StringColumn";
import moment from "moment";
import { useTrans } from "../components/Trans";
import { EventInput, EventSourceInput } from "@fullcalendar/core";
import clsx from "clsx";
import { SearchToolbar } from "./Search/SearchToolbar";
import { AdvancedFilterToolbar } from "./Filter/AdvancedFilterToolbar";
import { SortToolbar } from "./Sort/SortToolbar";
import { Radio } from "../Column/controls/base/Radio/Radio";
import { RouteLinks } from "../components/RouteAction/RouteLinks";
import { TableView } from "./views/Table/TableView";
import { Pagination } from "./Pagination";
import FullCalendar from "@fullcalendar/react";
import momentPlugin from "@fullcalendar/moment";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { GridView } from "./views/Grid/GridView";
import { Help } from "../components/Help";
import { DetailViewColumnContent } from "../DetailView/DetailViewColumnContent";
import { ItemView } from "../components/ItemView";
import { DEFAULT_LISTING_VIEW } from "./ListingView.utils";
import { BasicFilterToolbar } from "./Filter/BasicFilterToolbar";
import {
  getAdvancedPropertyFilter,
  getColumnMapping,
} from "./Filter/Filter.utils";
import { ItemAction } from "./ItemAction";
import { RELATED_MODELS } from "../../app/routing/PrivateRoutes";
import { ModelExportButton } from "./Export/ModelExportButton";
import { useNestedProperty } from "../hooks/UseNestedProperty";

export const ListingView = <M extends ModelEnum>({
  modelName,
  parentModelName,
  parent,
}: ListingViewProps<M>) => {
  const [datesSet, setDatesSet] = useState<DatesSet>({
    start: moment().startOf("month").toDate(),
    end: moment().endOf("month").toDate(),
  });
  const { id } = useParams<{ id?: string }>();
  const { user, operations, tenant, navigate } = useAuth();
  const { searchable, columnDef, views } = useMapping({
    modelName,
  });
  const view = (views?.find((view) => view.type === ViewEnum.Listing) ||
    DEFAULT_LISTING_VIEW) as ListingViewType<M>;
  const {
    exportableColumns,
    filterColumns,
    sortColumns,
    columns,
    itemOperationRoutes,
    bulkActions,
  } = view;
  const { property } = useNestedProperty();
  const recoilState = useMemo(() => {
    return getRecoilState<M>({
      modelName,
      nestedColumName: property,
    });
  }, [modelName]);
  const [state, setState] = useRecoilState<ListingState<M>>(recoilState);
  const { selectedItems, basicFilter, ...params } = state;
  const { sort, page, itemsPerPage, mode, search } = params;
  const isCalendar = mode === ListingModeEnum.Calendar;
  const columnNames = Object.keys(columnDef) as Array<keyof Model<M>>;
  const parentProperty = columnNames.find(
    (columnName) => columnDef[columnName].type === parentModelName
  );

  // FIXME: causes state reset
  // useEffect(() => {
  //
  //   return () => {
  //     setState({...state, selectedItems: []});
  //   };
  // }, [modelName]);

  const { dateFields = [] } = view;
  const filter = useMemo<Filter<M>>(() => {
    let filters: Array<Filter<any>> =
      "filters" in state.filter ? [...state.filter.filters] : [];

    const filledColumnNames = Object.keys(basicFilter);
    if (filledColumnNames.length > 0) {
      filledColumnNames.forEach((filledColumnName) => {
        const value = basicFilter[filledColumnName];
        const columnMapping = getColumnMapping({
          modelName,
          columnName: filledColumnName,
        });

        const { operator } = getAdvancedPropertyFilter(columnMapping);
        const defaultFilter = {
          property: filledColumnName,
          operator,
          value,
        };
        switch (columnMapping.type) {
          case ColumnTypeEnum.String:
            switch (columnMapping.format) {
              case StringFormat.Date:
              case StringFormat.Datetime:
              case StringFormat.Time:
                const [start, end] = value ? [...value] : [];
                if (start) {
                  filters.push({
                    ...defaultFilter,
                    operator: PropertyFilterOperator.GreaterThanOrEqual,
                    value: start,
                  });
                }
                if (end) {
                  filters.push({
                    ...defaultFilter,
                    operator: PropertyFilterOperator.LessThanOrEqual,
                    value: end,
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
        filters: dateFields.map((dateField) => {
          const { startProperty, endProperty } = dateField;
          const dateFilter: CompoundFilter<M> = {
            operator: CompoundFilterOperator.And,
            filters: [
              {
                operator: CompoundFilterOperator.Or,
                filters: [
                  {
                    property: startProperty,
                    operator: PropertyFilterOperator.IsNull,
                  },
                  {
                    property: startProperty,
                    operator: PropertyFilterOperator.LessThanOrEqual,
                    value: datesSet.end,
                  },
                ],
              },
            ],
          };

          if (endProperty) {
            dateFilter.filters.push({
              operator: CompoundFilterOperator.Or,
              filters: [
                {
                  property: endProperty,
                  operator: PropertyFilterOperator.IsNull,
                },
                {
                  property: endProperty,
                  operator: PropertyFilterOperator.GreaterThanOrEqual,
                  value: datesSet.start,
                },
              ],
            });
          }

          return dateFilter;
        }),
      });
    }

    if (id && parentProperty) {
      filters.push({
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: `${parentProperty.toString()}.id`,
            operator: PropertyFilterOperator.Equal,
            value: id,
          },
          state.filter,
        ],
      });
    }

    return {
      operator: CompoundFilterOperator.And,
      filters,
    };
  }, [state.filter, basicFilter, id, parentProperty, isCalendar, dateFields]);

  const { collection, totalCount, isLoading } = useCollectionQuery<M>({
    modelName,
    queryKey: RELATED_MODELS.includes(modelName) && tenant?.id,
    params: {
      ...params,
      filter,
      page: isCalendar ? undefined : page,
      itemsPerPage: isCalendar ? undefined : itemsPerPage,
    },
  });

  const isColumnHidden = (columnName: string | keyof Model<M>) => {
    return parentModelName === columnName;
  };

  const sortColumNames = (
    Object.keys(sortColumns || columnDef) as Array<keyof Model<M>>
  ).filter((columnName) => {
    if (isColumnHidden(columnName)) {
      return false;
    }
    if (sortColumns) {
      return sortColumns[columnName];
    }
    if (["id"].includes(columnName.toString())) {
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

  const { locale, trans } = useTrans();
  const events = useMemo<EventSourceInput>(() => {
    let _events: EventInput[] = [];
    collection.forEach((item) => {
      dateFields?.forEach((dateField) => {
        const { startProperty, endProperty, variant } = dateField;
        const extendedProps: ExtendedProps<M> = {
          hydraItem: item,
          dateField,
        };

        _events.push({
          id: item["@id"],
          title: item["@title"],
          extendedProps,
          date: item[startProperty] as string | undefined,
          end: endProperty && (item[endProperty] as string | undefined),
          className: clsx(variant && `bg-${variant} text-inverse-${variant}`),
        });
      });
    });

    return _events;
  }, [collection, dateFields]);

  const advancedFilterColumNames = (
    Object.keys(filterColumns || columnDef) as Array<string | keyof Model<M>>
  ).filter((columnName) => {
    if (isColumnHidden(columnName)) {
      return false;
    }
    if (filterColumns) {
      const columnFilterValue = filterColumns[columnName];
      if (typeof columnFilterValue === "boolean") {
        return columnFilterValue;
      }

      return (
        !columnFilterValue?.display ||
        (user && columnFilterValue.display({ user }))
      );
    }

    if (["id"].includes(columnName.toString())) {
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
      case ColumnTypeEnum.Object:
        return false;
      default:
        return !("multiple" in def);
    }
  });
  const basicFilterColumNames = advancedFilterColumNames.filter(
    (columnName) => {
      const columnFilterValue = filterColumns?.[columnName];

      return (
        typeof columnFilterValue === "object" && columnFilterValue.quickFilter
      );
    }
  );

  const listingColumns = (
    Object.keys(columns || columnDef) as Array<keyof Model<M>>
  )
    .filter((columnName) => {
      if (isColumnHidden(columnName)) {
        return false;
      }
      if (columns) {
        return columns[columnName];
      }
      if (["id"].includes(columnName.toString())) {
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
        case ColumnTypeEnum.Object:
          return false;
        default:
          return !("multiple" in def);
      }
    })
    .reduce(
      (obj, columnName) => ({
        ...obj,
        [columnName]: columns?.[columnName] || true,
      }),
      {} as ListingColumns<M>
    );

  const parentDef = columnDef;
  const inverseBy =
    parentDef &&
    (Object.keys(parentDef) as Array<keyof Model<any>>).find((key) => {
      // @ts-ignore
      return parentDef[key]?.type === parentModelName;
    });
  // @ts-ignore
  const parentColumnMapping = inverseBy && parentDef[inverseBy];
  const item = parent;

  return (
    <div className='d-grid gap-3'>
      <div className='d-flex flex-wrap gap-3'>
        {searchable && (
          <SearchToolbar
            className='min-w-100px mw-200px'
            value={search}
            delay={500}
            onChange={(search) => {
              setState({ ...state, search, page: 1 });
            }}
          />
        )}

        {basicFilterColumNames.length > 0 && (
          <BasicFilterToolbar
            modelName={modelName}
            columns={basicFilterColumNames.reduce(
              (obj, columnName) => ({ ...obj, [columnName]: true }),
              {} as FilterColumns<M>
            )}
            value={basicFilter}
            onChange={(filter) => {
              setState({ ...state, basicFilter: filter, page: 1 });
            }}
          />
        )}

        {advancedFilterColumNames.length > 0 && (
          <AdvancedFilterToolbar
            modelName={modelName}
            columns={advancedFilterColumNames.reduce(
              (obj, columnName) => ({ ...obj, [columnName]: true }),
              {} as FilterColumns<M>
            )}
            value={state.filter}
            onChange={(filter) => setState({ ...state, filter, page: 1 })}
          />
        )}

        {sortColumNames.length > 0 && (
          <SortToolbar
            sort={sort}
            columnDef={sortColumNames.reduce(
              (obj, columnName) => ({
                ...obj,
                [columnName]: columnDef[columnName],
              }),
              {} as ColumnDef<M>
            )}
            onChange={(sort) => setState({ ...state, sort })}
          />
        )}

        <Radio
          scrollDisabled
          className='bg-white'
          size='sm'
          options={
            dateFields.length
              ? Object.values(ListingModeEnum)
              : [ListingModeEnum.Listing, ListingModeEnum.Gallery]
          }
          getOptionLabel={(option) => trans({ id: option })}
          value={state.mode}
          onChange={(mode) =>
            setState({
              ...state,
              mode: mode || ListingModeEnum.Listing,
            })
          }
        />
        <div className='d-flex gap-3 ms-sm-auto'>
          {bulkActions?.map(({ render }, index) => (
            <Fragment key={index}>{render({ selectedItems })}</Fragment>
          ))}
          {exportableColumns && Object.keys(exportableColumns) && (
            <ModelExportButton
              modelName={modelName}
              items={selectedItems}
              columns={exportableColumns}
            />
          )}
          <RouteLinks
            operations={operations.filter(
              ({ resource, operationType }) =>
                resource.name === modelName && operationType === ViewEnum.Create
            )}
            linkProps={{
              state: parentColumnMapping &&
                item && {
                  [inverseBy]:
                    "multiple" in parentColumnMapping ? [item] : item,
                },
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
              setSelectedItems={
                bulkActions
                  ? (selectedItems) => setState({ ...state, selectedItems })
                  : undefined
              }
              renderAction={({ item }) => (
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
          renderAction={({ item }) => (
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
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              navLinks
              initialView='dayGridMonth'
              buttonText={{
                prevYear: trans({ id: "PREV_YEAR" }),
                nextYear: trans({ id: "NEXT_YEAR" }),
                today: trans({ id: "TODAY" }),
                month: trans({ id: "MONTH" }),
                week: trans({ id: "WEEK" }),
                day: trans({ id: "DAY" }),
              }}
              eventContent={({ event }) => {
                const { hydraItem } = event.extendedProps as ExtendedProps<M>;
                const title = hydraItem["@title"];

                return (
                  <Help
                    overlay={
                      <ItemView
                        rowClassName='w-300px text-start'
                        hideIcon
                        modelName={modelName}
                        detailView
                        columnDef={(
                          Object.keys(listingColumns) as Array<keyof Model<M>>
                        ).reduce(
                          (prev, curr) => ({
                            ...prev,
                            [curr]: columnDef[curr as keyof Model<M>],
                          }),
                          {} as ColumnDef<M>
                        )}
                        renderContent={({ columnName }) => {
                          const def = columnDef[columnName];
                          const column = listingColumns[columnName];

                          return (
                            <DetailViewColumnContent
                              item={hydraItem}
                              columnName={columnName}
                              render={
                                typeof column !== "boolean"
                                  ? column?.render
                                  : undefined
                              }
                              columnMapping={def}
                            />
                          );
                        }}
                      />
                    }
                  >
                    <div className='fw-bolder text-truncate ms-2'>{title}</div>
                  </Help>
                );
              }}
              locale={locale}
              events={events}
              firstDay={1}
              datesSet={setDatesSet}
              eventClick={(arg) => navigate(arg.event.id)}
              eventMouseEnter={({ el }) => el.classList.add("cursor-pointer")}
              eventMouseLeave={({ el }) =>
                el.classList.remove("cursor-pointer")
              }
            />
          </div>
        </div>
      )}
      {mode !== ListingModeEnum.Calendar && (
        <Pagination
          size='sm'
          page={page}
          onPageChange={(page) => {
            setState({ ...state, page });
          }}
          onItemsPerPageChange={(itemsPerPage) => {
            setState({ ...state, page: 1, itemsPerPage });
          }}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};
