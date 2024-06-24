import React, { HTMLAttributes } from "react";
import { ObjectColumn, ObjectFormat } from "./ObjectColumn";
import { Bullet } from "../../components/Bullet";
import { toAbsoluteApi } from "../../../app/modules/utils";
import { Model } from "../../types/ModelMapping";
import { ModelEnum } from "../../../app/modules/types";
import { CellContentProps } from "../../ListingView/views/Table/BodyCell";
import clsx from "clsx";

type ObjectCellProps<M extends ModelEnum> = Pick<
  CellContentProps<M>,
  "item" | "columnName"
> &
  HTMLAttributes<any> & {
    columnMapping: ObjectColumn;
  };
export const ObjectCell = <M extends ModelEnum>({
  item,
  columnName,
  columnMapping,
  ...props
}: ObjectCellProps<M>) => {
  switch (columnMapping.format) {
    case ObjectFormat.Image:
      const contentUrlKey =
        columnMapping.fileContentUrl || `${columnName.toString()}ContentUrl`;
      // @ts-ignore
      const contentUrl = item[contentUrlKey];
      if (!contentUrl) return <Bullet />;

      return (
        <span
          {...props}
          className={clsx("symbol symbol-40px me-4", props.className)}
        >
          <img
            className='rounded-1'
            src={toAbsoluteApi(contentUrl)}
            alt=''
          />
        </span>
      );

    default:
      return <>TODO OBJECT</>;
  }
};
