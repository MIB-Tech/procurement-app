import React, {FC, useEffect} from 'react';
import {usePageData} from '../../../_metronic/layout/core';
import {Trans, useTrans} from '../../../_custom/components/Trans';
import {FormikProvider, useFormik} from 'formik';
import {ModelEnum} from '../../modules/types';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {Button} from '../../../_custom/components/Button';
import {useCollectionQuery} from '../../../_custom/hooks/UseCollectionQuery';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator
} from "../../../_custom/ListingView/Filter/Filter.types";
import {HydraItem} from "../../../_custom/types/hydra.types";
import {InputField} from "../../../_custom/Column/String/InputField";
import {ReceiptProductModel} from "../../modules/ReceiptProduct";
import {ModelCell} from "../../../_custom/ListingView/views/Table/ModelCell";
import {COMPLIANCE_STATUS_OPTIONS, ComplianceStatus} from "../../modules/ReceiptProduct/Model";
import {useMutation} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import * as Yup from 'yup';
import {StringField} from "../../../_custom/Column/String/StringField";
import {ColumnTypeEnum} from "../../../_custom/types/types";
import {StringFormat} from "../../../_custom/Column/String/StringColumn";
import clsx from "clsx";
import {ValidationStatusEnum} from "../../modules/PurchaseOrder/Model";
import {useAuth} from "../../../_custom/hooks/UseAuth";

const validationSchema = Yup.object().shape({
  receiptProducts: Yup.array().of(
    Yup.object().shape({
      complianceStatus: Yup.string().nullable().required(),
      complianceReserve: Yup.string().nullable().when('complianceStatus', {
        is: ComplianceStatus.ConformWithReserve,
        then: Yup.string().required(),
      }),
    })
  ),
});
type VendorValue = { vendor: HydraItem | null, }
type SearchValue = { purchaseOrder: HydraItem | null, }
type ReceiptProductsValue = { receiptProducts: Array<ReceiptProductModel>, }
export const ReceiptCompliancePage: FC = () => {
  const {setPageTitle} = usePageData();
  const {trans} = useTrans();
  const {user} = useAuth();
  const mutation = useMutation<AxiosResponse<any>, AxiosError<string>, {
    receiptProducts: Array<Pick<ReceiptProductModel, 'id' | 'complianceStatus' | 'complianceReserve'>>
  }>(
    data => axios.post(`/bulk/receipt-products`, data),
  )
  const searchformik = useFormik({
    initialValues: {
      purchaseOrder: null,
    } as SearchValue,
    onSubmit: (values) => {
    },
  });
  const vendorformik = useFormik({
    initialValues: {
      vendor: null,
    } as VendorValue,
    onSubmit: (values) => {
    },
  });
  const vendorsId = vendorformik.values.vendor?.id
  const vendorOrdersQuery = useCollectionQuery({
    modelName: ModelEnum.PurchaseOrder,
    params: {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: 'vendor',
            operator: PropertyFilterOperator.Equal,
            value: vendorsId
          },
        ]
      },
    },
    options: {
      enabled: false
    }
  });
  const purchaseOrdersId = searchformik.values.purchaseOrder?.id
  const purchaseOrdersQuery = useCollectionQuery({
    modelName: ModelEnum.ReceiptProduct,
    params: {
      filter: {
        operator: CompoundFilterOperator.And,
        filters: [
          {
            property: 'desiredProduct.purchaseOrderProduct.purchaseOrder',
            operator: PropertyFilterOperator.Equal,
            value: purchaseOrdersId
          },
        ]
      },
    },
    options: {
      enabled: false
    }
  });
  const submitformik = useFormik({
    initialValues: {
      receiptProducts: purchaseOrdersQuery.collection.map((item) => ({
        ...item,
        complianceReserve: item.complianceReserve || '',
      })),
    } as ReceiptProductsValue,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        ...values, receiptProducts: values.receiptProducts.map(({id, complianceStatus, complianceReserve}) => ({
          id,
          complianceStatus,
          complianceReserve
        }))
      })
    },
  });
  useEffect(() => {
    setPageTitle(trans({id: 'RECEIPT_COMPLIANCE'}));
  }, []);

  return (
    <>
      <div className="card card-bordered mb-10">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <FormikProvider value={vendorformik}>
                <div className="fw-bold"><Trans id="VENDOR"/></div>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <ModelAutocompleteField
                      modelName={ModelEnum.Vendor}
                      name="vendor"
                      size="sm"
                    />
                  </div>
                </div>
              </FormikProvider>
            </div>
            <div className="col-md-6">
              <FormikProvider value={searchformik}>
                <div className="fw-bold"><Trans id="PURCHASE_ORDER"/></div>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <ModelAutocompleteField
                      modelName={ModelEnum.PurchaseOrder}
                      name="purchaseOrder"
                      size="sm"
                      disabled={!vendorformik.values.vendor}
                      getParams={filter => {
                        const newFilter: CompoundFilter<ModelEnum.PurchaseOrder> = {
                          operator: CompoundFilterOperator.And,
                          filters: [
                            filter,
                            {
                              property: 'vendor',
                              operator: PropertyFilterOperator.Equal,
                              value: vendorformik.values.vendor?.id
                            },
                            {
                              property: 'validationStatus',
                              operator: PropertyFilterOperator.Equal,
                              value: ValidationStatusEnum.Validated
                            },
                            {
                              property: 'referents.id',
                              operator: PropertyFilterOperator.Equal,
                              value: user.id
                            },
                          ]
                        };

                        return newFilter;
                      }}
                    />
                  </div>
                  <div className="ms-2">
                    <Button
                      variant="primary"
                      size="sm"
                      loading={purchaseOrdersQuery.isLoading}
                      disabled={!purchaseOrdersId}
                      onClick={() => purchaseOrdersQuery.refetch()}
                    >
                      <Trans id="SEARCH"/>
                    </Button>
                  </div>
                </div>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
      {vendorformik.values.vendor &&
          <FormikProvider value={submitformik}>
              <div className='d-flex justify-content-end'>
                  <Button
                      variant="primary"
                      size="sm"
                      className='mb-3'
                      loading={mutation.isLoading}
                      disabled={submitformik.values.receiptProducts.length === 0}
                      onClick={() => submitformik.handleSubmit()}
                  >
                      <Trans id="SAVE"/>
                  </Button>
              </div>
              <div className="">
                  <div className=''>
                      <div className="fw-bold"/>
                      <div className="d-flex">
                          <div className="flex-grow-1">
                              <div className="table">
                                  <table className="table table-sm  gy-1 align-middle mb-0">
                                      <thead className="fs-7 text-gray-400 text-uppercase border-bottom text-nowrap">
                                      <tr>
                                          <th><Trans id='PRODUCT'/></th>
                                          <th><Trans id='RECEIVED_QUANTITY'/></th>
                                          <th><Trans id='COMPLIANCE'/></th>
                                          <th><Trans id='COMPLIANCE_RESERVE'/></th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      {submitformik.values.receiptProducts.map((item, index, receiptProducts) => (
                                        <tr key={item.id}
                                            className={clsx(index < receiptProducts.length - 1 && 'border-bottom')}>
                                          <td>
                                            <ModelCell item={item as HydraItem}/>
                                          </td>
                                          <td>{item.quantity}</td>
                                          <th>
                                            <StringField
                                              column={{
                                                type: ColumnTypeEnum.String,
                                                format: StringFormat.Select,
                                                options: COMPLIANCE_STATUS_OPTIONS,
                                              }}
                                              name={`receiptProducts[${index}].complianceStatus`}
                                              className='w-50'
                                            />
                                          </th>
                                          <td>
                                            {item.complianceStatus === ComplianceStatus.ConformWithReserve &&
                                                <InputField
                                                    name={`receiptProducts[${index}].complianceReserve`}
                                                    type="text"
                                                />
                                            }
                                          </td>
                                        </tr>
                                      ))}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </FormikProvider>
      }
    </>
  )
};
