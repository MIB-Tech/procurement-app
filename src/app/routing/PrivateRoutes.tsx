import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EmptyPage } from '../pages/EmptyPage';
import { useAuth } from '../../_custom/hooks/UseAuth';
import {
  ColumnMapping,
  DetailColumns,
  Model,
  ModelMapping,
  ViewEnum
} from '../../_custom/types/ModelMapping';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import { PageDataProvider } from '../../_metronic/layout/core';
import { DeleteView } from '../../_custom/DeleteView/DeleteView';
import { ListingView } from '../../_custom/ListingView/ListingView';
import { MODEL_MAPPINGS } from '../modules';
import { DetailView } from '../../_custom/DetailView/DetailView';
import { camelCaseToDash } from '../../_custom/utils';
import { StringFormat } from '../../_custom/Column/String/StringColumn';
import { RouteKeyEnum } from '../modules/Route/Model';
import { FormView } from '../../_custom/FormView/FormView';
import { ColumnTypeEnum } from '../../_custom/types/types';
import { ModelEnum } from '../modules/types';
import { CalendarView } from '../../_custom/CalendarView/CalendarView';
import { isMenuRoute } from '../../_metronic/layout/components/aside/AsideMenuMain';
import { ImportView } from '../../_custom/ImportView/ImportView';


const PRIVATE_ROUTE_COMPONENTS: Partial<Record<RouteKeyEnum, { component?: React.FC }>> = {
  [RouteKeyEnum.AccountUpdate]: {},
  [RouteKeyEnum.AccountOverview]: {},
  [RouteKeyEnum.AccountUpdatePassword]: {},
};

export function PrivateRoutes() {
  const { routes } = useAuth();
  const defaultRoute = routes.find(isMenuRoute);
  // FIXME route render wrong route issue

  return (
    <Routes>
      <Route element={(<PageDataProvider><MasterLayout /></PageDataProvider>)}>
        {(Object.values(ModelEnum) as ModelEnum[]).map(modelName => {
          const { views, columnDef } = MODEL_MAPPINGS[modelName] as ModelMapping<any>;

          return views?.map((view, viewIndex) => {
            const {routeKey, type} = view
            const route = routes.find(route => route.routeKey === routeKey);
            if (!route) {
              return <></>;
            }

            switch (type) {
              case ViewEnum.Listing:
                return (
                  <Route
                    path={route.treePath}
                    element={<ListingView modelName={modelName} view={view} />}
                  />
                );
              case ViewEnum.Calendar:
                return (
                  <Route
                    path={route.treePath}
                    element={<CalendarView modelName={modelName} view={view} />}
                  />
                );
              case ViewEnum.Detail:
                const columns = view.columns ?
                  view.columns :
                  (Object.keys(columnDef) as Array<keyof Model<any>>).filter(columnName => {
                    if (columnName === 'id') {
                      return false
                    }
                    const def = columnDef[columnName]
                    switch (def.type) {
                      case ColumnTypeEnum.String:
                        return def.format !== StringFormat.Password
                      case ColumnTypeEnum.Array:
                        return false;
                      default:
                        return true
                    }
                  }).reduce(
                    (obj, columnName) => ({ ...obj, [columnName]: true }),
                    {} as DetailColumns<any>
                  )

                const embeddedColumnNames = Object.keys(columns).filter(columnName => {
                  const def = columnDef[columnName] as ColumnMapping<any>| undefined
                  if (!def) {
                    return <></>
                  }

                  switch (def.type) {
                    case ColumnTypeEnum.String:
                    case ColumnTypeEnum.Number:
                    case ColumnTypeEnum.Boolean:
                      return false;
                    default:
                      return true;
                  }
                });

                return (
                  <>
                    <Route
                      path={route.treePath}
                      element={<DetailView modelName={modelName} view={view} />}
                    >
                      {embeddedColumnNames.map(embeddedColumnName => (
                        <Route
                          key={embeddedColumnName}
                          path={camelCaseToDash(embeddedColumnName)}
                          element={<>`${embeddedColumnName}`</>}
                        />
                      ))}
                    </Route>
                  </>
                );
              case ViewEnum.Delete:
                return (
                  <Route
                    path={route.treePath}
                    element={<DeleteView modelName={modelName} />}
                  />
                );
              case ViewEnum.Form:
                return (
                  <Route
                    path={route.treePath}
                    element={<FormView modelName={modelName} view={view} />}
                  />
                );
              case ViewEnum.Import:
                return (
                  <Route
                    path={route.treePath}
                    element={<ImportView modelName={modelName} view={view}/>}
                  />
                );
            }
          })
        })}

        {routes.map(route => {
          const { routeKey, treePath } = route;
          const { component: Element = EmptyPage } = PRIVATE_ROUTE_COMPONENTS[routeKey] || {};

          return (
            <Route
              key={routeKey}
              path={treePath}
              element={<Element />}
            />
          );
        })}
      </Route>
      {defaultRoute && defaultRoute.treePath && <Route path='/' element={<Navigate to={defaultRoute.treePath} />} />}
      <Route path='/auth/*' element={<Navigate to='/' />} />
      {/*{routes.length > 0 && <Route path='/auth' element={<Navigate to={`/error/${routes.length === 0 ? 403 : 404}`} />} /> }*/}
      <Route path='*' element={<Navigate to={`/error/${routes.length === 0 ? 403 : 404}`} />} />
    </Routes>
  )

  // return (
  //   <Suspense fallback={<FallbackView />}>
  //     <PageWrapper>
  //       <Routes>
  //         {routes.map(({ routeKey, treePath }) => {
  //           const {component = EmptyPage} = PRIVATE_ROUTE_COMPONENTS[routeKey] || {}
  //
  //           return (
  //             <Route
  //               key={routeKey}
  //               path={treePath}
  //               element={component}
  //               // exact
  //             />
  //           );
  //         })}
  //         {defaultRoute && defaultRoute.treePath && <Route path='/' element={<Navigate to={defaultRoute.treePath}
  // />}/>} <Route path='/auth' element={<Navigate to='/' />} /> {routes.length > 0 && <Navigate
  // to={`/error/${routes.length === 0 ? 403 : 404}`} />} </Routes> </PageWrapper> </Suspense> )
}
