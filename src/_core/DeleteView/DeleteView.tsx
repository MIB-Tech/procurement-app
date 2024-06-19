import React from "react";
import { ViewProps } from "../ListingView/ListingView.types";
import { Trans } from "../components/Trans";
import { DeleteConfirm } from "./DeleteConfirm";
import { useDeleteMutation } from "../hooks/UseDeleteMutation";
import { useItemQuery } from "../hooks/UseItemQuery";
import { ModelEnum } from "../../app/modules/types";

export const DeleteView = <M extends ModelEnum>({
  modelName,
}: ViewProps<M>) => {
  const mutation = useDeleteMutation({ modelName });
  const { item, isLoading } = useItemQuery({ modelName });

  return (
    <DeleteConfirm
      isSubmitting={mutation.isLoading}
      title={
        <Trans
          id='DELETE_CONFIRM.TITLE'
          values={{ name: isLoading ? "..." : item?.["@title"] }}
        />
      }
      onConfirm={mutation.mutate}
    />
  );
};
