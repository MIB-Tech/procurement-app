import { Model } from './ModelMapping';
import { ModelEnum } from '../../app/modules/types';

export type JsonldCollectionResponse<M extends ModelEnum> = {
  '@context': string
  '@id': string
  '@type': 'hydra:Collection'
  'hydra:member': Array<HydraItem<M>>
  'hydra:totalItems': number
}
export type JsonldSuccessCreateResponse = {
  '@context': string,
  '@id': string,
  '@type': string,
}
export type HydraItem<M extends ModelEnum = any> = {
  '@context': string
  '@id': string
  '@type': M
  '@title': string
  '@subTitle'?: string
} & Model<M>

export enum ViolationMessage {
  UniqueEntity = 'UNIQUE_ENTITY'
}

export type Violation<T extends {}> = {
  code: string
  message: ViolationMessage | string
  propertyPath: keyof T
}
export type JsonldErrorCreateResponse<T extends {}> = {
  '@context': '/contexts/ConstraintViolationList',
  '@type': 'ConstraintViolationList',
  'hydra:description': string
  'hydra:title': string
  violations: Violation<T>[]
}
