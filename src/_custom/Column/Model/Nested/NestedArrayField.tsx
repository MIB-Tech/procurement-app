import React, {useMemo, useRef, useState} from 'react';
import {Field, FieldProps} from '../../controls/fields';
import {ColumnMapping, CreateViewType, Model, UpdateViewType, ViewEnum} from '../../../types/ModelMapping';
import {FieldArray, useField, useFormikContext} from 'formik';
import {useMapping} from '../../../hooks/UseMapping';
import {getDefaultFields, getInitialValues, stringToI18nMessageKey} from '../../../utils';
import {ValueField} from '../../ValueField';
import {AbstractModel, ColumnTypeEnum} from '../../../types/types';
import {ModelEnum} from '../../../../app/modules/types';
import {TitleContent} from '../../../ListingView/views/Table/HeaderCell';
import {DEFAULT_CREATE_VIEW} from '../../../CreateView/CreateView';
import {DEFAULT_UPDATE_VIEW} from '../../../UpdateView/UpdateView';
import {IconButton} from '../../../components/Button/IconButton';
import {read} from 'xlsx';
import {getData} from '../../../ImportView/ImportView';
import {useTrans} from '../../../components/Trans';
import {CellContent} from '../../../ListingView/views/Table/BodyCell';
import {HydraItem} from '../../../types/hydra.types';
import {Modal} from 'react-bootstrap';
import clsx from 'clsx';
import {StringFormat} from '../../String/StringColumn';

const NestedColumnsButton = <M extends ModelEnum>({name, modelName, item, index}: FieldProps & {
  modelName: M,
  item: HydraItem,
  index: number
}) => {
  const [, {error},] = useField<Array<HydraItem<M>>>({name});
  const [open, setOpen] = useState<boolean>();
  const {views, columnDef} = useMapping<M>({modelName});
  const {values: {id}} = useFormikContext<AbstractModel>();
  const view = useMemo<CreateViewType<M> | UpdateViewType<M>>(() => {
    if (id) {
      return (views?.find(view => view.type === ViewEnum.Update) || DEFAULT_UPDATE_VIEW) as UpdateViewType<M>;
    }

    return (views?.find(view => view.type === ViewEnum.Create) || DEFAULT_CREATE_VIEW) as CreateViewType<M>;
  }, [id, views]);
  const {fields = getDefaultFields(columnDef)} = view;
  const _columnNames = Object.keys(fields) as Array<keyof Model<M>>;
  const columnNames = _columnNames.filter(columnName => {
    const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
    if (!columnMapping) return false;
    switch (columnMapping.type) {
      case ColumnTypeEnum.String:
        return columnMapping.format === StringFormat.Text;
      default:
        return 'embeddedForm' in columnMapping;
    }
  });

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
        onHide={() => setOpen(o => !o)}
      >
        <Modal.Header closeButton/>
        <Modal.Body className='d-flex flex-column gap-5'>
          {columnNames.map(columnName => {
            const field = fields[columnName];
            const render = typeof field === 'object' && field?.render;

            const nestedName = `${name}.${index}.${columnName.toString()}`;
            const fieldProps = {
              name: nestedName,
              className: 'border-1'
            };

            const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
            if (!field || !columnMapping) {
              return <></>;
            }

            return (
              <div key={nestedName}>
                <label
                  className={clsx(
                    'd-flex fw-semibold text-truncate text-muted',
                    !('multiple' in columnMapping) && !columnMapping.nullable && 'required'
                  )}
                >
                  <TitleContent columnName={columnName} {...columnMapping} />
                </label>
                {render ?
                  render({item, fieldProps}) :
                  <ValueField
                    {...fieldProps}
                    column={columnDef[columnName]}
                    size='sm'
                    hideAdornment
                  />
                }
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export const NestedArrayField = <M extends ModelEnum>({name, feedbackLabel, modelName, disableInsert, disableDelete, extraAttribute}: FieldProps & {
  modelName: M,
  disableInsert?: boolean
  disableDelete?: boolean
  extraAttribute?: Record<any, any>
}) => {
  const {trans} = useTrans();
  const {values: {id}} = useFormikContext<AbstractModel>();
  const [{value: baseItems}, , {setValue}] = useField<Array<HydraItem<M>>>({name});
  const {views, columnDef} = useMapping<M>({modelName});
  const view = useMemo<CreateViewType<M> | UpdateViewType<M>>(() => {
    if (id) {
      return (views?.find(view => view.type === ViewEnum.Update) || DEFAULT_UPDATE_VIEW) as UpdateViewType<M>;
    }

    return (views?.find(view => view.type === ViewEnum.Create) || DEFAULT_CREATE_VIEW) as CreateViewType<M>;
  }, [id, views]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {fields = getDefaultFields(columnDef)} = view;
  const columnNames = Object.keys(fields) as Array<keyof Model<M>>;
  const nestedColumnNames = columnNames.filter(columnName => {
    const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
    if (!columnMapping) return false;
    switch (columnMapping.type) {
      case ColumnTypeEnum.String:
        return columnMapping.format === StringFormat.Text;
      default:
        return 'embeddedForm' in columnMapping;
    }
  });
  const rootColumnNames = columnNames.filter(columnName => !nestedColumnNames.some(nestedColumnName => columnName === nestedColumnName));
  const items = useMemo(()=>[...baseItems].map((item, _index)=>({...item, _index })).reverse(), [baseItems])

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <FieldArray name={name}>
        {({remove, push}) => (
          <div className='table-responsive border border-2 rounded py-1 px-2 min-h-250px'>
            <table className='table table-hover table-row-bordered table-row-dark g-1 mb-0 align-middle'>
              <thead className='fs-7 text-gray-400 text-uppercase'>
              <tr className='align-middle'>
                <th>
                  {!disableInsert && (
                    <div className='d-flex'>
                      <input
                        type='file'
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        style={{display: 'none'}} // Hide the file input
                        ref={fileInputRef}
                        onChange={event => {
                          const file = event.target.files?.[0];

                          if (file) {
                            file.arrayBuffer().then(file => {
                              const workbook = read(file/*, { dateNF: 'yyyy-mm-dd' }*/);
                              const data = getData<M>({
                                workbook,
                                mapping: rootColumnNames.reduce(
                                  (previousValue, columnName) => ({
                                    ...previousValue,
                                    [columnName]: trans({id: stringToI18nMessageKey(columnName.toString())})
                                  }),
                                  {} as Record<keyof Model<M>, string>
                                )
                              });
                              // @ts-ignore
                              setValue([...data, ...items]);
                            });
                          }
                        }}
                      />
                      <IconButton
                        path='/general/gen035.svg'
                        variant='primary'
                        size='2x'
                        onClick={() => {
                          push({...getInitialValues({columnDef, fields}), ...extraAttribute});
                        }}
                      />
                      <IconButton
                        path='/files/fil010.svg'
                        variant='primary'
                        size='2x'
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      />
                    </div>
                  )}
                </th>
                {rootColumnNames.map(columnName => (
                  <th key={columnName.toString()}>
                    <TitleContent
                      columnName={columnName}
                      {...columnDef[columnName]}
                    />
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {items.map((item, itemIndex) => {
                return (
                  <tr key={item._index}>
                    <td className='align-middle'>
                      <div className='d-flex align-items-center'>
                        <div className='badge badge-secondary badge-square rounded'>
                          #{itemIndex + 1}
                        </div>
                        {!disableDelete && (
                          <IconButton
                            path='/general/gen034.svg'
                            variant='danger'
                            size='2x'
                            onClick={() => remove(item._index)}
                          />
                        )}
                        {nestedColumnNames.length > 0 && (
                          <NestedColumnsButton
                            name={name}
                            modelName={modelName}
                            item={item}
                            index={item._index}
                          />
                        )}
                      </div>
                    </td>

                    {rootColumnNames.map(columnName => {
                      const field = fields[columnName];
                      const render = typeof field === 'object' && field?.render;

                      const nestedName = `${name}.${item._index}.${columnName.toString()}`;
                      const fieldProps = {
                        name: nestedName,
                        className: 'border-1'
                      };

                      return (
                        <td key={nestedName} className={clsx(!render && '-align-top')}>
                          {render ?
                            render({item, fieldProps}) :
                            <ValueField
                              {...fieldProps}
                              column={columnDef[columnName]}
                              size='sm'
                              hideAdornment
                            />
                          }
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              </tbody>
              <tfoot>
              {items.length > 0 && (
                <tr className='fs-7 text-gray-400 text-uppercase'>
                  <td/>
                  {rootColumnNames.map(columnName => {
                    const columnMapping = columnDef[columnName];
                    if (!columnMapping) return <td key={columnName.toString()}/>;
                    let value: any = '';
                    switch (columnMapping.type) {
                      case ColumnTypeEnum.Number:
                        value = items.reduce(
                          (count, currentValue) => {
                            const _value = currentValue[columnName];
                            if (typeof _value !== 'number') {
                              return count;
                            }

                            return count + _value;
                          }, 0);
                        break;
                    }

                    return (
                      <td key={columnName.toString()} className='text-truncate text-uppercase'>
                        {columnMapping.footer?.({value, collection: items}) || (
                          <CellContent
                            value={value}
                            {...columnMapping}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              )}
              </tfoot>
            </table>
          </div>
        )}
      </FieldArray>
    </Field>
  )
};