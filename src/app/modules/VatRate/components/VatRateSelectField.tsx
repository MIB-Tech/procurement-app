import { SelectField } from "../../../../_custom/Column/controls/fields/SelectField/SelectField";
import { FieldProps } from "../../../../_custom/Column/controls/fields";
import { useCollectionQuery } from "../../../../_custom/hooks/UseCollectionQuery";
import { ModelEnum } from "../../types";

export const VatRateSelectField = ({
  fieldProps,
}: {
  fieldProps: FieldProps;
}) => {
  const { collection } = useCollectionQuery<ModelEnum.VatRate>({
    modelName: ModelEnum.VatRate,
    queryKey: ["VAT_RATES_VALUES"],
  });
  const vatRates = collection?.map((vatRate) => vatRate.value) || [];
  return (
    <SelectField
      size={"sm"}
      options={vatRates}
      getOptionLabel={(varRate) => `${(varRate * 100).toFixed(0)} %`}
      {...fieldProps}
    />
  );
};
