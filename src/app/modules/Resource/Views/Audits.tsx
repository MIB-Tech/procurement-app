import React, { useState } from "react";
import { ModelEnum } from "../../types";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment/moment";
import { SVG } from "../../../../_custom/components/SVG/SVG";
import { PaginationInput } from "../../../../_custom/ListingView/Pagination/Pagination.types";
import { Pagination } from "../../../../_custom/ListingView/Pagination";
import { Button } from "../../../../_custom/components/Button";
import { IpLabel } from "./IpLabel";
import { UsernameLabel } from "./UsernameLabel";
import { DiffValue } from "./DiffValue";
import { AUDIT_TYPE_CONFIG } from "./Audits.utils";
import { EntityLabel } from "./EntityLabel";
import { Audit, AuditType, Value } from "./Audits.types";
import { FormikProvider, useFormik } from "formik";
import { InputField } from "../../../../_custom/Column/String/InputField";
import { LoadingLabel } from "../../../../_custom/components/Skeleton";
import { SelectField } from "../../../../_custom/Column/controls/fields/SelectField/SelectField";
import { RadioField } from "../../../../_custom/Column/controls/fields/RadioField/RadioField";
import { DateField } from "../../../../_custom/Column/String/DateField";

const initialValues: Value = {
  id: "",
  type: "",
  objectId: "",
  blameId: "",
  transactionHash: "",
  createdAt: "",
};
// TODO range filter
// TODO date range filter
export const Audits = <M extends ModelEnum>({
  modelName,
}: {
  modelName: M;
}) => {
  const [params, setParams] = useState<PaginationInput & { filter: Value }>({
    page: 1,
    itemsPerPage: 10,
    filter: initialValues,
  });
  const formik = useFormik({
    initialValues,
    onSubmit: (filter) => setParams({ ...params, filter }),
  });
  const { page, itemsPerPage } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["AUDITS", modelName, params],
    queryFn: () => {
      let _params: {} = {
        page,
        itemsPerPage,
        ...Object.keys(params.filter).reduce((previous, current) => {
          // @ts-ignore
          let value = params.filter[current];
          if (!value) return previous;
          if (current === "createdAt") {
            value = moment(value).format("YYYY-MM-DD");
          }

          return {
            ...previous,
            [`filter[${current}]`]: value,
          };
        }, {}),
      };
      return axios.get<{ totalCount: number; audits: Audit<M>[] }>(
        `/custom/audits/${modelName}`,
        { params: _params }
      );
    },
  });
  const audits = data?.data.audits || [];
  const totalCount = data?.data.totalCount || 0;

  return (
    <>
      <FormikProvider value={formik}>
        <div className='d-flex align-items-end flex-xl-nowrap flex-wrap gap-3 mb-3'>
          <div>
            {/*<label className='fs-6 fw-bolder'>Id</label>*/}
            <InputField
              name='id'
              size='sm'
              placeholder='id'
            />
          </div>
          <div>
            {/*<label className='fs-6 fw-bolder'>Type</label>*/}
            <RadioField
              options={Object.values(AuditType)}
              getOptionVariant={(option) => AUDIT_TYPE_CONFIG[option].variant}
              name='type'
              size='sm'
              scrollDisabled
              className='bg-white'
            />
          </div>
          <div>
            {/*<label className='fs-6 fw-bolder'>Object Id</label>*/}
            <InputField
              name='objectId'
              size='sm'
              placeholder='Object Id'
            />
          </div>
          <div>
            {/*<label className='fs-6 fw-bolder'>Blame Id</label>*/}
            <InputField
              name='blameId'
              size='sm'
              placeholder='Blame Id'
            />
          </div>
          <div>
            {/*<label className='fs-6 fw-bolder'>Transaction Hash</label>*/}
            <InputField
              name='transactionHash'
              size='sm'
              placeholder='Transaction Hash'
            />
          </div>
          <div>
            {/*<label className='fs-6 fw-bolder'>Created At</label>*/}
            <DateField
              name='createdAt'
              size='sm'
              placeholder='Created At'
            />
          </div>
          <div>
            <Button
              variant='primary'
              loading={isLoading}
              size='sm'
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Filter
            </Button>
          </div>
        </div>
      </FormikProvider>

      <div className='card card-bordered mb-3'>
        <div className='card-body pt-5'>
          {isLoading && <LoadingLabel />}
          <div className='timeline'>
            {audits.map((audit) => {
              const {
                id,
                type,
                createdAt,
                diffs,
                ip,
                objectId,
                transactionHash,
              } = audit;
              const { icon, variant } = AUDIT_TYPE_CONFIG[type];

              return (
                <div
                  key={id}
                  className='timeline-item'
                >
                  <div className='timeline-line w-40px' />
                  <div className='timeline-icon symbol symbol-circle symbol-40px me-4'>
                    <div className='symbol-label bg-light'>
                      <SVG
                        path={icon}
                        variant={variant}
                        size='1'
                      />
                    </div>
                  </div>
                  <div className='timeline-content mb-3'>
                    <div className='d-flex justify-content-between'>
                      <div className='fs-5'>
                        {type === AuditType.Associate && (
                          <>
                            <EntityLabel {...diffs.source} />
                            {` was `}
                            <span className={`text-${variant}`}>
                              associated
                            </span>
                            {` with `}
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
                        {type === AuditType.Dissociate && (
                          <>
                            <EntityLabel {...diffs.source} />
                            {` was `}
                            <span className={`text-${variant}`}>
                              dissociated
                            </span>
                            {` with `}
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
                            {` has been `}
                            <span className={`text-${variant}`}>created</span>
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
                        {type === AuditType.Update && (
                          <>
                            <EntityLabel
                              id={parseInt(objectId)}
                              class={modelName}
                            />
                            {` was `}
                            <span className={`text-${variant}`}>updated</span>
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
                        {type === AuditType.Remove && (
                          <>
                            <EntityLabel
                              id={parseInt(objectId)}
                              class={modelName}
                            />
                            {` was `}
                            <span className={`text-${variant}`}>deleted</span>
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
                      </div>
                      <div className='text-muted text-capitalize fs-7'>
                        {moment(createdAt).format("LLLL")}
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-3 mt-1 fs-7 text-muted'>
                      <div>Id: {id}</div>
                      <div>Hash: {transactionHash}</div>
                    </div>

                    {(type === AuditType.Insert ||
                      type === AuditType.Update) && (
                      <div className='card card-bordered'>
                        <div className='card-body py-0 px-2'>
                          <table className='table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0'>
                            <thead className='fs-7 text-gray-400 text-uppercase'>
                              <tr>
                                <th className='border-end w-150px'>Field</th>
                                {type === AuditType.Update && (
                                  <th>Old value</th>
                                )}
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
              );
            })}
          </div>
        </div>
      </div>
      <Pagination
        size='sm'
        page={page}
        onPageChange={(page) => {
          setParams({ ...params, page });
        }}
        onItemsPerPageChange={(itemsPerPage) => {
          setParams({ ...params, page: 1, itemsPerPage });
        }}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};
