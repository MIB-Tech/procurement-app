import axios from "axios";
import { HydraItem } from "../../../../_core/types/hydra.types";
import { UserModel } from "../../../modules/User";
import { Token } from "./AuthRedux";
import { ModelEnum } from "../../../modules/types";

export type LoginCredentials = Required<
  Pick<UserModel, "username" | "password">
>;
// Server should return AuthModel
export const getToken = (credentials: LoginCredentials) =>
  axios.post<Token>("/custom/auth/login", credentials);
export const refreshToken = (refreshToken: string) =>
  axios.post<Token>("/custom/auth/refresh", { refreshToken });

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post("/custom/register", {
    email,
    firstname,
    lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>("/custom/forgot_password", {
    email,
  });
}

export const getAuthenticatedUser = () =>
  axios.get<HydraItem<ModelEnum.User>>("/users/me");
