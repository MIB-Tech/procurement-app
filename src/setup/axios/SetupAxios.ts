import { Store } from "redux";
import { actions, AuthState } from "../../app/pages/auth";
import { AxiosError, AxiosInstance } from "axios";
import { API_URL } from "../../app/modules/utils";
import * as api from "../../app/pages/auth/redux/AuthCRUD";

import { PRINTER_API_URL } from "../../_custom/hooks/UseZebraPrinter";

export enum JWTResponseMessage {
  Invalid = "JWT_INVALID",
  Failure = "AUTHENTICATION_FAILURE",
  // NotFound = 'JWT_NOT_FOUND',
  Expired = "JWT_EXPIRED",
}

export type JWTResponse = {
  code: string;
  message: JWTResponseMessage;
};

export default function setupAxios(
  axios: AxiosInstance,
  store: Store<{ auth: AuthState }>
) {
  axios.defaults.baseURL = API_URL;
  axios.interceptors.request.use((config) => {
    const { token, clinic } = store.getState().auth;
    if (!config.url?.startsWith(PRINTER_API_URL)) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (clinic) {
        config.headers["Tenant-Clinic"] = clinic.id;
      }
    }

    return config;
  }, Promise.reject);
  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<JWTResponse>) => {
      const { response, config } = error;
      if (response) {
        const { dispatch, getState } = store;
        const { refreshToken } = getState().auth;
        switch (response?.status) {
          case 401:
            switch (response.data.message) {
              case JWTResponseMessage.Expired:
                if (refreshToken) {
                  const { data } = await api.refreshToken(refreshToken);
                  dispatch(actions.login(data));

                  return axios(config);
                }
                break;
              case JWTResponseMessage.Invalid:
                dispatch(actions.logout());

                return axios(config);
            }
            break;
          case 403:
            dispatch(actions.logout());

            return axios(config);
        }
      }

      return Promise.reject(error);
    }
  );
}
