import React, { useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMapping } from '../hooks/UseMapping';
import { SearchToolbar } from '../ListingView/Search/SearchToolbar';
import { CALENDAR_FAMILY } from '../../app/modules';
import { DateField, Model } from '../types/ModelMapping';
import { CalendarViewProps, DatesSet } from './CalendarView.types';
import { ToolbarWrapper } from '../ListingView/ToolbarWrapper';
import { StringFormat } from '../Column/String/StringColumn';
import { useAuth } from '../hooks/UseAuth';
import { RouteLinks } from '../components/RouteAction/RouteLinks';
import { useOperation } from '../hooks/UseOperation';
import { ColumnTypeEnum } from '../types/types';
import { ModelEnum } from '../../app/modules/types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput, EventSourceInput } from '@fullcalendar/core';
import { useCalendarQuery } from '../hooks/UseCalendarQuery';
import { useTrans } from '../components/Trans';
import moment from 'moment';
import { HydraItem } from '../types/hydra.types';
import clsx from 'clsx';


type ExtendedProps<M extends ModelEnum> = {
  hydraItem: HydraItem
  dateField: DateField<M>
}
export const CalendarView = <M extends ModelEnum>({ modelName, view, path }: CalendarViewProps<M>) => {
  const { navigate } = useAuth();
  const [datesSet, setDatesSet] = useState<DatesSet>({
    start: moment().startOf('month').toDate(),
    end: moment().endOf('month').toDate()
  });
  const { locale, trans } = useTrans();
  const calendarRef = useRef<any>();
  const { user } = useAuth();
  const { searchable, columnDef } = useMapping({ modelName });
  const { filterColumns, sortColumns, columns, routeKey, itemOperationRoutes, dateFields } = view;
  // TODO: embedded state
  const [params, setParams] = useRecoilState(CALENDAR_FAMILY({ modelName }));
  const { search, filter/*, sort, page, itemsPerPage */ } = params;

  const { collection, totalCount, isLoading } = useCalendarQuery<M>({
    modelName,
    params,
    dateFields,
    datesSet,
    path
  });
  const { route, staticRoutes, dynamicRoutes } = useOperation(routeKey);
  const events = useMemo<EventSourceInput>(() => {
    let _events: EventInput[] = [];
    collection.forEach(item => {
      dateFields.forEach(dateField => {
        const {startProperty, endProperty, variant} = dateField
        const extendedProps:ExtendedProps<M> = {
          hydraItem: item,
          dateField
        }

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
    (Object.keys(filterColumns) as Array<string | keyof Model<M>>).filter(filterColumn => {
      const columnFilterValue = filterColumns[filterColumn];
      if (typeof columnFilterValue === 'boolean') {
        return columnFilterValue;
      }

      return user && columnFilterValue?.display({ user });
    }) :
    (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
      if (columnName === 'id') {
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

  return (
    <>
      <ToolbarWrapper className='d-flex me-2'>
        {searchable && (
          <SearchToolbar
            className='mw-200px me-3'
            value={search}
            delay={500}
            onChange={search => {
              setParams({ ...params, search/*, page: 1*/ });
            }}
          />
        )}
        {/*{filterColumNames.length > 0 && (*/}
        {/*  <FilterToolbar*/}
        {/*    modelName={modelName}*/}
        {/*    columns={filterColumNames.reduce(*/}
        {/*      (obj, columnName) => ({ ...obj, [columnName]: true }),*/}
        {/*      {} as FilterColumns<M>*/}
        {/*    )}*/}
        {/*    value={filter}*/}
        {/*    onChange={filter => {*/}
        {/*      setParams({ ...params, filter });*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{sortColumNames.length > 0 && (*/}
        {/*  <SortToolbar*/}
        {/*    className='ms-3'*/}
        {/*    sort={sort}*/}
        {/*    columnDef={sortColumNames.reduce(*/}
        {/*      (obj, columnName) => ({ ...obj, [columnName]: columnDef[columnName] }),*/}
        {/*      {} as ColumnDef<M>*/}
        {/*    )}*/}
        {/*    onChange={sort => {*/}
        {/*      setParams({ ...params, sort });*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}

        <div className='ms-auto ps-2'>
          <RouteLinks
            itemOperations={staticRoutes.map(({ routeKey }) => ({ routeKey }))}
          />
        </div>
      </ToolbarWrapper>
      <div className='card'>
        <div className='card-body'>
          <FullCalendar
            height='auto'
            ref={calendarRef}
            plugins={[momentPlugin, dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            navLinks
            initialView='dayGridMonth'
            buttonText={{
              prevYear: trans({ id: 'PREV_YEAR' }),
              nextYear: trans({ id: 'NEXT_YEAR' }),
              today: trans({ id: 'TODAY' }),
              month: trans({ id: 'MONTH' }),
              week: trans({ id: 'WEEK' }),
              day: trans({ id: 'DAY' })
            }}
            eventContent={(renderProps, createElement) => {
              const { hydraItem, dateField } = renderProps.event.extendedProps as ExtendedProps<M>
              const { startProperty, endProperty, variant } = dateField

              return (
                <div className='fw-bolder text-truncate ms-2' title={hydraItem['@title']}>
                  {hydraItem['@title']}
                </div>
              )
            }}
            locale={locale}
            events={events}
            firstDay={1}
            datesSet={setDatesSet}
            eventClick={arg => {
              navigate(arg.event.id);
            }}
            eventMouseEnter={arg => {
              arg.el.classList.add('cursor-pointer');
            }}
            eventMouseLeave={arg => {
              arg.el.classList.remove('cursor-pointer');
            }}
          />
        </div>
      </div>
    </>
  );
};
