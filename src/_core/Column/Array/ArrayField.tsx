import { FC } from "react";
import { FieldProps } from "../controls/fields";
import { AutocompleteField } from "../controls/fields/AutocompleteField";
import { ArrayColumn } from "./ArrayColumn";
import { I18nMessageKey } from "../../i18n/I18nMessages";
import { useTrans } from "../../components/Trans";

export const ArrayField: FC<{ column: ArrayColumn } & FieldProps> = ({
  column,
  ...props
}) => {
  const { trans } = useTrans();
  const options = column.options.map(({ id }) => id);

  return (
    <AutocompleteField
      multiple
      options={options}
      getOptionLabel={(option) => {
        return trans({
          id:
            column.options.find((o) => o.id === option)?.label ||
            (option as I18nMessageKey),
        });
      }}
      {...props}
    />
  );
};
