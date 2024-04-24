import React, {FC, useEffect} from 'react';
import {usePageData} from '../../../_metronic/layout/core';
import {Trans, useTrans} from '../../../_custom/components/Trans';
import {FormikProvider, useFormik} from 'formik';
import {ModelEnum} from '../../modules/types';
import {ModelAutocompleteField} from '../../../_custom/Column/Model/Autocomplete/ModelAutocompleteField';
import {Button} from '../../../_custom/components/Button';
import {useCollectionQuery} from '../../../_custom/hooks/UseCollectionQuery';
import {CompoundFilterOperator, PropertyFilterOperator} from "../../../_custom/ListingView/Filter/Filter.types";
import {HydraItem} from "../../../_custom/types/hydra.types";
import {InputField} from "../../../_custom/Column/String/InputField";
import {SelectField} from "../../../_custom/Column/controls/fields/SelectField/SelectField";
import {ReceiptProductModel} from "../../modules/ReceiptProduct";
import {ModelCell} from "../../../_custom/ListingView/views/Table/ModelCell";
import {COMPLIANCE_STATUS_OPTIONS, ComplianceStatus} from "../../modules/ReceiptProduct/Model";
import {useMutation} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";

type Value = { purchaseOrder: HydraItem | null, }
type Value2 = { receiptProducts: Array<ReceiptProductModel>, }

const initialValues: Value = {
  purchaseOrder: null,
}

const initialValues2: Value2 = {
  receiptProducts: [],
}
export const ReceiptCompliancePage: FC = () => {
  const {setPageTitle} = usePageData();
  const {trans} = useTrans();
  const {mutate, isLoading: Load} = useMutation<AxiosResponse<any>, AxiosError<string>, Value2>(
    data => axios.post(`/bulk/receipt-products`, data),
  )
  const Searchformik = useFormik({
    initialValues,
    onSubmit: (values) => {
    },
  });

  const purchaseOrdersId = Searchformik.values.purchaseOrder?.id
  const {collection, refetch, isLoading} = useCollectionQuery({
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
  const receiptProductsId = Searchformik.values.purchaseOrder?.id

  const Submitformik = useFormik({
    initialValues: {
      receiptProducts: collection
    } as Value2,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values)
    },
  });

  useEffect(() => {
    setPageTitle(trans({id: 'RECEIPT_COMPLIANCE'}));
  }, []);

  return (
    <FormikProvider value={Searchformik}>
      <div className="card card-bordered">
        <div className="card-body">
          <div>
            <div className="fw-bold"><Trans id="PURCHASE_ORDER"/></div>
            <div className="d-flex">
              <div className="flex-grow-1">
                <ModelAutocompleteField
                  modelName={ModelEnum.PurchaseOrder}
                  name="purchaseOrder"
                  size="sm"
                />
              </div>
              <div className="ms-2">
                <Button
                  variant="primary"
                  size="sm"
                  loading={isLoading}
                  disabled={!purchaseOrdersId}
                  onClick={() => refetch()}
                >
                  <Trans id="SEARCH"/>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-5">

        <div className="card card-bordered ">
          <div className="card-header">
            <h3 className="card-title"><Trans id="RECEIPT_COMPLIANCE"/>
            </h3>
            <div className="card-toolbar">
              <Button
                variant="primary"
                size="sm"
                loading={Load}
                disabled={!receiptProductsId}
                onClick={() => Submitformik.handleSubmit()}
              >
                <Trans id="SAVE"/>
              </Button>
            </div>
          </div>
          <div className="card-body">
            <FormikProvider value={Submitformik}>
              <div className="mt-5">
                <div className="card card-bordered">

                  <div className="card-body">
                    <div>
                      <div className="fw-bold"></div>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <div className="table-responsive">
                            <table className="table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0">
                              <thead className="fs-7 text-gray-400 text-uppercase">
                              <tr>
                                <th>Produit</th>
                                <th>QTE rec</th>
                                <th>Conformité</th>
                                <th>Conformité avec reserve</th>

                              </tr>
                              </thead>

                              <tbody className="border border-2">
                              {Submitformik.values.receiptProducts.map((item, index) => (
                                <tr>
                                  <td>
                                    <ModelCell item={item as HydraItem}/>
                                  </td>
                                  <td>{item.quantity}</td>
                                  <th>
                                    <SelectField
                                      options={COMPLIANCE_STATUS_OPTIONS.map(value => value.id)}
                                      name={`receiptProducts[${index}].complianceStatus`}
                                    />
                                  </th>
                                  <td>
                                    {item.complianceStatus === ComplianceStatus.ConformeAvecReserve &&
                                        <InputField name={`receiptProducts[${index}].complianceReserve`} type="text"/>}
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
                </div>
              </div>
            </FormikProvider></div>
        </div></div>
      </div>        </div>

    </FormikProvider>

  );
};
