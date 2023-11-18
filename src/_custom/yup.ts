import { object, string } from 'yup';
import moment from 'moment';


export const datetime = () => string().test(
  'Date is valid',
  'VALIDATION.DATE.INVALID',
  value => !value || moment(value).isValid()
);

export const relation = () => object({
  // '@id': string().required()
})