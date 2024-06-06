import { ModelEnum } from "../../types";
import { Variant } from "react-bootstrap/types";

import { AuditType } from "./Audits.types";

export const getModelNameFromClass = (namespace: string) =>
  namespace.split("\\").at(-1) as ModelEnum | string;
export const AUDIT_TYPE_CONFIG: Record<
  AuditType,
  { icon: string; variant: Variant }
> = {
  [AuditType.Insert]: {
    icon: "/general/gen035.svg",
    variant: "primary",
  },
  [AuditType.Update]: {
    icon: "/general/gen055.svg",
    variant: "success",
  },
  [AuditType.Remove]: {
    icon: "/general/gen034.svg",
    variant: "danger",
  },
  [AuditType.Associate]: {
    icon: "/coding/cod007.svg",
    variant: "info",
  },
  [AuditType.Dissociate]: {
    icon: "/coding/cod008.svg",
    variant: "warning",
  },
};
