import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { FieldArray, Formik, FormikProps } from 'formik';
import { Button } from '../../components/Button';
import { Dropdown } from 'react-bootstrap';
import { ClickAwayListener } from '@mui/material';
import clsx from 'clsx';
import { CompoundFilterOperator, Filter, PropertyFilter, PropertyFilterOperator } from './Filter.types';
import { SVG } from '../../components/SVG/SVG';
import equal from 'deep-equal';
import { SelectField } from '../../Column/controls/fields/SelectField/SelectField';
import { FilterColumns, Model, TypeColum } from '../../types/ModelMapping';
import { Trans, useTrans } from '../../components/Trans';
import { StringFormat } from '../../Column/String/StringColumn';
import { stringToI18nMessageKey } from '../../utils';
import { FilterValueField } from './FilterValueField';
import { TogglerProps } from '../../components/RouteAction';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { useMapping } from '../../hooks/UseMapping';
import { getColumnMapping } from './Filter.utils';
import { ColumnTypeEnum } from '../../types/types';
import { ModelEnum } from '../../../app/modules/types';
import { Help } from '../../components/Help';


export const DivToggle = React.forwardRef<HTMLDivElement, TogglerProps>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={className?.replace('dropdown-toggle', '')} {...props} />
));

export const EffectListener: FC<{ execute: boolean, handler: () => void }> = ({ execute, handler }) => {
  useEffect(() => {
    if (execute) {
      handler();
    }
  }, [execute]);

  return <></>;
};

const getFilterOperators = (column: TypeColum) => {
  switch (column.type) {
    case ColumnTypeEnum.String:
      switch (column.format) {
        case StringFormat.Datetime:
        case StringFormat.Date:
        case StringFormat.Time:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.GreaterThan,
            PropertyFilterOperator.GreaterThanOrEqual,
            PropertyFilterOperator.LessThan,
            PropertyFilterOperator.LessThanOrEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull
          ];
        case StringFormat.Select:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull
          ];
        case StringFormat.Text:
        case StringFormat.Email:
        case StringFormat.PhoneNumber:
        case StringFormat.Link:
        case StringFormat.Qrcode:
        case undefined:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.Contain,
            PropertyFilterOperator.DoesNotContain,
            PropertyFilterOperator.Start,
            PropertyFilterOperator.End,
            PropertyFilterOperator.DoesNotStart,
            PropertyFilterOperator.DoesNotEnd,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull
          ];
        case StringFormat.Icon:
          return [
            PropertyFilterOperator.Equal,
            PropertyFilterOperator.NotEqual,
            PropertyFilterOperator.IsNull,
            PropertyFilterOperator.IsNotNull
          ];
        default:
          return [];
      }
    case ColumnTypeEnum.Number:
      return [
        PropertyFilterOperator.Equal,
        PropertyFilterOperator.NotEqual,
        PropertyFilterOperator.GreaterThan,
        PropertyFilterOperator.GreaterThanOrEqual,
        PropertyFilterOperator.LessThan,
        PropertyFilterOperator.LessThanOrEqual,
        PropertyFilterOperator.IsNull,
        PropertyFilterOperator.IsNotNull
      ];
    case ColumnTypeEnum.Boolean:
      return [
        PropertyFilterOperator.Equal
      ];
    default:
      return [
        PropertyFilterOperator.Equal,
        PropertyFilterOperator.NotEqual,
        PropertyFilterOperator.IsNull,
        PropertyFilterOperator.IsNotNull
      ];
  }
};

const getPropertyFilter = (props: TypeColum) => {

  switch (props.type) {
    case ColumnTypeEnum.String:
      let operator: PropertyFilterOperator;
      let value: any;
      switch (props.format) {
        case StringFormat.Text:
        case StringFormat.Email:
        case StringFormat.PhoneNumber:
        case StringFormat.Link:
        case StringFormat.Qrcode:
          operator = PropertyFilterOperator.Contain;
          break;
        default:
          operator = PropertyFilterOperator.Equal;
      }

      switch (props.format) {
        case StringFormat.Icon:
          value = null;
          break;
        default:
          value = '';
      }

      return { operator, value };
    case ColumnTypeEnum.Number:
      return {
        operator: PropertyFilterOperator.Equal,
        value: 0
      };
    case ColumnTypeEnum.Boolean:
      return {
        operator: PropertyFilterOperator.Equal,
        value: true
      };
    default:
      return {
        operator: PropertyFilterOperator.Equal,
        value: null
      };
  }
};

type Props<M extends ModelEnum> = {
  modelName: M
  value: Filter<M>
  columns: FilterColumns<M>
  onChange: (value: Filter<M>) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
export const isValueless = (operator: PropertyFilterOperator) => {
  switch (operator) {
    case PropertyFilterOperator.IsNull:
    case PropertyFilterOperator.IsNotNull:
    case PropertyFilterOperator.IsTrue:
    case PropertyFilterOperator.IsFalse:
      return true;
    default:
      return false;
  }
};
const FilterToolbar = <M extends ModelEnum>({ onChange, modelName, columns, value, className }: Props<M>) => {
  const {columnDef} = useMapping<M>({modelName})
  const [open, setOpen] = useState<boolean>(false);
  const { trans } = useTrans();
  const columnNames = Object.keys(columns) as (string | keyof Model<M>)[];

  return (
    <Formik
      enableReinitialize
      initialValues={value}
      onSubmit={onChange}
    >
      {({ values, handleSubmit, setFieldValue, setValues }: FormikProps<Filter<M>>) => {
        if ('property' in values) {
          return <>TODO Property Filter</>;
        }

        const { operator: compoundOperator, filters } = values;
        const dirty: boolean = filters.length > 0;

        return (
          <>
            <EffectListener execute={!open} handler={() => { setValues(value); }} />
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
                  <Help overlay={<Trans id='FILTER' />}>
                    <Button
                      variant='light'
                      size='sm'
                      icon
                      className={clsx('d-flex gap-1 align-items-center', dirty && 'position-relative', className)}
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
                    <Dropdown.Menu align='end' className='p-5 w-300px w-md-500px w-lg-600px -mh-400px -scroll-y'>
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
                        // //FIXME Removing this condition causes atom's state issue
                        // if (!(property in columnDef)) {
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
                                  getOptionLabel={option => {
                                    let label:I18nMessageKey
                                    const _option = option.toString()
                                    if (_option.includes('.')) {
                                      const _columnName = _option.split('.').pop() as string

                                      label = stringToI18nMessageKey(_columnName) as I18nMessageKey
                                    } else {
                                      label = columnDef[option].title || stringToI18nMessageKey(_option)
                                    }

                                    return trans({ id: label })
                                  }}
                                  onChange={option => {
                                    const columnMapping = getColumnMapping({ modelName, columnName: option })

                                    const propertyFilter: PropertyFilter<M> = {
                                      property: option,
                                      ...getPropertyFilter(columnMapping)
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
                                  <FilterValueField
                                    name={`filters[${index}][value]`}
                                    operator={operator}
                                    column={columnMapping}
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
                              const def = getColumnMapping({ modelName, columnName: property });

                              const propertyFilter: PropertyFilter<M> = {
                                property,
                                ...getPropertyFilter(def)
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

export { FilterToolbar };