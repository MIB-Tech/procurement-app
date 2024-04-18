import {I18nMessageKey} from '../../../i18n/I18nMessages'
import {MessageParams} from 'yup/lib/types'
import {Variant} from 'react-bootstrap/types'


type FieldProps = {
  name: string
  feedbackLabel?: I18nMessageKey
}
export type I18nMessageError = {
  id: I18nMessageKey
  params: MessageParams
}
type FeedbackErrorType = {
  error: I18nMessageKey | I18nMessageError
  variant?: Variant
}

type FeedbackLabelType = {label?: I18nMessageKey}

export type {FieldProps, FeedbackErrorType, FeedbackLabelType}
