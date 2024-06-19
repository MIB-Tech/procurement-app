import React, { useMemo } from "react";
import { useField } from "formik";
import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import { getRoutePrefix } from "../../../utils";
import {
  FileUploaderField,
  FileUploaderFieldProps,
} from "../../controls/fields/FileUploaderField";
import { HydraItem } from "../../../types/hydra.types";
import { ViewProps } from "../../../ListingView/ListingView.types";
import {
  ColumnTypeEnum,
  ErrorResponse,
  SuccessResponse,
} from "../../../types/types";
import { useMapping } from "../../../hooks/UseMapping";
import { ModelEnum } from "../../../../app/modules/types";
import { ObjectFormat } from "../../Object/ObjectColumn";

type Props<M extends ModelEnum> = Omit<FileUploaderFieldProps, "onDrop"> &
  ViewProps<M>;

export const ModelFileField = <M extends ModelEnum>({
  name,
  modelName,
  ...props
}: Props<M>) => {
  const { columNames, columnDef } = useMapping<M>({ modelName });
  const [{ value }, , { setValue }] = useField<Array<HydraItem>>({ name });
  const { mutate, isLoading } = useMutation<
    AxiosResponse<HydraItem>,
    ErrorResponse<any>,
    Record<any, any>
  >(
    (input) =>
      axios.post(getRoutePrefix(modelName), input, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    {
      onSuccess: async ({ data }) => {
        await setValue([...value, data]);
      },
    }
  );
  const deleteMutation = useMutation<SuccessResponse, any, string>(
    (uri) => axios.delete(uri),
    {
      onSuccess: async (r, uri) => {
        await setValue(value.filter(({ "@id": id }) => id !== uri));
      },
    }
  );
  const columnName = useMemo(() => {
    const firstFileColumnName = columNames.find((columnName) => {
      const columnMapping = columnDef[columnName];

      return (
        columnMapping.type === ColumnTypeEnum.Object &&
        (columnMapping.format === ObjectFormat.File ||
          columnMapping.format === ObjectFormat.Image)
      );
    });

    return firstFileColumnName?.toString() || "file";
  }, [columNames]);

  return (
    <FileUploaderField
      name={name}
      onDrop={(acceptedFiles = []) => {
        let bodyFormData = new FormData();
        acceptedFiles.forEach((file) => {
          bodyFormData.append(columnName, file);
          mutate(bodyFormData);
        });
      }}
      isUploading={isLoading}
      onDelete={({ "@id": id }) => {
        deleteMutation.mutate(id);
      }}
      {...props}
    />
  );
};
