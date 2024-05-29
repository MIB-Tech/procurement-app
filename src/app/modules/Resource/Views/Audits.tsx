import { Model } from "../../../../_custom/types/ModelMapping";
import React, { HTMLAttributes } from "react";
import { ModelEnum } from "../../types";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment/moment";
import { Bullet } from "../../../../_custom/components/Bullet";
import { CellContent } from "../../../../_custom/ListingView/views/Table/BodyCell";
import { ColumnTypeEnum } from "../../../../_custom/types/types";

type AssociateDiff = {
  class: string;
  field: string;
  id: 79;
  label: string;
  table: string;
};

enum AuditType {
  Associate = "associate",
  Disassociate = "disassociate",
  Insert = "insert",
  Update = "update",
  Remove = "update",
}

type AssociationAudit = {
  type: AuditType.Associate | AuditType.Disassociate;
  diffs: {
    is_owning_side: boolean;
    source: AssociateDiff;
    target: AssociateDiff;
  };
};
type MutateAudit<M extends ModelEnum> = {
  type: AuditType.Insert | AuditType.Update;
  diffs: Record<keyof Model<M> | string, { new: any; old: any }>;
};
type Audit<M extends ModelEnum> = {
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
} & (AssociationAudit | MutateAudit<M>);

const getModelNameFromClass = (namespace: string) =>
  namespace.split("\\").at(-1) as ModelEnum | string;
const EntityLabel = ({
  id,
  class: entityClassName,
}: Partial<Pick<AssociateDiff, "id">> & Pick<AssociateDiff, "class">) => (
  <span className='text-primary fw-bold'>
    <Reference
      refId={id}
      label={getModelNameFromClass(entityClassName)}
    />
  </span>
);
const UsernameLabel = ({
  userId,
  username,
}: Pick<Audit<any>, "userId" | "username">) => (
  <Reference
    refId={userId ? parseInt(userId) : undefined}
    label={username}
    className='text-black fw-bold'
  />
);

const Reference = ({
  refId,
  label,
  ...props
}: { refId?: number; label: string } & HTMLAttributes<HTMLAnchorElement>) => (
  <a
    href='#'
    {...props}
  >
    {label}
    {refId && `#${refId}`}
  </a>
);

const DiffValue = ({
  value,
}: {
  value:
    | string
    | boolean
    | { class: string; id: number; label: string; table: string };
}) => (
  <>
    {value === null || value === undefined ? (
      <Bullet />
    ) : (
      <>
        {typeof value === "boolean" && (
          <CellContent
            value={value}
            type={ColumnTypeEnum.Boolean}
          />
        )}
        {typeof value === "string" && (
          <CellContent
            value={value}
            type={ColumnTypeEnum.String}
          />
        )}
        {typeof value === "object" && (
          <Reference
            refId={value.id}
            label={getModelNameFromClass(value.class)}
          />
        )}
      </>
    )}
  </>
);
const IpLabel = ({ ip }: Pick<Audit<any>, "ip">) => (
  <span className='fw-bold'>{ip}</span>
);
export const Audits = <M extends ModelEnum>({
  modelName,
}: {
  modelName: M;
}) => {
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
        const { id, type, username, createdAt, userFqdn, diffs, ip } = audit;

        return (
          <div
            key={id}
            className='row mb-3'
          >
            <div className='col-1'>{type}</div>
            <div className='col-11'>
              <div className='card'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <div className='text-muted'>
                      {type === AuditType.Associate && (
                        <>
                          <EntityLabel {...diffs.source} />
                          {` was associated with `}
                          <EntityLabel {...diffs.target} />
                          {` by `}
                          <UsernameLabel {...audit} />
                          {ip && (
                            <>
                              {` from `}
                              <IpLabel ip={ip} />
                            </>
                          )}
                        </>
                      )}
                      {type === AuditType.Disassociate && (
                        <>
                          <EntityLabel {...diffs.source} />
                          {` was associated with `}
                          <EntityLabel {...diffs.target} />
                          {` by `}
                          <UsernameLabel {...audit} />
                          {ip && (
                            <>
                              {` from `}
                              <IpLabel ip={ip} />
                            </>
                          )}
                        </>
                      )}
                      {type === AuditType.Insert && (
                        <>
                          {`New `}
                          <EntityLabel class={modelName} />
                          {` has been created by `}
                          <UsernameLabel {...audit} />
                          {ip && (
                            <>
                              {` from `}
                              <IpLabel ip={ip} />
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className='text-muted text-capitalize'>
                      {moment(createdAt).format("LLLL")}
                    </div>
                  </div>
                  {(type === AuditType.Insert || type === AuditType.Update) && (
                    <div className='card card-bordered p-0'>
                      <div className='card-body'>
                        <table className='table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0'>
                          <thead className='fs-7 text-gray-400 text-uppercase'>
                            <tr>
                              <th className='border-end'>Field</th>
                              {type === AuditType.Update && <th>Old value</th>}
                              <th>New Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(Object.keys(diffs) as Array<string>).map(
                              (key) => {
                                const diff = diffs[key];

                                return (
                                  <tr key={key.toString()}>
                                    <td className='border-end'>{key}</td>
                                    {type === AuditType.Update && (
                                      <td className='text-danger '>
                                        <DiffValue value={diff.old} />
                                      </td>
                                    )}
                                    <td className='text-success'>
                                      <DiffValue value={diff.new} />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
