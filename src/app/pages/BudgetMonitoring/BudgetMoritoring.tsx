/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, ReactNode, useEffect, useState } from "react";
import { usePageData } from "../../../_metronic/layout/core";
import { useTrans } from "../../../_custom/components/Trans";
import { useQuery } from "react-query";
import axios from "axios";
import { NumberUnit } from "../../../_custom/components/NumberUnit";
import { KTSVG } from "../../../_metronic/helpers";
import { useCollectionQuery } from "../../../_custom/hooks/UseCollectionQuery";
import { ModelEnum } from "../../modules/types";
import { getRoutePrefix } from "../../../_custom/utils";
import { HydraItem } from "../../../_custom/types/hydra.types";
import { Modal } from "react-bootstrap";
import { ModelCell } from "../../../_custom/ListingView/views/Table/ModelCell";

type Props = {
  className: string;
  color: string;
  svgIcon: string;
  iconColor: string;
  title: ReactNode;
  description: string;
};

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  description,
}) => {
  return (
    <a
      href='#'
      className={`card bg-${color} hoverable ${className}`}
    >
      {/* begin::Body */}
      <div className='card-body'>
        <KTSVG
          path={svgIcon}
          className={`svg-icon-${iconColor} svg-icon-3x ms-n1`}
        />

        <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>
          {title}
        </div>

        <div className={`fw-bold text-inverse-${color} fs-7`}>
          {description}
        </div>
      </div>
      {/* end::Body */}
    </a>
  );
};

export const BudgetMonitoringPage: FC = () => {
  const { setPageTitle } = usePageData();
  const [selectedClinic, setSelectedClinic] =
    useState<HydraItem<ModelEnum.Clinic> | null>();
  const { data, isLoading } = useQuery({
    queryKey: "BUDGET_TRACKING",
    queryFn: () =>
      axios.get<
        Array<{
          clinicId: number;
          sectionId: number;
          amount: string;
          committed: string;
        }>
      >("/custom/statistics/budgets-details"),
  });

  const clinicCollectionQuery = useCollectionQuery<ModelEnum.Clinic>({
    modelName: ModelEnum.Clinic,
    queryKey: ["BUDGET_TRACKING_CLINICS"],
    path: "/budget-tracking" + getRoutePrefix(ModelEnum.Clinic),
  });
  const sectionCollectionQuery = useCollectionQuery<ModelEnum.ProductSection>({
    modelName: ModelEnum.ProductSection,
    queryKey: ["BUDGET_TRACKING_SECTIONS"],
    path: "/base" + getRoutePrefix(ModelEnum.ProductSection),
  });
  /* const [clinics, setClinics] = useState<Clinics[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:84/clinics")
      .then((response) => {
        const clinicsData: Clinics[] = response.data["hydra:member"];
        setClinics(clinicsData);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête GET:", error);
      });
  }, []);
*/
  const { trans } = useTrans();

  useEffect(() => {
    setPageTitle(trans({ id: "BUDGET_TRACKING" }));
  }, []);

  const collection = data?.data || [];
  const totalAmount = collection.reduce((totalAmount, current) => {
    const amount =
      typeof current.amount === "number"
        ? current.amount
        : parseFloat(current.amount);
    // Vérifier si amount est un nombre valide
    if (!isNaN(amount)) {
      return totalAmount + amount;
    } else {
      return totalAmount;
    }
  }, 0);

  const totalCommitted = collection.reduce(
    (totalCommitted, current) => totalCommitted + parseFloat(current.committed),
    0
  );

  const selectedClinicAmounts = collection.filter(
    ({ clinicId }) => clinicId === selectedClinic?.id
  );
  const selectedClinicTotalAmount: number = selectedClinicAmounts.reduce(
    (previousValue, currentValue) =>
      previousValue + parseFloat(currentValue.amount),
    0
  );
  const selectedClinicTotalCommitted: number = selectedClinicAmounts.reduce(
    (previousValue, currentValue) =>
      previousValue + parseFloat(currentValue.committed),
    0
  );

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <StatisticsWidget5
            className='card-bordered'
            svgIcon='/media/icons/duotune/general/gen032.svg'
            color='white'
            iconColor='primary'
            title={
              <NumberUnit
                value={totalAmount}
                precision={0}
              />
            }
            description='Total (Budgeté)'
          />
        </div>
        <div className='col-3'>
          <StatisticsWidget5
            className='card-bordered'
            svgIcon='/media/icons/duotune/general/gen032.svg'
            color='white'
            iconColor='primary'
            title={
              <NumberUnit
                value={totalCommitted}
                precision={0}
              />
            }
            description='Total (Engagé)'
          />
        </div>
        <div className='col-3'>
          <StatisticsWidget5
            className='card-bordered'
            svgIcon='/media/icons/duotune/general/gen032.svg'
            color='white'
            iconColor='primary'
            title={
              <NumberUnit
                value={totalAmount - totalCommitted}
                precision={0}
              />
            }
            description='Total (Reste)'
          />
        </div>
        <div className='col-3'>
          <StatisticsWidget5
            className='card-bordered'
            svgIcon='/media/icons/duotune/graphs/gra003.svg'
            color='white'
            iconColor='primary'
            title={
              <NumberUnit
                value={(100 * totalCommitted) / totalAmount}
                precision={2}
                unit='%'
              />
            }
            description='% Moyen Engagé'
          />
        </div>
      </div>
      <div className='card card-bordered mt-5'>
        {/*<div className="card-header border-0">*/}
        {/*  <h3 className="card-title align-items-start flex-column">*/}
        {/*    <span className="card-label fw-bold fs-3 mb-1">Bons de commande récents</span>*/}
        {/*    <span className="text-muted fw-semibold fs-7">Les {itemsPerPage} derniers bons de commande</span>*/}
        {/*  </h3>*/}
        {/*</div>*/}
        <div className='card-body py-1 px-3'>
          <div className='table-responsive'>
            <table className='table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0 text-nowrap'>
              <thead className='fs-7 text-gray-400 text-uppercase'>
                <tr>
                  <th>Section Budgétaire</th>
                  {clinicCollectionQuery.collection.map((clinic) => (
                    <th
                      key={clinic.id}
                      className='text-end fw-bold'
                    >
                      <a
                        href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClinic(clinic);
                        }}
                      >
                        <div className='fw-bold'>{clinic["@title"]}</div>
                        <div>{clinic.city.name}</div>
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectionCollectionQuery.collection.map((section) => (
                  <tr key={section.id}>
                    <td>{section["@title"]}</td>
                    {clinicCollectionQuery.collection.map(
                      (clinic, clinicIndex) => {
                        const amountObj = collection.find(
                          (amountObj) =>
                            section.id === amountObj.sectionId &&
                            clinic.id === amountObj.clinicId
                        );
                        const amount = amountObj
                          ? parseFloat(amountObj.amount)
                          : 0;

                        return (
                          <td
                            key={section.id + "." + clinic.id}
                            className='text-end'
                          >
                            <NumberUnit value={amount} />
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </tbody>

              <tfoot className='fw-boldest'>
                <tr>
                  <td className='pt-10'>Total Projet TTC</td>
                  {clinicCollectionQuery.collection.map(
                    (clinic, clinicIndex) => {
                      const totalAmount = collection.reduce(
                        (totalAmount, { amount, clinicId }) => {
                          if (clinic.id !== clinicId) return totalAmount;

                          return totalAmount + parseFloat(amount);
                        },
                        0
                      );

                      return (
                        <td
                          key={clinic.id}
                          className='text-end pt-10'
                        >
                          <NumberUnit value={totalAmount} />
                        </td>
                      );
                    }
                  )}
                </tr>
                <tr>
                  <td>Total Engagé TTC</td>
                  {clinicCollectionQuery.collection.map(
                    (clinic, clinicIndex) => {
                      const totalCommitted = collection.reduce(
                        (sum, { committed, clinicId }) => {
                          if (clinic.id !== clinicId) return sum;

                          return sum + parseFloat(committed);
                        },
                        0
                      );

                      return (
                        <td
                          key={clinic.id}
                          className='text-end'
                        >
                          <NumberUnit value={totalCommitted} />
                        </td>
                      );
                    }
                  )}
                </tr>
                <tr>
                  <td>% Engagé</td>
                  {clinicCollectionQuery.collection.map(
                    (clinic, clinicIndex) => {
                      const totalAmount = collection.reduce(
                        (sum, { amount, clinicId }) => {
                          if (clinic.id !== clinicId) return sum;

                          return sum + parseFloat(amount);
                        },
                        0
                      );
                      const totalCommitted = collection.reduce(
                        (sum, { committed, clinicId }) => {
                          if (clinic.id !== clinicId) return sum;

                          return sum + parseFloat(committed);
                        },
                        0
                      );
                      return (
                        <td
                          key={clinic.id}
                          className='text-end'
                        >
                          <NumberUnit
                            value={
                              totalAmount !== 0
                                ? (100 * totalCommitted) / totalAmount
                                : 0
                            }
                            unit='%'
                          />
                        </td>
                      );
                    }
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {selectedClinic && (
        <Modal
          show
          size='lg'
          onHide={() => setSelectedClinic(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <ModelCell item={selectedClinic} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex'>
              <div className='me-5'>
                <StatisticsWidget5
                  className='card-bordered mb-3'
                  svgIcon='/media/icons/duotune/general/gen032.svg'
                  color='white'
                  iconColor='primary'
                  title={
                    <NumberUnit
                      value={selectedClinicTotalAmount}
                      precision={0}
                    />
                  }
                  description='Total (Budgeté)'
                />
                <StatisticsWidget5
                  className='card-bordered mb-3'
                  svgIcon='/media/icons/duotune/general/gen032.svg'
                  color='white'
                  iconColor='primary'
                  title={
                    <NumberUnit
                      value={selectedClinicTotalCommitted}
                      precision={0}
                    />
                  }
                  description='Total (Engagé)'
                />
                <StatisticsWidget5
                  className='card-bordered mb-3'
                  svgIcon='/media/icons/duotune/general/gen032.svg'
                  color='white'
                  iconColor='primary'
                  title={
                    <NumberUnit
                      value={
                        selectedClinicTotalAmount - selectedClinicTotalCommitted
                      }
                      precision={0}
                    />
                  }
                  description='Total (Reste)'
                />
                <StatisticsWidget5
                  className='card-bordered'
                  svgIcon='/media/icons/duotune/graphs/gra003.svg'
                  color='white'
                  iconColor='primary'
                  title={
                    <NumberUnit
                      value={
                        (selectedClinicTotalCommitted /
                          selectedClinicTotalAmount) *
                        100
                      }
                      unit='%'
                    />
                  }
                  description='% Moyen Engagé'
                />
              </div>
              <div className='flex-grow-1'>
                <div className='table-responsive'>
                  <table className='table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0'>
                    <thead className='fs-7 text-gray-400 text-uppercase'>
                      <tr>
                        <th>Section Budgétaire</th>
                        <th className='text-end'>Budgeté</th>
                        <th className='text-end'>Engagé</th>
                        <th className='text-end'>Reste</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionCollectionQuery.collection.map((section) => {
                        const filteredAmounts = selectedClinicAmounts.filter(
                          ({ sectionId }) => sectionId === section.id
                        );
                        const amount: number = filteredAmounts.reduce(
                          (previousValue, currentValue) =>
                            previousValue + parseFloat(currentValue.amount),
                          0
                        );
                        const committed: number = filteredAmounts.reduce(
                          (previousValue, currentValue) =>
                            previousValue + parseFloat(currentValue.committed),
                          0
                        );
                        return (
                          <tr key={section.id}>
                            <td>{section["@title"]}</td>
                            <td className='text-end'>
                              <NumberUnit value={amount} />
                            </td>
                            <td className='text-end'>
                              <NumberUnit value={committed} />
                            </td>
                            <td className='text-end'>
                              <NumberUnit value={amount - committed} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
