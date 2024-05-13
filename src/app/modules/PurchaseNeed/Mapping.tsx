import {
  Model,
  ModelMapping,
  ViewEnum,
} from "../../../_custom/types/ModelMapping";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";
import { PriorityEnum, PurchaseNeedStatusEnum } from "./Model";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { NestedArrayField } from "../../../_custom/Column/Model/Nested/NestedArrayField";
import React, { useMemo, useState } from "react";
import { Input } from "../../../_custom/Column/String/InputBase/Input";
import { Button } from "../../../_custom/components/Button";
import { read } from "xlsx";
import { getData } from "../../../_custom/ImportView/ImportView";
import moment from "moment";
import { array } from "yup";
import { useFormikContext } from "formik";
import { useCollectionQuery } from "../../../_custom/hooks/UseCollectionQuery";
import {
  CompoundFilterOperator,
  PropertyFilterOperator,
} from "../../../_custom/ListingView/Filter/Filter.types";
import { PurchaseNeedProductModel } from "../PurchaseNeedProduct";
import { getRoutePrefix } from "../../../_custom/utils";
import { PurchaseNeedModel } from "./index";

const LinesField = () => {
  const { setFieldValue, values } = useFormikContext<PurchaseNeedModel>();
  const [data, setData] = useState<
    Array<Partial<Record<keyof Model<ModelEnum.PurchaseNeedProduct>, any>>>
  >([]);
  const { collection, isLoading } = useCollectionQuery<ModelEnum.Product>({
    modelName: ModelEnum.Product,
    path: "/base" + getRoutePrefix(ModelEnum.Product),
    params: {
      filter: {
        operator: CompoundFilterOperator.Or,
        filters: data.map((row) => ({
          property: "designation",
          operator: PropertyFilterOperator.Equal,
          value: row.product,
        })),
      },
      //data.map(row=>row.product)
    },
  });

  const validData = useMemo<Array<Partial<PurchaseNeedProductModel>>>(() => {
    let newData: Array<Partial<PurchaseNeedProductModel>> = [];
    data.forEach((row) => {
      const product = collection.find((product) => {
        return product["@title"] === row.product;
      });
      if (product) {
        const line: Partial<PurchaseNeedProductModel> = {
          product: product,
          quantity: parseInt(row.quantity),
        };
        newData.push(line);
      }
    });

    return newData;
  }, [data, collection]);

  return (
    <>
      <div className='d-flex gap-5 mb-3'>
        <Input
          type='file'
          accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              file.arrayBuffer().then((file) => {
                const workbook = read(file /*, { dateNF: 'yyyy-mm-dd' }*/);
                const data = getData<ModelEnum.PurchaseNeedProduct>({
                  workbook,
                  // @ts-ignore
                  mapping: {
                    quantity: "quantity",
                    product: "product",
                    order: "order",
                    id: "id",
                  },
                });
                setData(data);
              });
            } else {
              setData([]);
            }

            // if(file) {
            //   file.arrayBuffer().then(file => {
            //     setFile('workbook', file);
            //   });
            // } else {
            //   // setFieldValue('workbook', undefined);
            // }
          }}
        />
        <Button
          loading={isLoading}
          variant='light-primary'
          disabled={!validData?.length}
          className='text-nowrap'
          onClick={() => {
            setFieldValue("lines", [...values.lines, ...validData]);
          }}
        >
          Importer{" "}
          {data?.length && `(${validData.length}/${data?.length} valide)`}
        </Button>
      </div>
      <NestedArrayField
        modelName={ModelEnum.PurchaseNeedProduct}
        name='lines'
      />
    </>
  );
};

const mapping: ModelMapping<ModelEnum.PurchaseNeed> = {
  modelName: ModelEnum.PurchaseNeed,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    orderNumber: {
      type: ColumnTypeEnum.String,
    },
    description: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    desiredDeliveryDate: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
      min: moment().format(),
    },
    orderedFor: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    buyerFullName: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    recommendedVendors: {
      type: ColumnTypeEnum.Array,
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      title: "CREATE_TIME",
      nullable: true,
      min: moment().format(),
    },
    isRegularized: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    // validationPath: {
    //   type: ColumnTypeEnum.String
    // },
    priority: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        { id: PriorityEnum.Normal, color: "primary" },
        { id: PriorityEnum.Urgent, color: "danger" },
      ],
    },
    status: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      inline: true,
      options: [
        { id: PurchaseNeedStatusEnum.Open, color: "primary" },
        { id: PurchaseNeedStatusEnum.Confirmed, color: "info" },
        { id: PurchaseNeedStatusEnum.PurchaseConfirmed, color: "success" },
        { id: PurchaseNeedStatusEnum.Cancelled, color: "warning" },
      ],
    },
    createdBy: {
      type: ModelEnum.User,
    },
    company: {
      type: ModelEnum.Company,
    },
    receptionManager: {
      type: ModelEnum.User,
    },
    category: {
      type: ModelEnum.Category,
    },
    applicantService: {
      type: ModelEnum.ApplicantService,
    },
    lines: {
      type: ModelEnum.PurchaseNeedProduct,
      multiple: true,
      embeddedForm: true,
      schema: array().min(1),
    },
    attachments: {
      type: ModelEnum.PurchaseNeedAttachment,
      multiple: true,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      },
      filterColumns: {
        createdAt: true,
        category: true,
        status: true,
        priority: true,
      },
    },
    {
      type: ViewEnum.Detail,
    },
    {
      type: ViewEnum.Delete,
    },
    {
      type: ViewEnum.Create,
      slotProps: {
        item: { sm: 6, md: 4, lg: 3, xl: 2 },
      },
      fields: {
        priority: {
          defaultValue: PriorityEnum.Normal,
        },
        desiredDeliveryDate: true,
        description: true,
        company: true,
        orderedFor: true,
        applicantService: true,
        buyerFullName: true,
        receptionManager: true,
        isRegularized: true,
        attachments: true,
        lines: {
          slotProps: { root: { sm: 12, md: 12, lg: 12, xl: 12 } },
          // render: LinesField
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        priority: {
          defaultValue: PriorityEnum.Normal,
        },
        // status: true,
        desiredDeliveryDate: true,
        description: true,
        company: true,
        orderedFor: true,
        applicantService: true,
        buyerFullName: true,
        isRegularized: true,
        attachments: true,
        receptionManager: true,
        lines: {
          render: LinesField,
        },
      },
    },
    {
      type: ViewEnum.Update,
    },
  ],
};

export default mapping;
