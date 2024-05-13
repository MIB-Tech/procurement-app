/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { FC } from "react";
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { PrivateRoutes } from "./PrivateRoutes";
import { Logout } from "../pages/auth";
import { ErrorsPage } from "../pages/errors/ErrorsPage";
import { RootState } from "../../setup";
import { PublicRoutes } from "./PublicRoutes";
import { ErrorContent } from "../pages/errors/ErrorContent";

const AppRoutes: FC = () => {
  const isAuthorized = useSelector<RootState>(
    ({ auth }) => auth.user,
    shallowEqual
  );
  const router = createBrowserRouter([
    { path: "/logout", element: <Logout /> },
    {
      path: "/error",
      element: <ErrorsPage />,
      children: [
        { path: ":code", element: <ErrorContent /> },
        { index: true, element: <Navigate to='/error/404' /> },
      ],
    },
    {
      path: "/*",
      element: isAuthorized ? <PrivateRoutes /> : <PublicRoutes />,
    },
  ]);

  return <RouterProvider router={router} />;

  // return (
  //   <Routes>
  //     <Route path='/logout' element={<Logout />} />
  //     <Route path='/error' element={<ErrorsPage />}>
  //       <Route path='403' element={<Error403 />} />
  //       <Route path='404' element={<Error404 />} />
  //       <Route path='500' element={<Error500 />} />
  //       <Route path='/error' element={<Navigate to='/error/404' />} />
  //       <Route element={<Navigate to='/error/404' />} />
  //     </Route>
  //     <Route path='/*' element={isAuthorized ? <PrivateRoutes /> : <PublicRoutes />} />:
  //   </Routes>
  // );

  // return (
  //   <>
  //     <Routes>
  //       {!isAuthorized ? (
  //         /*Render auth page when user at `/auth` and not authorized.*/
  //         <Route element={<PublicRoutes />} />
  //         // <Route>
  //         //   <AuthPage />
  //         // </Route>
  //       ) : (
  //         /*Otherwise redirect to root page (`/`)*/
  //         <Route path='/auth' element={<Navigate to='/' />} />
  //
  //       )}
  //
  //       <Route path='/error' element={ErrorsPage} />
  //       <Route path='/logout' element={Logout} />
  //
  //       {!isAuthorized ? (
  //         /*Redirect to `/auth` when user is not authorized*/
  //         <Route element={<Navigate to='/auth/login' />} />
  //       ) : (
  //         <Route element={
  //           <PageDataProvider>
  //             <MasterLayout>
  //               <PrivateRoutes />
  //             </MasterLayout>
  //           </PageDataProvider>
  //         } />
  //
  //       )}
  //     </Routes>
  //     <MasterInit />
  //   </>
  // )
};

export { AppRoutes };
