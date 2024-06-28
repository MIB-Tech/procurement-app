import React from "react";
import { Button } from "../../../_core/components/Button";
import { Trans } from "../../../_core/components/Trans";
import { useCustomMutation } from "../../../_core/hooks/UseCustomMutation";
import { ModelEnum } from "../types";
import { getRoutePrefix } from "../../../_core/utils";

interface CreateAccountingButtonProps {
  invoiceId: number;
  disabled: boolean;
}

const CreateAccountingButton: React.FC<CreateAccountingButtonProps> = ({
  invoiceId,
  disabled,
}) => {
  const mutation = useCustomMutation<ModelEnum.Accounting>({
    modelName: ModelEnum.Accounting,
    url: getRoutePrefix(ModelEnum.Accounting),
    navigateTo: () => ".",
  });

  return (
    <div className='position-relative'>
      <Button
        size='sm'
        variant='primary'
        onClick={() =>
          mutation.mutate({
            // @ts-ignore
            invoice: {
              id: invoiceId,
            },
          })
        }
        loading={mutation.isLoading}
        disabled={disabled || mutation.isSuccess}
      >
        <Trans id='ACCOUNTED' />
      </Button>
    </div>
  );
};

export default CreateAccountingButton;
