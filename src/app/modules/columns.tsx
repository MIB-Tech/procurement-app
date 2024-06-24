import {
  ColumnMapping,
  ListingViewType,
  ModelMapping,
  ViewEnum,
} from "../../_core/types/ModelMapping";
import { StringFormat } from "../../_core/Column/String/StringColumn";
import axios from "axios";
import React from "react";
import { NumberFormat } from "../../_core/Column/Number/NumberColumn";
import { ColumnTypeEnum } from "../../_core/types/types";
import { toAbsoluteApi } from "./utils";
import moment from "moment/moment";

export const CREATED_AT_COLUMN: ColumnMapping<any> = {
  type: ColumnTypeEnum.String,
  format: StringFormat.Datetime,
  title: "CREATE_TIME",
  nullable: true,
  min: moment().format(),
};

export const ABSTRACT_FILE_LISTING_VIEW: ListingViewType<any> = {
  type: ViewEnum.Listing,
  sortColumns: {
    originalName: true,
    size: true,
  },
  filterColumns: {
    originalName: true,
    size: true,
  },
  columns: {
    originalName: {
      render: ({ item }) => {
        const { contentUrl, originalName } = item;
        if (!contentUrl) {
          return <span>{originalName}</span>;
        }

        return (
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              axios
                .post(
                  "/custom/download",
                  { contentUrl },
                  { responseType: "blob" }
                )
                .then((response) => {
                  const link = document.createElement("a");
                  link.href = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  link.setAttribute("download", originalName || "file");
                  document.body.appendChild(link);
                  link.click();
                });
            }}
          >
            {originalName}
          </a>
        );
      },
    },
    size: true,
  },
};
export const ABSTRACT_IMAGE_LISTING_VIEW: ListingViewType<any> = {
  ...ABSTRACT_FILE_LISTING_VIEW,
  columns: {
    preview: {
      render: ({ item: { contentUrl } }) => (
        <>
          {contentUrl && (
            <div className='symbol symbol-50px bg-light'>
              <img
                src={toAbsoluteApi(contentUrl)}
                alt=''
              />
            </div>
          )}
        </>
      ),
    },
    ...ABSTRACT_FILE_LISTING_VIEW.columns,
    dimensions: true,
  },
};
export const ABSTRACT_FILE_MAPPING: Omit<
  ModelMapping<any>,
  "recoilState" | "modelName"
> = {
  uploadable: true,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    originalName: {
      type: ColumnTypeEnum.String,
    },
    size: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.DecimalUnit,
    },
  },
  views: [ABSTRACT_FILE_LISTING_VIEW],
};
