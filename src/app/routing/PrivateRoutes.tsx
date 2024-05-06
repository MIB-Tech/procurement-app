import React, {ReactNode} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useAuth} from '../../_custom/hooks/UseAuth'
import {DetailViewType, Model, ModelMapping, ViewEnum} from '../../_custom/types/ModelMapping'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PageDataProvider} from '../../_metronic/layout/core'
import {DeleteView} from '../../_custom/DeleteView/DeleteView'
import {ListingView} from '../../_custom/ListingView/ListingView'
import {MODEL_MAPPINGS} from '../modules'
import {DEFAULT_DETAIL_VIEW, DetailView} from '../../_custom/DetailView/DetailView'
import {camelCaseToDash, getRoutePrefix} from '../../_custom/utils'
import {CreateView} from '../../_custom/CreateView/CreateView'
import {UpdateView} from '../../_custom/UpdateView/UpdateView'
import {ModelEnum} from '../modules/types'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {RoleKeyEnum} from '../modules/Role/Model'
import {BudgetMonitoringPage} from '../pages/BudgetMonitoring/BudgetMoritoring'
import {ExtractionPage} from '../pages/Extraction/Extraction'
import {I18nMessageKey} from '../../_custom/i18n/I18nMessages'
import {PathRouteProps} from 'react-router/dist/lib/components'
import {HydraItem} from '../../_custom/types/hydra.types'
import {ReceiptCompliancePage} from "../pages/ReceiptCompliance/ReceiptCompliance";

type CustomRoute = {
  title: I18nMessageKey,
  icon: string,
  granted: Array<RoleKeyEnum>
} & Pick<PathRouteProps, 'path' | 'element'>

export const CUSTOM_ROUTES: Array<CustomRoute> = [
  {
    path: 'dashboard',
    title: 'DASHBOARD',
    icon: '/graphs/gra010.svg',
    granted: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin, RoleKeyEnum.Viewer],
    element: <DashboardWrapper />,
  },
  {
    path: 'budget-monitoring',
    title: 'BUDGET_MONITORING',
    icon: '/graphs/gra004.svg',
    granted: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin, RoleKeyEnum.Viewer],
    element: <BudgetMonitoringPage />,
  },
  {
    path: 'extraction',
    title: 'EXTRACTION',
    icon: '/files/fil017.svg',
    granted: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin, RoleKeyEnum.Viewer],
    element: <ExtractionPage />,
  },
  {
    path: 'receipt-compliance',
    title: 'RECEIPT_COMPLIANCE',
    icon: '/ecommerce/ecm010.svg',
    granted: [RoleKeyEnum.SuperAdmin, RoleKeyEnum.Admin,RoleKeyEnum.Referent],
    element: <ReceiptCompliancePage/>,
  },
]
export const navigateOnMutate = <M extends ModelEnum>(item: HydraItem<M>) => item['@id'] + '/update'
export const RELATED_MODELS = [
  ModelEnum.User,
  ModelEnum.PurchaseOrder,
]

export function PrivateRoutes() {
  const {operations, getPath, isGranted} = useAuth()
  const defaultOperation = operations
    .sort((a, b) => a.resource.sortIndex - b.resource.sortIndex)
    .find(operation => operation.isMenuItem && operation.operationType === ViewEnum.Listing)
  // FIXME route render wrong route issue
  const isAdmin = isGranted([RoleKeyEnum.Viewer, RoleKeyEnum.SuperAdmin, RoleKeyEnum.SuperAdmin])

  const indexPath = isAdmin ?
    'dashboard' :
    defaultOperation && getPath({
      resourceName: defaultOperation.resource.name,
      suffix: defaultOperation.suffix,
    })


  return (
    <Routes>
      <Route element={(<PageDataProvider><MasterLayout /></PageDataProvider>)}>
        {CUSTOM_ROUTES.filter(route => isGranted(route.granted)).map(route => {

          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          )
        })}

        {operations.filter(operation => Object.values(ModelEnum).includes(operation.resource.name)).map(operation => {
          const {resource, suffix, operationType} = operation
          const resourceName = resource.name
          const path = getRoutePrefix(resourceName) + '/' + suffix
          let element: ReactNode
          switch (operationType) {
            case ViewEnum.Listing:
              element = <ListingView modelName={resourceName} />
              break
            case ViewEnum.Create:
              element = <CreateView modelName={resourceName} />
              break
            case ViewEnum.Detail:
              element = <DetailView modelName={resourceName} />
              break
            case ViewEnum.Update:
              element = <UpdateView modelName={resourceName} />
              break
            case ViewEnum.Delete:
              element = <DeleteView modelName={resourceName} />
              break
          }

          const {views, columnDef} = MODEL_MAPPINGS[resourceName] as ModelMapping<any>
          const detailView = (views?.find(view => view.type === ViewEnum.Detail) || DEFAULT_DETAIL_VIEW) as DetailViewType<any>

          return (
            <Route
              key={resource.id}
              path={path}
              element={element}
            >
              {(Object.keys(detailView.columns || columnDef) as Array<keyof Model<any> | string>).map(embeddedColumnName => {
                const _embeddedColumnName = embeddedColumnName.toString()

                return (
                  <Route
                    key={_embeddedColumnName}
                    path={camelCaseToDash(_embeddedColumnName)}
                    element={<>`${_embeddedColumnName}`</>}
                  >
                    <Route
                      path={camelCaseToDash(_embeddedColumnName)}
                      element={<>`${_embeddedColumnName}`</>}
                    >
                    </Route>
                  </Route>
                )
              })}
            </Route>
          )
        })}
        {/*{(Object.values(ModelEnum) as ModelEnum[]).map(modelName => {*/}
        {/*  const { views, columnDef } = MODEL_MAPPINGS[modelName] as ModelMapping<any>;*/}

        {/*  return views?.map((view) => {*/}
        {/*    const { type } = view;*/}

        {/*    const operation = operations.find(operation => {*/}
        {/*      if (operation.resource.name !== modelName) {*/}
        {/*        return false;*/}
        {/*      }*/}

        {/*      return operation.operationType;*/}
        {/*    });*/}
        {/*    if (!operation) {*/}
        {/*      return <></>;*/}
        {/*    }*/}

        {/*    const { suffix, resource } = operation;*/}
        {/*    const path = getRoutePrefix(resource.name) + '/' + suffix;*/}

        {/*    switch (type) {*/}
        {/*      case ViewEnum.Listing:*/}
        {/*        return (*/}
        {/*          <Route*/}
        {/*            path={path}*/}
        {/*            element={<ListingView modelName={modelName} />}*/}
        {/*          />*/}
        {/*        );*/}
        {/*      // case ViewEnum.Calendar:*/}
        {/*      //   return (*/}
        {/*      //     <Route*/}
        {/*      //       path={path}*/}
        {/*      //       element={<CalendarView modelName={modelName} view={view} />}*/}
        {/*      //     />*/}
        {/*      //   );*/}
        {/*      case ViewEnum.Detail:*/}
        {/*        const embeddedColumnNames = (Object.keys(view.columns || columnDef) as Array<keyof Model<any> | string>);*/}
        {/*        const _embeddedColumnNames = embeddedColumnNames.filter(columnName => {*/}
        {/*          const def = columnDef[columnName] as ColumnMapping<any> | undefined;*/}
        {/*          if (!def) return true;*/}

        {/*          switch (def.type) {*/}
        {/*            case ColumnTypeEnum.Number:*/}
        {/*            case ColumnTypeEnum.String:*/}
        {/*            case ColumnTypeEnum.Boolean:*/}
        {/*            case ColumnTypeEnum.Array:*/}
        {/*              return false;*/}
        {/*            default:*/}
        {/*              return 'multiple' in def;*/}
        {/*          }*/}
        {/*        });*/}

        {/*        return (*/}
        {/*          <>*/}
        {/*            <Route*/}
        {/*              path={path}*/}
        {/*              element={<DetailView modelName={modelName} view={view} />}*/}
        {/*            >*/}
        {/*              {_embeddedColumnNames.map(embeddedColumnName => {*/}
        {/*                const _embeddedColumnName = embeddedColumnName.toString();*/}

        {/*                return (*/}
        {/*                  <Route*/}
        {/*                    key={_embeddedColumnName}*/}
        {/*                    path={camelCaseToDash(_embeddedColumnName)}*/}
        {/*                    element={<>`${_embeddedColumnName}`</>}*/}
        {/*                  >*/}
        {/*                    /!*TODO*!/*/}
        {/*                    <Route*/}
        {/*                      path={camelCaseToDash(_embeddedColumnName)}*/}
        {/*                      element={<>`${_embeddedColumnName}`</>}*/}
        {/*                    >*/}
        {/*                    </Route>*/}
        {/*                  </Route>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </Route>*/}
        {/*          </>*/}
        {/*        );*/}
        {/*      case ViewEnum.Delete:*/}
        {/*        return (*/}
        {/*          <Route*/}
        {/*            path={path}*/}
        {/*            element={<DeleteView modelName={modelName} />}*/}
        {/*          />*/}
        {/*        );*/}
        {/*      // case ViewEnum.Form:*/}
        {/*      //   return (*/}
        {/*      //     <Route*/}
        {/*      //       path={path}*/}
        {/*      //       element={<FormView modelName={modelName} view={view} />}*/}
        {/*      //     />*/}
        {/*      //   );*/}
        {/*      // case ViewEnum.Import:*/}
        {/*      //   return (*/}
        {/*      //     <Route*/}
        {/*      //       path={path}*/}
        {/*      //       element={<ImportView modelName={modelName} view={view} />}*/}
        {/*      //     />*/}
        {/*      //   );*/}
        {/*    }*/}
        {/*  })*/}
        {/*})}*/}
      </Route>
      {indexPath && <Route path="/" element={<Navigate to={indexPath} />} />}
      <Route path="/auth/*" element={<Navigate to="/" />} />
      {/*{routes.length > 0 && <Route path='/auth' element={<Navigate to={`/error/${routes.length === 0 ? 403 : 404}`} />} /> }*/}
      <Route path="*" element={<Navigate to={`/error/${operations.length === 0 ? 403 : 404}`} />} />
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