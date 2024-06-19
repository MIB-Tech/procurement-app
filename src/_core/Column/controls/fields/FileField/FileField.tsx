import React, { FC, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";
import { Field } from "../index";
import { Trans } from "../../../../components/Trans";
import { FileFieldProps } from "./FileField.types";
import clsx from "clsx";
import { Button } from "../../../../components/Button";
import { toAbsoluteApi } from "../../../../../app/modules/utils";
import axios from "axios";

export const FileField: FC<FileFieldProps> = ({
  name,
  feedbackLabel,
  accept,
  multiple,
  onDrop,
  ...props
}) => {
  const [{ value: file }, { error }, { setValue }] = useField<File | null>({
    name,
  });
  const [{ value: contentUrl }] = useField<string | null>({
    name: `${name}ContentUrl`,
  });
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      await setValue(acceptedFiles.at(0) || null);
    },
    accept,
    multiple,
  });

  const backgroundImage = useMemo(() => {
    if (!file) return undefined;
    return `url(${URL.createObjectURL(file)})`;
  }, [file]);

  useEffect(() => {
    if (contentUrl) {
      axios
        .post("/custom/download", { contentUrl }, { responseType: "blob" })
        .then(async (response) => {
          const blob = response.data;
          const filename = contentUrl.split("/").pop() || "file";
          const file = new File([blob], filename, { type: blob.type });
          await setValue(file);
        });
    }
  }, [contentUrl, setValue]);

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <div>
        <div
          {...getRootProps()}
          className={clsx(
            "border rounded w-150px h-150px",
            error && "border-danger",
            !file && "text-muted text-center align-content-center"
          )}
          style={{
            backgroundImage,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "center",
            backgroundPositionX: "center",
          }}
        >
          {!file && <Trans id='CONTROL.FILE.LABEL' />}
        </div>
        <input
          {...props}
          {...getInputProps()}
        />
        <div className='d-flex align-items-center gap-2 mt-2'>
          <Button
            size='sm'
            variant='light'
            className='text-danger'
            disabled={!file}
            onClick={async () => {
              await setValue(null);
            }}
          >
            <Trans id='DELETE' />
          </Button>
          {accept && (
            <div className='text-gray-500 fs-8'>
              <div>
                <Trans id='ALLOWED_FILE_TYPES' />
              </div>
              <div>{accept}</div>
            </div>
          )}
        </div>
      </div>
    </Field>
  );
};
