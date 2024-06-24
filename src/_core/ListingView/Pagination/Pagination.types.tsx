import { HTMLAttributes } from "react";
import { InputSize } from "../../Column/String/InputBase/Input.types";
import { UsePaginationProps } from "@mui/material/usePagination/usePagination";

export type PaginationInput = {
  page?: number;
  itemsPerPage?: number | undefined;
};
export const defaultVariables: PaginationInput = {
  page: 1,
  itemsPerPage: 5,
};

export type PaginationProps = {
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage?: number) => void;
  size?: InputSize;
  outline?: boolean;
  circle?: boolean;
  length?: number;
  pageLess?: boolean;
  totalCount: number;
} & Pick<PaginationInput, "itemsPerPage"> &
  Omit<UsePaginationProps, "count"> &
  HTMLAttributes<HTMLUListElement>;
