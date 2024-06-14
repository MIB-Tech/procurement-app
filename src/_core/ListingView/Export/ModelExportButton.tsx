import { ModelEnum } from "../../../app/modules/types";
import { useMapping } from "../../hooks/UseMapping";
import { Trans, useTrans } from "../../components/Trans";
import { useCollectionQuery } from "../../hooks/UseCollectionQuery";
import { getRoutePrefix, stringToI18nMessageKey } from "../../utils";
import { Button } from "../../components/Button";
import { HydraItem } from "../../types/hydra.types";
import { ColumnTypeEnum } from "../../types/types";
import {
  DateFormatEnum,
  StringFormat,
  TimeFormatEnum,
} from "../../Column/String/StringColumn";
import moment from "moment/moment";
import { utils, writeFile } from "xlsx";
import { plural } from "pluralize";
import React from "react";
import { ExportableColumn, Model } from "../../types/ModelMapping";
import {
  getColumnMapping,
  getPropertyI18NMessageKey,
} from "../Filter/Filter.utils";
import { get } from "lodash";
import { PropertyFilterOperator } from "../Filter/Filter.types";

type ModelExportButtonProps<M extends ModelEnum> = {
  modelName: M;
  items: Array<HydraItem<M>>;
  columns: ExportableColumn<M>;
};
export const ModelExportButton = <M extends ModelEnum>({
  modelName,
  columns,
  items,
}: ModelExportButtonProps<M>) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { trans } = useTrans();
  const { isLoading, refetch } = useCollectionQuery<M>({
    modelName,
    path: `/export${getRoutePrefix(modelName)}`,
    params: {
      filter: {
        property: "id",
        operator: PropertyFilterOperator.In,
        value: items.map((item) => item.id).join(","),
      },
    },
    options: {
      enabled: false,
    },
  });
  const columnNames = Object.keys(columns) as Array<string | keyof Model<M>>;

  return (
    <div className='position-relative'>
      <Button
        variant='outline-default'
        size='sm'
        className='bg-white'
        loading={isLoading}
        disabled={items.length === 0}
        onClick={async () => {
          const headers = columnNames.map((exportableColumnName) => {
            return trans({
              id: getPropertyI18NMessageKey(
                columnDef,
                exportableColumnName.toString()
              ),
            });
          });
          const response = await refetch();
          const collection = response.data?.data["hydra:member"] as Array<
            HydraItem<M>
          >;
          const dataRows = collection.map((item) =>
            columnNames.map((columnName) => {
              const exportColumn = columns[columnName];
              if (typeof exportColumn === "object" && exportColumn.getValue) {
                return exportColumn.getValue(item);
              }

              const value = get(item, columnName);
              const def = getColumnMapping({ modelName, columnName });
              switch (def.type) {
                case ColumnTypeEnum.String:
                  switch (def.format) {
                    case StringFormat.Time:
                      return (
                        value &&
                        moment(value as string).format(
                          def.timeFormat || TimeFormatEnum.Full
                        )
                      );
                    case StringFormat.Date:
                      return (
                        value &&
                        moment(value as string).format(
                          def.dateFormat || DateFormatEnum.European
                        )
                      );
                    case StringFormat.Datetime:
                      return (
                        value &&
                        moment(value as string).format(
                          `${def.dateFormat || DateFormatEnum.European} ${
                            def.timeFormat || TimeFormatEnum.Full
                          }`
                        )
                      );
                    default:
                      return value;
                  }
                case ColumnTypeEnum.Number:
                case ColumnTypeEnum.Boolean:
                  return value;
                case ColumnTypeEnum.Array:
                  return (value as Array<any>)?.join(", ");
                default:
                  return "multiple" in def
                    ? (value as Array<string | HydraItem> | undefined)?.map(
                        (item) =>
                          typeof item === "string" ? item : item["@title"]
                      )
                    : typeof value === "string"
                    ? value
                    : (value as HydraItem)?.["@title"];
              }
            })
          );
          const workSheet = utils.aoa_to_sheet([headers, ...dataRows]);
          const workBook = utils.book_new();
          utils.book_append_sheet(workBook, workSheet, "Sheet1");

          const fileName = `${trans({
            id: stringToI18nMessageKey(plural(modelName)),
          })}.${moment().format()}.xlsx`;
          writeFile(workBook, fileName);
        }}
      >
        <Trans id='EXPORT' />
      </Button>
      {items.length > 0 && (
        <div
          className='position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle badge-primary'
          style={{ zIndex: 100 }}
        >
          {items.length}
        </div>
      )}
    </div>
  );
};
