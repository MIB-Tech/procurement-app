import { Model } from "../../../../_custom/types/ModelMapping";
import { Skeleton } from "@mui/material";
import React from "react";
import { EmptyList } from "../../../../_custom/ListingView/views/Table/TableView";
import { ModelEnum } from "../../types";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment/moment";

type AssociateDiff = {
  class: string;
  field: string;
  id: 79;
  label: string;
  table: string;
};

enum AuditType {
  Associate = "associate",
  Insert = "insert",
}

type AssociateAudit = {
  type: AuditType.Associate;
  diffs: {
    is_owning_side: boolean;
    source: AssociateDiff;
    target: AssociateDiff;
  };
};
type InsertAudit<M extends ModelEnum> = {
  type: AuditType.Insert;
  diffs: Record<keyof Model<M>, { new: any; old: any }>;
};
type Audit<M extends ModelEnum> = {
  id: number;
  objectId: string;
  discriminator?: null;
  transactionHash: string;
  userId: string;
  username: string;
  userFqdn: string;
  userFirewall?: null;
  ip?: null;
  createdAt: string;
} & (AssociateAudit | InsertAudit<M>);

export const Audits = <M extends ModelEnum>() => {
  const modelName = ModelEnum.User;
  const query = useQuery({
    queryKey: ["AUDITS", modelName],
    queryFn: () =>
      axios.get<{ totalCount: number; audits: Audit<M>[] }>(
        `/custom/audits/${modelName}`,
        {
          params: {},
        }
      ),
  });
  const audits = query.data?.data.audits || [];
  const loading = false;
  const page = 1;
  const perPage = 10;

  return (
    <>
      {audits.map((audit) => {
        const { id, type, username } = audit;
        return (
          <div
            key={id}
            className='row mb-3'
          >
            <div className='col-1'>{type}</div>
            <div className='col-11'>
              <div className='card'>
                <div className='card-body'>
                  <div>
                    {type === AuditType.Associate && "TODO"}
                    {type === AuditType.Insert && (
                      <>
                        New ${modelName} has been created by ${username}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
