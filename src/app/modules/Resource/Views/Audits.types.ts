import { ModelEnum } from "../../types";
import { Model } from "../../../../_custom/types/ModelMapping";

export type AssociateDiff = {
  class: string;
  field: string;
  id: number;
  label: string;
  table: string;
};

export enum AuditType {
  Associate = "associate",
  Dissociate = "dissociate",
  Insert = "insert",
  Update = "update",
  Remove = "remove",
}

export type AssociationAudit = {
  type: AuditType.Associate | AuditType.Dissociate;
  diffs: {
    is_owning_side: boolean;
    source: AssociateDiff;
    target: AssociateDiff;
  };
};
export type MutateAudit<M extends ModelEnum> = {
  type: AuditType.Insert | AuditType.Update;
  diffs: Record<keyof Model<M> | string, { new: any; old: any }>;
};
export type RemoveAudit<M extends ModelEnum> = {
  type: AuditType.Remove;
  diffs: Record<keyof Model<M> | string, { new: any; old: any }>; // TODO
};
export type Audit<M extends ModelEnum> = {
  id: number;
  objectId: string;
  discriminator?: null;
  transactionHash: string;
  userId?: string;
  username: string;
  userFqdn: string;
  userFirewall?: null;
  ip?: null;
  createdAt: string;
} & (AssociationAudit | MutateAudit<M> | RemoveAudit<M>);
export type Value = {
  id: string;
  blameId: string;
  type: string;
  objectId: string;
  transactionHash: string;
  createdAt: string;
};
