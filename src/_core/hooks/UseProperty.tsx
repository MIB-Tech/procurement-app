import { Model } from "../types/ModelMapping";
import { useLocation } from "react-router-dom";
import { dashToCamelCase } from "../utils";
import { ModelEnum } from "../../app/modules/types";

export const useProperty = <M extends ModelEnum>() => {
  const { pathname } = useLocation();
  const suffix = pathname.split("/").pop();

  return {
    pathname,
    property: suffix ? (dashToCamelCase(suffix) as keyof Model<M>) : undefined,
  };
};
