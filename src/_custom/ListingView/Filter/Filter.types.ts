import { Model } from '../../types/ModelMapping';
import { ModelEnum } from '../../../app/modules/types';


type StringKeyOf<T extends {}> = keyof T
type Prev = [never, 0, 1, 2, /*3, 4, 5,*/ ...0[]]
type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

export type Path<T, D extends number = 3> = [D] extends [never] ?
  never :
  T extends object ?
    {
      [K in keyof T]-?: K extends string | number ?
      `${K}` | Join<K, Path<T[K], Prev[D]>>
      : never
    }[StringKeyOf<T>] : ''

type Leaves<T, D extends number = 10> = [D] extends [never] ?
  never :
  T extends object ?
    { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[StringKeyOf<T>]
    : '';

export enum PropertyFilterOperator {
  Equal = 'EQ',
  NotEqual = '!EQ',
  GreaterThan = 'GT',
  GreaterThanOrEqual = 'GTE',
  LessThan = 'LT',
  LessThanOrEqual = 'LTE',
  IsNull = 'IS_NULL',
  IsNotNull = '!IS_NULL',
  IsTrue = 'IS_TRUE',
  IsFalse = 'IS_FALSE',
  In = 'IN',
  NotIn = '!IN',
  Like = 'LIKE',
  NotLike = '!LIKE',
  Contain = 'CONTAIN',
  DoesNotContain = '!CONTAIN',
  Start = 'START',
  DoesNotStart = '!START',
  End = 'END',
  DoesNotEnd = '!END',
  Between = 'BETWEEN',
  NotBetween = '!BETWEEN',
}

export enum CompoundFilterOperator {
  And = 'AND',
  Or = 'OR',
}

export type PropertyFilterValue = any
export type PropertyFilter<M extends ModelEnum> = {
  // property: Path<T>
  property: string | keyof Model<M>
  operator: PropertyFilterOperator
  value?: PropertyFilterValue
}

export type CompoundFilter<M extends ModelEnum> = {
  operator: CompoundFilterOperator
  filters: Array<PropertyFilter<M> | CompoundFilter<M>>
}

export type Filter<M extends ModelEnum> = PropertyFilter<M> | CompoundFilter<M>