import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button } from '../../components/Button';
import { Dropdown } from 'react-bootstrap';
import { ClickAwayListener, Grid } from '@mui/material';
import clsx from 'clsx';
import { BasicFilterProps, PropertyFilterOperator } from './Filter.types';
import { SVG } from '../../components/SVG/SVG';
import { Model } from '../../types/ModelMapping';
import { Trans } from '../../components/Trans';
import { useMapping } from '../../hooks/UseMapping';
import { getColumnMapping, getPropertyI18NMessageKey } from './Filter.utils';
import { ModelEnum } from '../../../app/modules/types';
import { Help } from '../../components/Help';
import { BasicFilterValueField } from './BasicFilterValueField';
import { DivToggle } from './DivToggle';
import { ColumnTypeEnum } from '../../types/types';
import { StringFormat } from '../../Column/String/StringColumn';


const BasicFilterToolbar = <M extends ModelEnum>({
  onChange,
  modelName,
  columns,
  value,
  className
}: BasicFilterProps<M>) => {
  const { columnDef } = useMapping<M>({ modelName });
  const [open, setOpen] = useState<boolean>(false);
  const columnNames = Object.keys(columns) as (string | keyof Model<M>)[];

  return (
    <Formik
      enableReinitialize
      initialValues={value}
      onSubmit={onChange}
    >
      {({ values, setValues, handleSubmit }) => {
        const { length } = (Object.keys(values) as Array<keyof Model<M> | string>).filter(columnName => {
          const value = values[columnName]
          const columnMapping = getColumnMapping({ modelName, columnName });
          switch (columnMapping.type) {
            case ColumnTypeEnum.String:
              switch (columnMapping.format) {
                case StringFormat.Date:
                case StringFormat.Datetime:
                case StringFormat.Time:
                  const [start, end] = [...value];

                  return start || end
              }
              break;
          }

          return value
        });
        const dirty: boolean = length > 0;

        return (
          <>
            <ClickAwayListener onClickAway={() => open && setOpen(false)}>
              <Dropdown className='btn-group-sm' show={open}>
                <Dropdown.Toggle as={DivToggle} onClick={() => setOpen(true)}>
                  <Button
                    variant='outline-default'
                    size='sm'
                    className={clsx(
                      'd-flex gap-1 align-items-center bg-white',
                      dirty && 'position-relative',
                      className
                    )}
                  >
                    <SVG path='/general/gen031.svg' />
                    <Trans id='FILTER' />
                    {dirty && (
                      <div
                        className='position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle badge-primary'
                      >
                        {length}
                      </div>
                    )}
                  </Button>
                </Dropdown.Toggle>
                <Dropdown.Menu className='px-3 py-3 w-300px'>
                  <Grid container spacing={1}>
                    {columnNames.map((columnName, index) => {
                      const columnMapping = getColumnMapping({ modelName, columnName });

                      return (
                        <Grid key={columnName.toString()} item xs={12}>
                          <label className='d-flex align-items-center fw-bold text-truncate'>
                            <Trans id={getPropertyI18NMessageKey(columnDef, columnName)} />
                          </label>
                          <BasicFilterValueField
                            name={`['${columnName.toString()}']`}
                            column={columnMapping}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
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
                      disabled={!dirty}
                      onClick={() => {
                        setValues({});
                        handleSubmit();
                      }}
                    >
                      <Trans id='CLEAR' />
                    </Button>
                    <Button
                      variant='primary'
                      size='sm'
                      className='fw-bolder ms-auto'
                      onClick={() => {
                        handleSubmit();
                        setOpen(false);
                      }}
                    >
                      <Trans id='APPLY' />
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

export { BasicFilterToolbar };