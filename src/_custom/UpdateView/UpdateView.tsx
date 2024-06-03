import React from "react";
import { useMapping } from "../hooks/UseMapping";
import { UpdateViewType, ViewEnum } from "../types/ModelMapping";
import { UpdateViewProps } from "./UpdateView.types";
import { ModelEnum } from "../../app/modules/types";
import { FormView } from "../FormView/FormView";

import { ItemOverview } from "../DetailView/ItemOverview";
import { useUri } from "../hooks/UseUri";

export const DEFAULT_UPDATE_VIEW: UpdateViewType<any> = {
  type: ViewEnum.Update,
};

export const UpdateView = <M extends ModelEnum>({
  modelName,
}: UpdateViewProps<M>) => {
  const uri = useUri({ modelName });
  const { views } = useMapping<M>({ modelName });
  const view = (views?.find((view) => view.type === ViewEnum.Update) ||
    DEFAULT_UPDATE_VIEW) as UpdateViewType<M>;

  return (
    <div>
      <ItemOverview modelName={modelName} />
      <FormView
        view={{
          ...view,
          fetchUri: `/update${uri}`,
          mutateUri: uri,
        }}
        modelName={modelName}
      />
    </div>
  );
};
