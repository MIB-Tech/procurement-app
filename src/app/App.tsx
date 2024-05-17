import React, { Suspense } from "react";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import AuthInit from "./pages/auth/redux/AuthInit";
import { AppRoutes } from "./routing/AppRoutes";
import { ToastProvider } from "../_custom/Toastr/Toastr.provider";
import { RecoilRoot } from "recoil";
import moment from "moment-timezone";

moment.tz.setDefault("Etc/UTC");

type Props = {
  basename: string;
};

const App: React.FC<Props> = ({ basename }) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {/*<BrowserRouter basename={basename}>*/}
      <I18nProvider>
        <RecoilRoot>
          <ToastProvider>
            <LayoutProvider>
              <AuthInit>
                <AppRoutes />
              </AuthInit>
            </LayoutProvider>
          </ToastProvider>
        </RecoilRoot>
      </I18nProvider>
      {/*</BrowserRouter>*/}
    </Suspense>
  );
};

export { App };
