import moment, { MomentInput } from "moment";

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
