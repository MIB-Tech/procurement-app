import { TitleContent } from "./HeaderCell";
import React, { FC, HTMLAttributes, ReactNode } from "react";
import { CellContent } from "./BodyCell";
import { Skeleton } from "@mui/material";
import {
  ColumnMapping,
  ListingColumns,
  Model,
} from "../../../types/ModelMapping";
import { HydraItem } from "../../../types/hydra.types";
import { Trans } from "../../../components/Trans";
import clsx from "clsx";
import { ModelCell, ModelCellSkeleton } from "./ModelCell";
import { useMapping } from "../../../hooks/UseMapping";
import { stringToI18nMessageKey } from "../../../utils";
import { PaginationInput } from "../../Pagination/Pagination.types";
import { ModelEnum } from "../../../../app/modules/types";
import { Checkbox } from "../../../Column/Boolean/Chechbox/Checkbox";
import { ColumnTypeEnum } from "../../../types/types";
import { Bullet } from "../../../components/Bullet";

export type TableViewColumnMapping<M extends ModelEnum> = ColumnMapping<M>;

export const EmptyList: FC<{ bordered?: boolean }> = ({ bordered }) => (
  <div className={clsx("card", bordered && "card-bordered")}>
    <div className='card-body text-center fw-bolder'>
      <Trans id='NO_ITEM_FOUND' />
    </div>
  </div>
);

type TableViewProps<M extends ModelEnum> = {
  modelName: M;
  columns: ListingColumns<M>;
  data: Array<HydraItem<M>>;
  loading?: boolean;
  renderAction?: (props: { item: HydraItem<M> }) => ReactNode;
  selectedItems?: Array<HydraItem<M>>;
  setSelectedItems?: (item: Array<HydraItem<M>>) => void;
} & Pick<PaginationInput, "itemsPerPage"> &
  HTMLAttributes<HTMLDivElement>;

export const TableView = <M extends ModelEnum>(props: TableViewProps<M>) => {
  const {
    modelName,
    columns,
    data,
    loading,
    renderAction,
    itemsPerPage = 1,
    className,
    selectedItems = [],
    setSelectedItems,
  } = props;
  const { columnDef } = useMapping<M>({ modelName });
  const columnNames = Object.keys(columns) as Array<keyof Model<M> | string>;
  const allItemsChecked = data.every((item) =>
    selectedItems.some((selectedItem) => selectedItem.id === item.id)
  );

  return (
    <div className={clsx("table-responsive", className)}>
      <table
        className={clsx(
          "table table-sm table-row-bordered table-row-dark gy-1 align-middle mb-0"
        )}
      >
        <thead className='fs-7 text-gray-400 text-uppercase'>
          {columnNames.length > 0 && (
            <tr>
              <th className='border-end'>
                <div className='d-flex gap-2'>
                  {setSelectedItems && (
                    <Checkbox
                      size='sm'
                      disabled={loading}
                      checked={
                        data.length > 0 &&
                        data.every((item) =>
                          selectedItems.some(
                            (selectedItem) => selectedItem.id === item.id
                          )
                        )
                      }
                      onChange={() => {
                        setSelectedItems(
                          allItemsChecked
                            ? selectedItems.filter(
                                (selectedItem) =>
                                  !data.some(
                                    (item) => item.id === selectedItem.id
                                  )
                              )
                            : [
                                ...selectedItems,
                                ...data.filter(
                                  (item) =>
                                    !selectedItems.some(
                                      (selectedItem) =>
                                        selectedItem.id === item.id
                                    )
                                ),
                              ]
                        );
                      }}
                    />
                  )}
                  <div className='text-truncate text-uppercase'>
                    <Trans id={stringToI18nMessageKey(modelName)} />
                  </div>
                </div>
              </th>
              {columnNames.map((columnName) => {
                const def =
                  (columnDef[columnName] as ColumnMapping<M>) || undefined;

                return (
                  <th
                    key={columnName.toString()}
                    className={clsx(
                      "text-truncate text-uppercase",
                      def?.type === ColumnTypeEnum.Number && "text-end"
                    )}
                  >
                    <TitleContent
                      columnName={columnName}
                      title={columnDef[columnName]?.title}
                    />
                  </th>
                );
              })}
              {renderAction && <th className='text-end' />}
            </tr>
          )}
        </thead>
        <tbody>
          {loading &&
            Array.from(Array(itemsPerPage).keys()).map((key) => (
              <tr key={key}>
                <td className='border-end border-2'>
                  <div className='d-flex gap-2 w-100'>
                    {setSelectedItems && (
                      <Checkbox
                        size='sm'
                        disabled
                      />
                    )}
                    <ModelCellSkeleton />
                  </div>
                </td>
                {Array.from(Array(columnNames.length).keys()).map((index) => (
                  <td key={`${key}.${index}`}>
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columnNames.length + 1}>
                <EmptyList />
              </td>
            </tr>
          )}
          {data.map((item) => {
            const checked = selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
            );

            return (
              <tr key={item.id}>
                <td className='border-end'>
                  <div className='d-flex gap-2 flex-grow-1'>
                    {setSelectedItems && (
                      <Checkbox
                        size='sm'
                        checked={checked}
                        onChange={() => {
                          setSelectedItems(
                            checked
                              ? selectedItems.filter(
                                  (selectedItem) => selectedItem.id !== item.id
                                )
                              : [...selectedItems, item]
                          );
                        }}
                      />
                    )}
                    <ModelCell item={item} />
                  </div>
                </td>
                {columnNames.map((columnName) => {
                  const column = columns[columnName];
                  const def =
                    (columnDef[columnName] as ColumnMapping<M>) || undefined;

                  return (
                    <td
                      key={`${item.id}.${columnName.toString()}`}
                      className={clsx(
                        def?.type === ColumnTypeEnum.Number && "text-end"
                      )}
                    >
                      {typeof column === "object" && column.render ? (
                        column.render?.({ item })
                      ) : (
                        <CellContent
                          // FIXME
                          value={item[columnName as keyof Model<M>]}
                          {...def}
                        />
                      )}
                    </td>
                  );
                })}
                {renderAction && (
                  <td className='text-end w-30px'>{renderAction({ item })}</td>
                )}
              </tr>
            );
          })}
          {!loading && data.length > 0 && (
            <tr className='fs-7 text-gray-400 text-uppercase'>
              <td className='border-end text-end'>Total {data.length}</td>
              {columnNames.map((columnName) => {
                const columnMapping = columnDef[columnName] as
                  | ColumnMapping<M>
                  | undefined;
                let show: boolean = false;

                let value: any = "";
                switch (columnMapping?.type) {
                  case ColumnTypeEnum.Number:
                    show = true;
                    value = data.reduce((count, currentValue) => {
                      const _value = currentValue[
                        columnName as keyof Model<M>
                      ] as Model<M> | undefined;
                      if (typeof _value !== "number") {
                        return count;
                      }

                      return count + _value;
                    }, 0);
                    break;
                }

                return (
                  <td
                    key={columnName.toString()}
                    className={clsx(
                      "text-truncate text-uppercase",
                      columnMapping?.type === ColumnTypeEnum.Number &&
                        "text-end"
                    )}
                  >
                    {show ? (
                      columnMapping && (
                        <>
                          {columnMapping.footer?.({
                            value,
                            collection: data,
                          }) || (
                            <CellContent
                              value={value}
                              {...columnMapping}
                            />
                          )}
                        </>
                      )
                    ) : (
                      <Bullet />
                    )}
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
