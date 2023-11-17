import React, { HTMLAttributes } from 'react';
import { InputSize } from '../../Column/String/InputBase/Input.types';
import { UsePaginationProps } from '@mui/material/usePagination/usePagination';


export type PaginationInput = {
  page?: number
  itemsPerPage?: number | undefined
}
export type PaginationInfo = {
  itemsPerPage: number
  lastPage: number
  totalCount: number
}
export const defaultVariables: PaginationInput = {
  page: 1,
  itemsPerPage: 5
};

export type PaginationProps = {
  onPageChange: (page: number) => void
  size?: InputSize,
  outline?: boolean
  circle?: boolean
  length?: number
} & Omit<PaginationInfo, 'lastPage'>
  & Omit<UsePaginationProps, 'count'>
  & HTMLAttributes<HTMLUListElement>
