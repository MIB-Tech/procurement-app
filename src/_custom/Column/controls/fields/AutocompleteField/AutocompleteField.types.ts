import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { AutocompleteBaseProps, DefaultChipComponent, UndefinedBool } from '../../base/Autocomplete';
import { FieldProps } from '../index';
import { ElementType } from 'react';


export type Props<T,
  Multiple extends UndefinedBool,
  DisableClearable extends UndefinedBool,
  FreeSolo extends UndefinedBool,
  ChipComponent extends ElementType = DefaultChipComponent> = {
    renderInput?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>['renderInput']
  }
  & FieldProps
  & AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>

export type RemoteAutocompleteProps<T,
  Multiple extends UndefinedBool,
  DisableClearable extends UndefinedBool,
  FreeSolo extends UndefinedBool> = Partial<
  Pick<Props<T, Multiple, DisableClearable, FreeSolo>, 'multiple' | 'name' | 'disabled' | 'feedbackLabel' | 'size' | 'bg'>
>