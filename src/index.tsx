import React from "react";
import ReactDOM from "react-dom";
// Redux
// https://github.com/rt2zz/redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import * as _redux from "./setup";
import store, { persistor } from "./setup/redux/Store";
// Axios
import axios from "axios";
import { Chart, registerables } from "chart.js";

// Apps
import { App } from "./app/App";
import { MetronicI18nProvider } from "./_metronic/i18n/Metronici18n";
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import "./_metronic/assets/sass/style.scss";
import "./_metronic/assets/sass/style.react.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import { DefaultLayoutConfig } from "./_metronic/layout/core";
import { LoadingLabel } from "./_core/components/Skeleton";
import { QueryClient, QueryClientProvider } from "react-query";
import { toAbsoluteApi } from "./app/modules/utils";
import { toAbsoluteUrl } from "./_metronic/helpers";
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.viewer";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);

Chart.register(...registerables);

export const theme = createTheme({
  palette: {
    primary: {
      main: DefaultLayoutConfig.main?.primaryColor || "#1184C3",
      light: "#CADDEA",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          display: "block",
          width: "100%",
          padding: "",
        },
      },
    },
  },
});

export const queryClient = new QueryClient();

Stimulsoft.Base.StiLicense.loadFromFile(
  toAbsoluteUrl("/stimulsoft/license.key")
);

// Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkgqCns7D9La7htJmqPDFTkiI+v/o3UclYdglUWTm9ZjaU7MZ" +
//   "dtKK9+cYyczRP7JnHYAFOTvsjjK54Jo4TRY9numTNQtvEFjGXAWkLddL8m5+a4Ud/IRkZrnnvLpaSqA2QJph4Lk+1J" +
//   "ZRqjZ5ABBa3c0F3xVAv86dQXP4ZBvgpRdr11+rTI0CKFs4XDZ0tTW6MLIjRlqTacDhtZrJ0bEPFSfh4Y10qrDaePzi" +
//   "BDJwDTOuvzU2yFd42f7g9k1xECxwerjKNw1VeTujfM9+zkT9X3j6krAL4b0DTSBMluSO0+cK5z7BEuLFB8TsGqPj1h" +
//   "wE1g0J/IcR117QPOLgAk3DhvdlSjhIs0Ie6ihZVons05c4HoUgYQDFX6z3Ou1Q9H+L7USCdPnW0ZBzilMWZkY4WkfC" +
//   "BxuRheNrDSE+aAsp+r+3Km/oAY1tl/m1W3t64qEFeQK19ES+IxqKFk+klNZmhbVPRJiN/BGfpaUbUVhsS7zmTZki1t" +
//   "kYOR5y5aNtKEKY+O0hs29uEXne03ooi/Ey/I";

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate
        persistor={persistor}
        loading={<LoadingLabel />}
      >
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App basename={PUBLIC_URL} />
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById("root")
);
