import React, { Fragment } from "react";
import { useMapping } from "../hooks/UseMapping";
import { ItemView } from "../components/ItemView";
import { Skeleton } from "@mui/material";
import { Trans } from "../components/Trans";
import clsx from "clsx";
import {
  ColumnDef,
  ColumnMapping,
  DetailColumns,
  DetailViewType,
  Model,
  ViewEnum,
} from "../types/ModelMapping";
import { TitleContent } from "../ListingView/views/Table/HeaderCell";
import { ListingView } from "../ListingView/ListingView";
import { Link } from "react-router-dom";
import { DetailViewColumnContent } from "./DetailViewColumnContent";
import { useAuth } from "../hooks/UseAuth";
import { camelCaseToDash } from "../utils";
import { StringFormat } from "../Column/String/StringColumn";
import { useNestedProperty } from "../hooks/UseNestedProperty";
import { useItemQuery } from "../hooks/UseItemQuery";
import { useUri } from "../hooks/UseUri";
import { ColumnTypeEnum } from "../types/types";
import { ModelEnum } from "../../app/modules/types";
import { ItemOverview } from "./ItemOverview";

export const DEFAULT_DETAIL_VIEW: DetailViewType<any> = {
  type: ViewEnum.Detail,
};

export const DetailView = <M extends ModelEnum>({
  modelName,
}: {
  modelName: M;
}) => {
  const { columnDef, views } = useMapping<M>({ modelName });
  const { isGranted } = useAuth();
  const view = (views?.find((view) => view.type === ViewEnum.Detail) ||
    DEFAULT_DETAIL_VIEW) as DetailViewType<M>;
  const { property } = useNestedProperty<M>();
  const isOverview = !property;

  const columns = view.columns
    ? view.columns
    : (Object.keys(columnDef) as Array<keyof Model<M>>)
        .filter((columnName) => {
          if (["id"].includes(columnName.toString())) {
            return false;
          }

          const def = columnDef[columnName];
          switch (def.type) {
            case ColumnTypeEnum.String:
              return def.format !== StringFormat.Password;
            case ColumnTypeEnum.Array:
              return false;
            default:
              return true;
          }
        })
        .reduce(
          (obj, columnName) => ({ ...obj, [columnName]: true }),
          {} as DetailColumns<M>
        );

  const column = property && columns[property];
  const uri = useUri({ modelName });
  const { item, isLoading } = useItemQuery<M>({
    modelName,
    // enabled: isOverview || (typeof column !== 'boolean' && column?.as === 'TAB')
  });
  const columnNames = (
    Object.keys(columns) as Array<keyof typeof columns>
  ).filter((columnName) => {
    const column = property && columns[columnName];

    if (typeof column === "boolean") {
      return column;
    }

    const display = column?.display;
    if (display && item) {
      return display({ item });
    }

    const grantedRoles = column?.grantedRoles;

    return !grantedRoles || isGranted(grantedRoles);
  });
  const embeddedColumnNames = columnNames.filter((columnName) => {
    const def = columnDef[columnName] as ColumnMapping<M> | undefined;
    if (!def) {
      const column = columns[columnName];

      return typeof column !== "boolean" && column?.as === "TAB";
    }

    switch (def.type) {
      case ColumnTypeEnum.String:
      case ColumnTypeEnum.Number:
      case ColumnTypeEnum.Boolean:
      case ColumnTypeEnum.Array:
        return false;
      default:
        return "multiple" in def;
    }
  });

  const emptyColumnNames = columnNames.filter((columnName) => {
    const column = columns[columnName];

    return typeof column !== "boolean" && column?.as === "EMPTY";
  });
  const overviewColumnNames = columnNames.filter((columnName) => {
    return (
      !embeddedColumnNames.includes(columnName) &&
      !emptyColumnNames.includes(columnName)
    );
  });

  const embeddedModelNameType = property && columnDef[property]?.type;

  return (
    <div>
      <ItemOverview modelName={modelName}>
        <div className='separator' />
        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
          <li className='nav-item'>
            <Link
              to={uri}
              relative={isOverview ? "route" : "path"}
              className={clsx(
                "nav-link text-active-primary py-2 me-3",
                isOverview && "active"
              )}
            >
              <Trans id='OVERVIEW' />
            </Link>
          </li>

          {!isLoading &&
            embeddedColumnNames.map((columnName) => {
              const to = camelCaseToDash(columnName.toString());
              const def = columnDef[columnName] as ColumnMapping<M> | undefined;

              return (
                <li
                  key={to}
                  className='nav-item'
                >
                  <Link
                    to={to}
                    className={clsx(
                      "nav-link text-active-primary py-3",
                      property === columnName && "active"
                    )}
                  >
                    <TitleContent
                      columnName={columnName.toString()}
                      title={def?.title}
                    />
                  </Link>
                </li>
              );
            })}
        </ul>
      </ItemOverview>
      <div className=''>
        {isOverview && (
          <div className='d-flex flex-column gap-3'>
            {emptyColumnNames.map((columnName) => {
              const def = columnDef[columnName] as ColumnMapping<M> | undefined;
              const column = columns[columnName];
              const render =
                typeof column !== "boolean" ? column?.render : undefined;

              return (
                <div
                  key={columnName.toString()}
                  className='mb-5'
                >
                  {isLoading && <Skeleton />}
                  {item && (
                    <>
                      {def ? (
                        <DetailViewColumnContent
                          item={item}
                          columnName={columnName as keyof Model<M>}
                          render={render}
                          columnMapping={def}
                        />
                      ) : (
                        render?.({ item })
                      )}
                    </>
                  )}
                </div>
              );
            })}
            <div className='card card-bordered'>
              <div className='card-body'>
                <ItemView
                  rowClassName='row row-cols-sm-3'
                  modelName={modelName}
                  detailView
                  columnDef={overviewColumnNames.reduce(
                    (prev, curr) => ({
                      ...prev,
                      [curr]: columnDef[curr as keyof Model<M>],
                    }),
                    {} as ColumnDef<M>
                  )}
                  renderContent={({ columnName }) => {
                    if (isLoading) {
                      return <Skeleton className='mw-200px' />;
                    }

                    if (!item) {
                      return <>NO ITEM</>;
                    }

                    const def = columnDef[columnName];
                    const column = columns[columnName];

                    // if (columnName.toString().includes('.')) {
                    //   console.log(getColumnMapping({modelName, columnName}), def);
                    // }

                    return (
                      <DetailViewColumnContent
                        item={item}
                        columnName={columnName}
                        render={
                          typeof column !== "boolean"
                            ? column?.render
                            : undefined
                        }
                        columnMapping={def}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {!isOverview && (
          <>
            {!embeddedModelNameType ||
            embeddedModelNameType === ColumnTypeEnum.String ||
            embeddedModelNameType === ColumnTypeEnum.Number ||
            embeddedModelNameType === ColumnTypeEnum.Boolean ||
            embeddedModelNameType === ColumnTypeEnum.Object ||
            embeddedModelNameType === ColumnTypeEnum.Array ? (
              item && (
                <DetailViewColumnContent
                  item={item}
                  columnName={property}
                  columnMapping={columnDef[property]}
                  render={
                    typeof column !== "boolean" ? column?.render : undefined
                  }
                />
              )
            ) : (
              <ListingView
                modelName={embeddedModelNameType}
                parentModelName={modelName}
                parent={item}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
