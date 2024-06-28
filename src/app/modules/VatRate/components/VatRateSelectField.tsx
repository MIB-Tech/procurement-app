import { SelectField } from "../../../../_core/Column/controls/fields/SelectField/SelectField";
import { FieldProps } from "../../../../_core/Column/controls/fields";
import { useCollectionQuery } from "../../../../_core/hooks/UseCollectionQuery";
import { ModelEnum } from "../../types";

export const VatRateSelectField = ({ name }: FieldProps) => {
  const { collection } = useCollectionQuery<ModelEnum.VatRate>({
    modelName: ModelEnum.VatRate,
    queryKey: ["VAT_RATES_VALUES"],
  });
  const vatRates = collection?.map((vatRate) => vatRate.value) || [];
  return (
    <SelectField
      name={name}
      size={"sm"}
      options={vatRates}
      getOptionLabel={(varRate) => `${(varRate * 100).toFixed(0)} %`}
    />
  );
};
