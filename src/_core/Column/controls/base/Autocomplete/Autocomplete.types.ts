import { ElementType, HTMLAttributes, ReactNode } from "react";
import { ChipTypeMap } from "@mui/material/Chip";
import { AutocompleteProps } from "@mui/material/Autocomplete/Autocomplete";
import { FormControlProps } from "../../../String/InputBase/Input.types";

type UndefinedBool = boolean | undefined;
type DefaultChipComponent = ChipTypeMap["defaultComponent"];

type PopperProps<
  T,
  Multiple extends UndefinedBool = undefined,
  DisableClearable extends UndefinedBool = undefined,
  FreeSolo extends UndefinedBool = undefined
> = {
  options: T[];
  getOptionProps: ({
    option,
    index,
  }: {
    option: T;
    index: number;
  }) => HTMLAttributes<HTMLLIElement>;
} & HTMLAttributes<HTMLUListElement>;

type Props<
  T,
  Multiple extends UndefinedBool,
  DisableClearable extends UndefinedBool,
  FreeSolo extends UndefinedBool = false,
  ChipComponent extends ElementType = DefaultChipComponent
> = {
  renderButton?: (option: T) => ReactNode;
  renderPopper?: (props: PopperProps<T>) => ReactNode;
} & FormControlProps &
  Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    "renderInput" | "size"
  >;

export type { Props, UndefinedBool, DefaultChipComponent };
