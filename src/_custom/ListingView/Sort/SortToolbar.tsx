import React, { HTMLAttributes, useState } from "react";
import { Formik } from "formik";
import { Button } from "../../components/Button";
import { Dropdown } from "react-bootstrap";
import { ClickAwayListener } from "@mui/material";
import clsx from "clsx";
import { ColumnDef, Model } from "../../types/ModelMapping";
import { Trans } from "../../components/Trans";
import { stringToI18nMessageKey } from "../../utils";
import { SortInput } from "../ListingView.types";
import { DirectionField } from "./DirectionField";
import { ModelEnum } from "../../../app/modules/types";
import { SVG } from "../../components/SVG/SVG";
import { Help } from "../../components/Help";
import { DivToggle } from "../Filter/DivToggle";

type Props<M extends ModelEnum> = {
  sort: SortInput<M>;
  columnDef: ColumnDef<M>;
  onChange: (sort: SortInput<M>) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;
const SortToolbar = <M extends ModelEnum>({
  onChange,
  columnDef,
  sort = {},
  className,
}: Props<M>) => {
  const [open, setOpen] = useState<boolean>(false);

  const columnNames = Object.keys(columnDef) as (keyof Model<M>)[];
  if (columnNames.length === 0) {
    return <></>;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={sort}
      onSubmit={onChange}
    >
      {({ handleSubmit, values, setValues }) => {
        const { length } = (
          Object.keys(values) as Array<keyof Model<M>>
        ).filter((key) => values[key]);
        const dirty: boolean = length > 0;

        return (
          <>
            <ClickAwayListener
              onClickAway={() => {
                if (open) {
                  setOpen(!open);
                }
              }}
            >
              <Dropdown
                show={open}
                className={className}
              >
                <Dropdown.Toggle
                  as={DivToggle}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Help overlay={<Trans id='SORT' />}>
                    <Button
                      variant='outline-default'
                      size='sm'
                      icon
                      className={clsx(
                        "d-flex gap-1 align-items-center bg-white",
                        length > 0 && "position-relative"
                      )}
                    >
                      <SVG path='/arrows/arr039.svg' />
                      {dirty && (
                        <div className='position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle badge-primary'>
                          {length}
                        </div>
                      )}
                    </Button>
                  </Help>
                </Dropdown.Toggle>
                <Dropdown.Menu className='px-3 py-3 w-300px'>
                  <div className='d-flex flex-column gap-2'>
                    {columnNames.map((columnName) => {
                      const name = columnName.toString();
                      const { title = stringToI18nMessageKey(name) } =
                        columnDef[columnName];

                      return (
                        <div
                          key={name}
                          className='d-flex justify-content-between '
                        >
                          <label className='d-flex align-items-center fw-bold text-truncate'>
                            <Trans id={title} />
                          </label>
                          <DirectionField
                            name={name}
                            {...columnDef[columnName]}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className='d-flex pt-2'>
                    <Button
                      variant='light'
                      size='sm'
                      className='me-2'
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Trans id='CLOSE' />
                    </Button>
                    <Button
                      variant='light'
                      size='sm'
                      className='me-2'
                      disabled={!dirty}
                      onClick={() => {
                        setValues({});
                        handleSubmit();
                      }}
                    >
                      <Trans id='CLEAR' />
                    </Button>
                    {/*<Button*/}
                    {/*  variant='light'*/}
                    {/*  size='sm'*/}
                    {/*  className='me-2'*/}
                    {/*  onClick={() => {*/}
                    {/*    setValues(initialValues);*/}
                    {/*    handleSubmit();*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Reset*/}
                    {/*</Button>*/}
                    <Button
                      variant='primary'
                      size='sm'
                      className='fw-bolder ms-auto'
                      onClick={() => {
                        handleSubmit();
                        setOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </ClickAwayListener>
          </>
        );
      }}
    </Formik>
  );
};

export { SortToolbar };
