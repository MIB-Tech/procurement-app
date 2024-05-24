import { useIntl } from "react-intl";
import { I18nMessageKey } from "../i18n/I18nMessages";
import { MessageDescriptor } from "@formatjs/intl/src/types";
import { useLang } from "../../_metronic/i18n/Metronici18n";

export type FormattedMessageProps = {
  id: I18nMessageKey;
  values?: Record<any, any>;
} & MessageDescriptor;
export const Trans = ({ id, values }: FormattedMessageProps) => {
  const { trans } = useTrans();

  return <>{trans({ id, values })}</>;
};

export const useTrans = () => {
  const { formatMessage } = useIntl();
  const locale = useLang();
  const trans = ({ values, ...descriptor }: FormattedMessageProps) =>
    formatMessage(descriptor, values);

  return {
    trans,
    locale,
  };
};
