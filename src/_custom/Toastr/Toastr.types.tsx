import { Variant } from 'react-bootstrap/types';
import { FC, ReactNode } from 'react';


export type ToastrTypes = {
  variant?: Variant
  title: string
  children?: ReactNode
}
export type ToastContextModel = {
  toast: (toast: ToastrTypes) => void
  error: (toast: Omit<ToastrTypes, 'variant'>) => void
  success: (toast: Omit<ToastrTypes, 'variant'>) => void
  remove: (index: number) => void
  createMutationSuccess: () => void
  createMutationError: () => void
  deleteMutationSuccess: () => void
  deleteMutationError: () => void
  updateMutationSuccess: () => void
  updateMutationError: () => void
  itemNotFoundError: () => void
}
export type ToastFC = FC<ToastrTypes & {
  onDismiss: () => void
}>
export type ToastProviderProps = {}