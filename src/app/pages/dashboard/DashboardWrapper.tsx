/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect } from "react";
import { usePageData } from "../../../_metronic/layout/core";
import { useTrans } from "../../../_core/components/Trans";
import { Widget } from "./Widget";
import { useCollectionQuery } from "../../../_core/hooks/UseCollectionQuery";
import { ModelEnum } from "../../modules/types";
import { capitalize, Skeleton } from "@mui/material";
import { TableView } from "../../../_core/ListingView/views/Table/TableView";
import { ListingColumns } from "../../../_core/types/ModelMapping";
import { NumberUnit } from "../../../_core/components/NumberUnit";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../_core/hooks/UseAuth";

let currentDate = moment();
let ranges: Array<{ start: string; end: string }> = [];
for (let i = 0; i < 4; i++) {
  ranges.push({
    start: currentDate
      .clone()
      .subtract(i, "months")
      .startOf("month")
      .format("YYYY-MM-DD"),
    end: currentDate
      .clone()
      .subtract(i, "months")
      .endOf("month")
      .format("YYYY-MM-DD"),
  });
}

const useStatisticQuery = () => {
  const { tenant } = useAuth();
  return useQuery({
    queryKey: ["BLOCK_1", tenant?.id],
    queryFn: () =>
      axios.get<{
        count: number;
        sum: number;
        ranges: Array<{
          start: string;
          end: string;
          count: number;
          sum: number;
        }>;
      }>("/custom/statistics/purchase-orders", {
        params: {
          clinicId: tenant?.id,
          ...ranges.reduce(
            (previousValue, currentValue, index) => ({
              ...previousValue,
              [`range[${index}][start]`]: currentValue.start,
              [`range[${index}][end]`]: currentValue.end,
            }),
            {}
          ),
        },
      }),
  });
};
const Block1 = () => {
  const { data, isLoading } = useStatisticQuery();
  const title = "Total des bons de commande";

  return (
    <Widget
      variant='primary'
      title={title}
      value={isLoading ? <Skeleton /> : data?.data.count}
      items={(data?.data.ranges || []).map((range) => ({
        title: capitalize(moment(range.start).format("MMM Y")),
        subTitle: title,
        value: range.count,
      }))}
    />
  );
};

const Block2 = () => {
  const { data, isLoading } = useStatisticQuery();
  const title = "Montant TTC des bons de commande";

  return (
    <Widget
      variant='danger'
      title={title}
      value={
        isLoading ? (
          <Skeleton />
        ) : (
          <NumberUnit
            value={data?.data.sum || 0}
            precision={0}
            className='text-white'
            unitProps={{ className: "text-white" }}
          />
        )
      }
      items={(data?.data.ranges || []).map((range) => ({
        title: capitalize(moment(range.start).format("MMM Y")),
        subTitle: title,
        value: (
          <NumberUnit
            value={range.sum}
            precision={0}
          />
        ),
      }))}
      // items={collection.map(item => ({
      //   title: item['@title'],
      //   subTitle: item['@subTitle'],
      //   value: <NumberUnit value={item.totalInclTax} precision={0}/>,
      //   icon: item['@icon']
      // }))}
    />
  );
};

const Block3 = () => {
  const { tenant } = useAuth();
  const { data } = useQuery({
    queryKey: ["BLOCK_3", tenant?.id],
    queryFn: () =>
      axios.get<{
        sum: number;
        vendors: Array<{ name: string; sumTotalInclTax: number }>;
      }>("/custom/statistics/vendors", {
        params: {
          clinicId: tenant?.id,
        },
      }),
  });
  const title = "Top fournisseurs";

  return (
    <Widget
      variant='info'
      title={title}
      items={(data?.data.vendors || []).map((vendor) => ({
        title: vendor.name,
        subTitle: title,
        value: (
          <NumberUnit
            value={vendor.sumTotalInclTax}
            precision={0}
          />
        ),
      }))}
    />
  );
};

const Block4 = () => {
  const { tenant } = useAuth();
  const itemsPerPage = 5;
  const { collection, isLoading, refetch } =
    useCollectionQuery<ModelEnum.PurchaseOrder>({
      modelName: ModelEnum.PurchaseOrder,
      params: {
        itemsPerPage,
        sort: {
          createdAt: "desc",
        },
      },
    });

  useEffect(() => {
    refetch().then((r) => {});
  }, [tenant?.id]);

  return (
    <div className='card card-bordered'>
      <div className='card-header border-0'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>
            Bons de commande récents
          </span>
          <span className='text-muted fw-semibold fs-7'>
            Les {itemsPerPage} derniers bons de commande
          </span>
        </h3>
      </div>
      <div className='card-body py-1 px-3'>
        <TableView
          modelName={ModelEnum.PurchaseOrder}
          columns={
            {
              vendor: true,
              buyer: true,
              totalInclTax: true,
            } as ListingColumns<ModelEnum.PurchaseOrder>
          }
          data={collection}
          loading={isLoading}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
const DashboardPage: FC = () => (
  <>
    <div className='row'>
      <div className='col-4'>
        <Block1 />
      </div>
      <div className='col-4'>
        <Block2 />
      </div>
      <div className='col-4'>
        <Block3 />
      </div>
    </div>
    <div className='mt-5'>
      <Block4 />
    </div>
  </>
);

export const DashboardWrapper: FC = () => {
  const { setPageTitle } = usePageData();
  const { trans } = useTrans();

  useEffect(() => {
    setPageTitle(trans({ id: "DASHBOARD" }));
  }, []);

  return <DashboardPage />;
};
