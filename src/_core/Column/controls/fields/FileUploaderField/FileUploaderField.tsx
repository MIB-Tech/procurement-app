import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";
import { Field } from "../index";
import { Trans } from "../../../../components/Trans";
import { FileUploaderFieldProps } from "./FileUploaderField.types";
import { File } from "../../../../components/File/File";
import { HydraItem } from "../../../../types/hydra.types";

export const FileUploaderField: FC<FileUploaderFieldProps> = ({
  name,
  feedbackLabel,
  accept,
  multiple,
  onDrop,
  onDelete,
  isUploading,
  ...props
}) => {
  const [field] = useField<Array<HydraItem>>({ name });
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <Field
      name={name}
      feedbackLabel={feedbackLabel}
    >
      <div>
        <div
          {...getRootProps()}
          className='btn btn-sm btn-primary mb-2'
        >
          <Trans id='CONTROL.FILE.LABEL' />
        </div>
        <input
          {...props}
          id={name}
          {...getInputProps()}
        />
      </div>
      <div className={"d-flex flex-wrap"}>
        {field.value?.map((file) => (
          <File
            key={file.id}
            file={file}
            className='mb-2 me-2'
            onDelete={onDelete}
          />
        ))}
      </div>
    </Field>
  );
};
