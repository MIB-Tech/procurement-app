import React, {useMemo, useRef, useState} from 'react';
import {FieldProps} from '../../controls/fields';
import {CreateViewType, FormViewType, Model, UpdateViewType, ViewEnum} from '../../../types/ModelMapping';
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
import {Button} from '../../../components/Button';

const NestedColumnsButton = <M extends ModelEnum>({name, modelName, item, index}: FieldProps & { modelName: M, item: HydraItem, index: number }) => {
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
  const columnNames = _columnNames.filter(columnName => 'embeddedForm' in columnDef[columnName]);

  return (
    <>
      <IconButton
        path='/general/gen023.svg'
        variant='primary'
        size='2x'
        onClick={() => setOpen(true)}
      />
      <Modal
        size='xl'
        show={open}
        onHide={() => setOpen(o => !o)}
      >
        <Modal.Header closeButton/>
        <Modal.Body>
          {columnNames.map(columnName => {
            const field = fields[columnName];
            const render = typeof field === 'object' && field?.render;

            const nestedName = `${name}.${index}.${columnName.toString()}`;
            const fieldProps = {
              name: nestedName,
              className: 'border-1'
            };

            return (
              <td key={nestedName}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => {
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const NestedArrayField = <M extends ModelEnum>({name, modelName}: FieldProps & {
  modelName: M
}) => {
  const {trans} = useTrans();
  const {values: {id}} = useFormikContext<AbstractModel>();
  const [{value: items}, , {setValue}] = useField<Array<HydraItem<M>>>({name});
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
  const rootColumnNames = columnNames.filter(columnName => !('embeddedForm' in columnDef[columnName]));
  const nestedColumnNames = columnNames.filter(columnName => 'embeddedForm' in columnDef[columnName]);

  return (
    <FieldArray name={name}>
      {({remove, insert}) => (
        <div className='table-responsive border border-2 rounded py-1 px-2 min-h-250px'>
          <table className='table table-hover table-row-bordered table-row-dark g-1 mb-0 align-middle'>
            <thead className='fs-7 text-gray-400 text-uppercase'>
            <tr className='align-middle'>
              <th>
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
                      const view = (views?.find(({type}) => type === ViewEnum.Create) as FormViewType<M> | undefined) || DEFAULT_CREATE_VIEW;
                      const {fields = getDefaultFields(columnDef)} = view;

                      insert(0, getInitialValues({columnDef, fields}));
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
            {items.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td className='align-middle'>
                  <div className='d-flex align-items-center'>
                    <div className='badge badge-secondary badge-square rounded'>
                      #{itemIndex + 1}
                    </div>
                    <IconButton
                      path='/general/gen034.svg'
                      variant='danger'
                      size='2x'
                      onClick={() => remove(itemIndex)}
                    />
                    {nestedColumnNames.length > 0 && (
                      <NestedColumnsButton
                        name={name}
                        modelName={modelName}
                        item={item}
                        index={itemIndex}
                      />
                    )}
                  </div>
                </td>

                {rootColumnNames.map(columnName => {
                  const field = fields[columnName];
                  const render = typeof field === 'object' && field?.render;

                  const nestedName = `${name}.${itemIndex}.${columnName.toString()}`;
                  const fieldProps = {
                    name: nestedName,
                    className: 'border-1'
                  };

                  return (
                    <td key={nestedName}>
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
            ))}
            </tbody>
            <tfoot>
            <tr className='fs-7 text-gray-400 text-uppercase'>
              <td/>
              {rootColumnNames.map(columnName => {
                const columnMapping = columnDef[columnName];

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
            </tfoot>
          </table>
        </div>
      )}
    </FieldArray>
  )
};