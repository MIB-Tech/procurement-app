import { Action } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getAuthenticatedUser } from "./AuthCRUD";
import { UserModel } from "../../../modules/User";
import { HydraItem } from "../../../../_core/types/hydra.types";
import { ModelEnum } from "../../../modules/types";

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetTenant: "[Set Tenant] Action",
};

const initialAuthState: AuthState = {
  user: undefined,
  tenant: undefined,
  token: undefined,
  refreshToken: undefined,
};

export type Token = {
  token: string;
  refreshToken: string;
};

export type AuthState = {
  user?: HydraItem<ModelEnum.User>;
  tenant?: HydraItem<ModelEnum.Clinic>;
} & Partial<Token>;

export const reducer = persistReducer(
  {
    storage,
    key: "v100-demo1-auth",
    whitelist: ["user", "tenant", "token", "refreshToken"],
  },
  (
    state: AuthState = initialAuthState,
    action: ActionWithPayload<AuthState>
  ) => {
    switch (action.type) {
      case actionTypes.Login:
      case actionTypes.Register:
        const token = action.payload || {
          token: undefined,
          refreshToken: undefined,
        };

        return { ...state, ...token };
      case actionTypes.Logout:
        return initialAuthState;
      case actionTypes.UserLoaded:
        const user = action.payload?.user;

        return { ...state, user };
      case actionTypes.SetTenant:
        return { ...state, tenant: action.payload?.tenant };
      default:
        return state;
    }
  }
);

export const actions = {
  login: (token: Token) => ({ type: actionTypes.Login, payload: token }),
  register: (token: Token) => ({
    type: actionTypes.Register,
    payload: token,
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  fulfillUser: (user: UserModel) => ({
    type: actionTypes.UserLoaded,
    payload: { user },
  }),
  setTenant: (tenant: HydraItem<ModelEnum.Clinic> | undefined) => ({
    type: actionTypes.SetTenant,
    payload: { tenant },
  }),
};

// function* requestUser() {
//   yield put(actions.requestUser())
// }
export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getAuthenticatedUser();
    yield put(actions.fulfillUser(user));
  });
}
