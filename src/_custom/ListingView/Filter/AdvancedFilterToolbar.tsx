import React, { useState } from 'react';
import { FieldArray, Formik, FormikProps } from 'formik';
import { Button } from '../../components/Button';
import { Dropdown } from 'react-bootstrap';
import { ClickAwayListener } from '@mui/material';
import clsx from 'clsx';
import { CompoundFilterOperator, Filter, PropertyFilter, AdvancedFilterProps } from './Filter.types';
import { SVG } from '../../components/SVG/SVG';
import equal from 'deep-equal';
import { SelectField } from '../../Column/controls/fields/SelectField/SelectField';
import { Model } from '../../types/ModelMapping';
import { Trans, useTrans } from '../../components/Trans';
import { AdvancedFilterValueField } from './AdvancedFilterValueField';
import { useMapping } from '../../hooks/UseMapping';
import {
  getAdvancedPropertyFilter,
  getColumnMapping,
  getFilterOperators,
  getPropertyI18NMessageKey,
  isValueless
} from './Filter.utils';
import { ModelEnum } from '../../../app/modules/types';
import { Help } from '../../components/Help';
import { EffectListener } from './EffectListener';
import { DivToggle } from './DivToggle';


const AdvancedFilterToolbar = <M extends ModelEnum>({ onChange, modelName, columns, value, className }: AdvancedFilterProps<M>) => {
  const { columnDef, ...mapping } = useMapping<M>({ modelName });
  const [open, setOpen] = useState<boolean>(false);
  const { trans } = useTrans();
  const columnNames = Object.keys(columns) as (string | keyof Model<M>)[];

  return (
    <Formik
      enableReinitialize
      initialValues={value}
      onSubmit={onChange}
    >
      {({ values, handleSubmit, setFieldValue, setValues }) => {
        if ('property' in values) {
          return <>TODO Property Filter</>;
        }

        const { operator: compoundOperator, filters } = values;
        const dirty: boolean = filters.length > 0;

        return (
          <>
            <EffectListener execute={!open} handler={() => setValues(value)} />
            <ClickAwayListener
              onClickAway={() => {
                if (open) {
                  setOpen(false);
                }
              }}>
              <Dropdown className='btn-group-sm' show={open}>
                <Dropdown.Toggle
                  as={DivToggle}
                  onClick={() => {
                    setOpen(true);
                  }}>
                  <Help overlay={<Trans id='ADVANCED_FILTER' />}>
                    <Button
                      variant='outline-default'
                      size='sm'
                      icon
                      className={clsx(
                        'd-flex gap-1 align-items-center bg-white',
                        dirty && 'position-relative',
                        className
                      )}
                    >
                      <SVG path='/general/gen031.svg' />
                      {dirty && (
                        <div
                          className='position-absolute top-0 start-100 translate-middle badge badge-sm badge-circle badge-primary'
                        >
                          {filters.length}
                        </div>
                      )}
                    </Button>
                  </Help>
                </Dropdown.Toggle>
                <FieldArray
                  name='filters'
                  render={arrayHelpers => (
                    <Dropdown.Menu className='p-5 w-300px w-md-500px w-lg-600px -mh-400px -scroll-y'>
                      <div className='text-gray-600 mb-5'>
                        <Trans
                          id='FILTER.TITLE'
                          values={{ count: filters.length }}
                        />
                      </div>
                      {filters.map((filter, index) => {

                        if ('filters' in filter) {
                          return <>TODO COMPOUND FILTER</>;
                        }

                        const { property, operator } = filter;
                        //FIXME Removing this condition causes atom's state issue
                        // if (!(property in columnDef) && !property.toString().includes('.')) {
                        //   console.log('aaa')
                        //   return <></>;
                        // }

                        const columnMapping = getColumnMapping({ modelName, columnName: property });

                        return (
                          <div key={index} className='row mb-3'>
                            <div
                              className='col-2 d-flex align-items-center justify-content-end fs-bolder text-gray-600'
                            >
                              {index === 0 && <Trans id='WHERE' />}
                              {index === 1 && (
                                <SelectField
                                  size='sm'
                                  name='operator'
                                  options={Object.values(CompoundFilterOperator) as CompoundFilterOperator[]}
                                  getOptionLabel={option => trans({ id: option })}
                                />
                              )}
                              {index > 1 && <Trans id={compoundOperator} />}
                            </div>
                            <div className='col-10 row g-0 pe-3'>
                              <div className='col-3'>
                                <SelectField
                                  className='rounded-end-0 px-3 text-start border-end border-gray-300'
                                  size='sm'
                                  name={`filters[${index}][property]`}
                                  options={columnNames}
                                  getOptionLabel={option => trans({ id: getPropertyI18NMessageKey(columnDef, option) })}
                                  onChange={option => {
                                    const _columnMapping = getColumnMapping({ modelName, columnName: option });

                                    const propertyFilter: PropertyFilter<M> = {
                                      property: option,
                                      ...getAdvancedPropertyFilter(_columnMapping)
                                    };

                                    setFieldValue(`filters[${index}]`, propertyFilter);
                                  }}
                                />
                              </div>
                              <div className={clsx(isValueless(operator) ? 'col' : 'col-3')}>
                                <SelectField
                                  className='rounded-0 px-3 border-end border-gray-300 text-start'
                                  size='sm'
                                  name={`filters[${index}][operator]`}
                                  options={getFilterOperators(columnMapping)}
                                  getOptionLabel={option => trans({ id: option })}
                                />
                              </div>
                              {!isValueless(operator) && (
                                <div className='col-5'>
                                  <AdvancedFilterValueField
                                    name={`filters[${index}][value]`}
                                    operator={operator}
                                    column={columnMapping}
                                    className='rounded-0'
                                  />
                                </div>
                              )}
                              <div className='col-1'>
                                <Button
                                  className='rounded-start-0 border-start border-gray-300 h-100'
                                  variant='light'
                                  icon
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                >
                                  <SVG path='/general/gen034.svg' size='1' />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className='d-flex justify-content-between  flex-wrap gap-2 pt-5'>
                        <div className='d-flex gap-2'>
                          <Button
                            variant='light'
                            size='sm'
                            onClick={(e) => {
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
                              setFieldValue('filters', []);
                              handleSubmit();
                            }}
                          >
                            <Trans id='CLEAR' />
                          </Button>
                        </div>
                        <div className='d-flex gap-2 justify-content-end'>
                          <Button
                            variant='light-primary'
                            size='sm'
                            className='fw-bolder text-truncate'
                            onClick={() => {
                              const property = columnNames[0];
                              const _columnMapping = getColumnMapping({ modelName, columnName: property });

                              const propertyFilter: PropertyFilter<M> = {
                                property,
                                ...getAdvancedPropertyFilter(_columnMapping)
                              };

                              arrayHelpers.push(propertyFilter);
                            }}
                          >
                            <Trans id='ADD_CONDITION' />
                          </Button>
                          <Button
                            variant='primary'
                            size='sm'
                            className='fw-bolder'
                            disabled={equal(values, value)}
                            onClick={() => {
                              handleSubmit();
                              // setOpen(false)
                            }}
                          >
                            <Trans id='APPLY' />
                          </Button>
                        </div>
                      </div>
                    </Dropdown.Menu>
                  )} />
              </Dropdown>
            </ClickAwayListener>
          </>
        );
      }}
    </Formik>
  );
};

export { AdvancedFilterToolbar };