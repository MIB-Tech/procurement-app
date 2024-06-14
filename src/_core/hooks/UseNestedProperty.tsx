import { Model } from "../types/ModelMapping";
import { useLocation } from "react-router-dom";
import { dashToCamelCase } from "../utils";
import { ModelEnum } from "../../app/modules/types";

export const useNestedProperty = <M extends ModelEnum>() => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const suffix = parts.length > 2 && parts.pop();

  return {
    pathname,
    property:
      suffix && isNaN(parseInt(suffix))
        ? (dashToCamelCase(suffix) as keyof Model<M>)
        : undefined,
  };
};
