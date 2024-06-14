import { FC, useEffect } from "react";
import { useLang } from "./Metronici18n";
import moment from "moment";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/fr";
import "@formatjs/intl-relativetimeformat/locale-data/ar";
import "moment/locale/fr";
import "moment/locale/en-gb";
import "moment/locale/ar";
import { setLocale } from "yup";
import { I18N_MESSAGES, Lang } from "../../_core/i18n/I18nMessages";
import { LocaleSpecification } from "moment/moment";

setLocale({
  mixed: {
    default: (props) => ({ id: "VALIDATION.MIXED.DEFAULT", params: props }),
    required: (props) => ({ id: "VALIDATION.MIXED.REQUIRED", params: props }),
    oneOf: (props) => ({ id: "VALIDATION.MIXED.ONE_OF", params: props }),
    notOneOf: (props) => ({ id: "VALIDATION.MIXED.NO_ONE_OF", params: props }),
    // notType: ({ path, type, value, originalValue, ...props }) =>getIntlMessage({id:!value ?
    // "VALIDATION.MIXED.REQUIRED": "VALIDATION.MIXED.NOT_TYPE"}, params: props),
    notType: (props) => ({ id: "VALIDATION.MIXED.NOT_TYPE", params: props }),
    defined: (props) => ({ id: "VALIDATION.MIXED.DEFINED", params: props }),
  },
  number: {
    min: (props) => ({ id: "VALIDATION.NUMBER.MIN", params: props }),
    max: (props) => ({ id: "VALIDATION.NUMBER.MAX", params: props }),
    lessThan: (props) => ({ id: "VALIDATION.NUMBER.LESS_THAN", params: props }),
    moreThan: (props) => ({ id: "VALIDATION.NUMBER.MORE_THAN", params: props }),
    positive: (props) => ({ id: "VALIDATION.NUMBER.POSITIVE", params: props }),
    negative: (props) => ({ id: "VALIDATION.NUMBER.NEGATIVE", params: props }),
    integer: (props) => ({ id: "VALIDATION.NUMBER.INTEGER", params: props }),
  },

  string: {
    length: (props) => ({ id: "VALIDATION.STRING.LENGTH", params: props }),
    min: (props) => ({ id: "VALIDATION.STRING.MIN", params: props }),
    max: (props) => ({ id: "VALIDATION.STRING.MAX", params: props }),
    matches: (props) => ({ id: "VALIDATION.STRING.MATCHES", params: props }),
    email: (props) => ({ id: "VALIDATION.STRING.EMAIL", params: props }),
    url: (props) => ({ id: "VALIDATION.STRING.URL", params: props }),
    uuid: (props) => ({ id: "VALIDATION.STRING.UUID", params: props }),
    trim: (props) => ({ id: "VALIDATION.STRING.TRIM", params: props }),
    lowercase: (props) => ({
      id: "VALIDATION.STRING.LOWERCASE",
      params: props,
    }),
    uppercase: (props) => ({
      id: "VALIDATION.STRING.UPPERCASE",
      params: props,
    }),
  },
  date: {
    min: (props) => ({ id: "VALIDATION.DATE.MIN", params: props }),
    max: (props) => ({ id: "VALIDATION.DATE.MAX", params: props }),
  },
  object: {
    noUnknown: (props) => ({
      id: "VALIDATION.OBJECT.NO_UNKNOWN",
      params: props,
    }),
  },
  array: {
    min: (props) => ({ id: "VALIDATION.ARRAY.MIN", params: props }),
    max: (props) => ({ id: "VALIDATION.ARRAY.MAX", params: props }),
  },
});

const frLocale: Record<Lang, LocaleSpecification | any> = {
  fr: {
    durationLabelsStandard: {
      S: "milliseconde",
      SS: "millisecondes",
      s: "seconde",
      ss: "secondes",
      m: "minute",
      mm: "minutes",
      h: "heure",
      hh: "heures",
      d: "jour",
      dd: "jours",
      w: "semaine",
      ww: "semaines",
      M: "mois",
      MM: "mois",
      y: "année",
      yy: "années",
    },
    durationLabelsShort: {
      S: "msec",
      SS: "msecs",
      s: "sec",
      ss: "secs",
      m: "min",
      mm: "mins",
      h: "hr",
      hh: "hrs",
      d: "jr",
      dd: "jrs",
      w: "sm",
      ww: "sms",
      M: "mo",
      MM: "mos",
      y: "an",
      yy: "ans",
    },
    durationTimeTemplates: {
      HMS: "h:mm:ss",
      HM: "h:mm",
      MS: "m:ss",
    },
    durationLabelTypes: [
      { type: "standard", string: "__" },
      { type: "short", string: "_" },
    ],
    // durationPluralKey: durationPluralKey
  },
  ar: {
    durationLabelsStandard: {
      S: "milliseconde",
      SS: "millisecondes",
      s: "seconde",
      ss: "secondes",
      m: "minute",
      mm: "minutes",
      h: "heure",
      hh: "heures",
      d: "jour",
      dd: "jours",
      w: "semaine",
      ww: "semaines",
      M: "mois",
      MM: "mois",
      y: "année",
      yy: "années",
    },
    durationLabelsShort: {
      S: "msec",
      SS: "msecs",
      s: "sec",
      ss: "secs",
      m: "min",
      mm: "mins",
      h: "hr",
      hh: "hrs",
      d: "jr",
      dd: "jrs",
      w: "sm",
      ww: "sms",
      M: "mo",
      MM: "mos",
      y: "an",
      yy: "ans",
    },
    durationTimeTemplates: {
      HMS: "h:mm:ss",
      HM: "h:mm",
      MS: "m:ss",
    },
    durationLabelTypes: [
      { type: "standard", string: "__" },
      { type: "short", string: "_" },
    ],
    // durationPluralKey: durationPluralKey
  },
  en: {
    durationLabelsStandard: {
      S: "milliseconde",
      SS: "millisecondes",
      s: "seconde",
      ss: "secondes",
      m: "minute",
      mm: "minutes",
      h: "heure",
      hh: "heures",
      d: "jour",
      dd: "jours",
      w: "semaine",
      ww: "semaines",
      M: "mois",
      MM: "mois",
      y: "année",
      yy: "années",
    },
    durationLabelsShort: {
      S: "msec",
      SS: "msecs",
      s: "sec",
      ss: "secs",
      m: "min",
      mm: "mins",
      h: "hr",
      hh: "hrs",
      d: "jr",
      dd: "jrs",
      w: "sm",
      ww: "sms",
      M: "mo",
      MM: "mos",
      y: "an",
      yy: "ans",
    },
    durationTimeTemplates: {
      HMS: "h:mm:ss",
      HM: "h:mm",
      MS: "m:ss",
    },
    durationLabelTypes: [
      { type: "standard", string: "__" },
      { type: "short", string: "_" },
    ],
    // durationPluralKey: durationPluralKey
  },
};

const I18nProvider: FC = ({ children }) => {
  const locale: Lang = useLang();
  const messages = I18N_MESSAGES[locale];

  useEffect(() => {
    moment.locale(locale);
    moment.updateLocale(locale, frLocale[locale] as any);
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
