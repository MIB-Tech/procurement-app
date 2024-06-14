import moment, { MomentInput } from "moment";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../setup";
import { AuthState } from "../pages/auth";
import { getRoutePrefix } from "../../_core/utils";
import { OperationPermission, Permission } from "../../_core/hooks/UseAuth";

export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = 'http://192.168.240.52:83';
// alert(API_URL)
export const toAbsoluteApi = (path: string) => `${API_URL + path}`;
export const getDurationTextFromDiff = ({
  diff,
  formatTemplate = "d __, h_, m_",
}: {
  diff: number;
  formatTemplate?: string;
}) => moment.duration(diff).format(formatTemplate, { trim: "all" });
export const getDurationText = ({
  start,
  end,
  formatTemplate = "d __, h_, m_",
}: {
  start: MomentInput;
  end: MomentInput;
  formatTemplate?: string;
}) =>
  getDurationTextFromDiff({ diff: moment(end).diff(start), formatTemplate });
export const useTenant = () => {
  const { user, tenant } = useSelector<RootState>(
    (state) => state.auth,
    shallowEqual
  ) as Required<Pick<AuthState, "user">> & Pick<AuthState, "tenant">;

  return {
    tenant,
    tenants: user.clinics,
  };
};
