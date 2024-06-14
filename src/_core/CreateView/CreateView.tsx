import React from "react";
import { useMapping } from "../hooks/UseMapping";
import { CreateViewType, ViewEnum } from "../types/ModelMapping";
import { CreateViewProps } from "./CreateView.types";
import { ModelEnum } from "../../app/modules/types";
import { FormView } from "../FormView/FormView";
import { useLocation } from "react-router-dom";

export const DEFAULT_CREATE_VIEW: CreateViewType<any> = {
  type: ViewEnum.Create,
};

export const CreateView = <M extends ModelEnum>({
  modelName,
}: CreateViewProps<M>) => {
  const { views } = useMapping<M>({ modelName });
  const { state } = useLocation();
  const view = (views?.find((view) => view.type === ViewEnum.Create) ||
    DEFAULT_CREATE_VIEW) as CreateViewType<M>;

  return (
    <FormView
      view={view}
      modelName={modelName}
      initialValues={state}
    />
  );
};
