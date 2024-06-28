import { ModelEnum } from "../../../../app/modules/types";
import { FieldProps } from "../../controls/fields";
import { HydraItem } from "../../../types/hydra.types";
import { useField } from "formik";
import React, { useState } from "react";
import { useMapping } from "../../../hooks/UseMapping";
import { ColumnMapping, FormField, Model } from "../../../types/ModelMapping";
import { IconButton } from "../../../components/Button/IconButton";
import { Modal } from "react-bootstrap";
import clsx from "clsx";
import { TitleContent } from "../../../ListingView/views/Table/HeaderCell";
import { ValueField } from "../../ValueField";
import { FieldRender } from "./FieldRender";

export const NestedColumnsButton = <M extends ModelEnum>({
  name,
  modelName,
  columnNames,
  fields,
  item,
  index,
}: FieldProps & {
  modelName: M;
  item: HydraItem;
  index: number;
  columnNames: Array<string | keyof Model<M>>;
  fields: FormField<M>;
}) => {
  const [, { error }] = useField<Array<HydraItem<M>>>({ name });
  const [open, setOpen] = useState<boolean>();
  const { columnDef } = useMapping<M>({ modelName });

  return (
    <>
      <IconButton
        path='/general/gen023.svg'
        variant='primary'
        size='2x'
        onClick={() => setOpen(true)}
        pulse={!!error}
        pulseVariant='danger'
      />
      <Modal
        size='xl'
        show={open}
        onHide={() => setOpen((o) => !o)}
      >
        <Modal.Header closeButton />
        <Modal.Body className='d-flex flex-column gap-5'>
          {columnNames.map((columnName) => {
            // @ts-ignore
            const field = fields[columnName] as FormField<M>;
            const render = typeof field === "object" && field?.render;

            const columnMapping = columnDef[columnName] as
              | ColumnMapping<M>
              | undefined;
            if (!field || !columnMapping) {
              return <></>;
            }

            const objFieldName = `${name}.${index}`;
            const nestedName = `${objFieldName}.${columnName.toString()}`;

            return (
              <div key={nestedName}>
                <label
                  className={clsx(
                    "d-flex fw-semibold text-truncate text-muted",
                    !("multiple" in columnMapping) &&
                      !columnMapping.nullable &&
                      "required"
                  )}
                >
                  <TitleContent
                    columnName={columnName}
                    {...columnMapping}
                  />
                </label>
                {render ? (
                  <FieldRender
                    render={render}
                    objFieldName={objFieldName}
                    nestedName={nestedName}
                  />
                ) : (
                  <ValueField
                    name={nestedName}
                    column={columnDef[columnName]}
                    size='sm'
                  />
                )}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};
