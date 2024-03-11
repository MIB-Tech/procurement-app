import React, {useMemo, useRef, useState} from 'react'
import {Field, FieldProps} from '../../controls/fields';
import {ColumnMapping, CreateViewType, Model, UpdateViewType, ViewEnum} from '../../../types/ModelMapping';
import {FieldArray, useField, useFormikContext} from 'formik';
import {getSearchableColumns, useMapping} from '../../../hooks/UseMapping'
import {getDefaultFields, getInitialValues, getRoutePrefix, stringToI18nMessageKey} from '../../../utils';
import {ValueField} from '../../ValueField';
import {AbstractModel, ColumnTypeEnum} from '../../../types/types';
import {ModelEnum} from '../../../../app/modules/types';
import {TitleContent} from '../../../ListingView/views/Table/HeaderCell';
import {DEFAULT_CREATE_VIEW} from '../../../CreateView/CreateView';
import {DEFAULT_UPDATE_VIEW} from '../../../UpdateView/UpdateView';
import {IconButton} from '../../../components/Button/IconButton';
import {read, utils, writeFile} from 'xlsx';
import {getData} from '../../../ImportView/ImportView';
import {useTrans} from '../../../components/Trans';
import {CellContent} from '../../../ListingView/views/Table/BodyCell';
import {HydraItem, JsonldCollectionResponse} from '../../../types/hydra.types';
import clsx from 'clsx';
import {StringFormat} from '../../String/StringColumn';
import {NestedColumnsButton} from './NestedColumnsButton';
import {plural} from 'pluralize';
import axios from 'axios';
import {CompoundFilter, CompoundFilterOperator, PropertyFilterOperator} from '../../../ListingView/Filter/Filter.types';
import {filterToParams} from '../../../ListingView/Filter/Filter.utils';

export const NestedArrayField = <M extends ModelEnum>(
  {
    name,
    feedbackLabel,
    modelName,
    disableInsert,
    disableDelete,
    extraAttribute,
    ...props
  }: FieldProps & {
    modelName: M,
    disableInsert?: boolean
    disableDelete?: boolean
    extraAttribute?: Record<any, any>,
    view?: CreateViewType<M> | UpdateViewType<M>
  }) => {
  const [importing, setImporting] = useState<boolean>();
  const {trans} = useTrans();
  const {values: {id}} = useFormikContext<AbstractModel>();
  const [{value: baseItems}, , {setValue}] = useField<Array<HydraItem<M>>>({name});
  const {views, columnDef} = useMapping<M>({modelName});
  const view = useMemo<CreateViewType<M> | UpdateViewType<M>>(() => {
    if (props.view) return props.view
    if (id) {
      return (views?.find(view => view.type === ViewEnum.Update) || DEFAULT_UPDATE_VIEW) as UpdateViewType<M>;
    }

    return (views?.find(view => view.type === ViewEnum.Create) || DEFAULT_CREATE_VIEW) as CreateViewType<M>;
  }, [id, views]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {fields = getDefaultFields(columnDef)} = view;
  const columnNames = Object.keys(fields) as Array<keyof Model<M> | string>;
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
  const rootColumnNames = columnNames.filter(columnName => {

    return !nestedColumnNames.some(nestedColumnName => columnName === nestedColumnName)
  });
  const items = useMemo(() => [...baseItems].map((item, _index) => ({...item, _index})).reverse(), [baseItems]);
  const mapping = rootColumnNames.filter(columnName => {
    const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;

    return !columnMapping?.readOnly;
  }).reduce(
    (previousValue, columnName) => ({
      ...previousValue,
      [columnName]: trans({id: stringToI18nMessageKey(columnName.toString())})
    }),
    {} as Record<keyof Model<M>, string>
  );

  // const [_queries, set_Queries] = useState<Partial<Record<ModelEnum, string[]>>>({
  //   [ModelEnum.Product]: ['PR-000121'],
  // })
  // const queries = useQueries(
  //   (Object.keys(_queries) as ModelEnum[])
  //     .filter(modelName => !!_queries[modelName]?.length)
  //     .map(modelName => {
  //       const path = `/base` + getRoutePrefix(modelName);
  //       const values = _queries[modelName] as string[];
  //       // TODO BUILD SEARCH QUERY
  //       const searchableColumnNames:string[] = ['code']
  //       const filter:CompoundFilter<any> = {
  //         operator: CompoundFilterOperator.Or,
  //         filters: searchableColumnNames.map(columnName => ({
  //           property: columnName,
  //           operator: PropertyFilterOperator.In,
  //           value: values
  //         }))
  //       }
  //       const params = filterToParams(filter, 'filter', modelName)
  //
  //       return {
  //         queryKey: [modelName],
  //         queryFn: () => axios.get<JsonldCollectionResponse<M>>(path, {params}),
  //       };
  //     })
  // );
  // const products = queries[0].data?.data['hydra:member'] || [];
  // console.log(products);

  const initialValues = {
    ...getInitialValues({columnDef, fields}),
    ...extraAttribute
  };

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <FieldArray name={name}>
        {({remove, push}) => (
          <div className='table-responsive border border-2 rounded py-1 px-2 min-h-250px'>
            <table className='table table-hover table-row-bordered table-row-dark g-1 mb-0 align-middle'>
              <thead className='fs-7 text-gray-400 text-uppercase'>
              <tr className='align-middle'>
                <th style={{width: '1%'}}>
                  {!disableInsert && (
                    <div className='d-flex'>
                      <input
                        type='file'
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        style={{display: 'none'}} // Hide the file input
                        ref={fileInputRef}
                        onChange={async e => {
                          setImporting(true)
                          const file = await e.target.files?.[0]?.arrayBuffer();
                          const workbook = read(file/*, { dateNF: 'yyyy-mm-dd' }*/);
                          let data: Array<Partial<Model<M>>> = [];
                          const rows = getData<M>({workbook, mapping})
                          for (const row of rows) {
                            let _item: Partial<Model<M>> = initialValues;
                            for (const columnName of Object.keys(mapping) as Array<keyof Model<M>>) {
                              const columnMapping = columnDef[columnName] as ColumnMapping<M>;
                              const value = row[columnName];
                              // console.log(value, columnName)
                              switch (columnMapping.type) {
                                case undefined:
                                case ColumnTypeEnum.String:
                                  _item[columnName] = value;
                                  break;
                                case ColumnTypeEnum.Number:
                                  // @ts-ignore
                                  _item[columnName] = parseFloat(value);
                                  break;
                                case ColumnTypeEnum.Array:
                                case ColumnTypeEnum.Boolean:
                                  // TODO
                                  break;
                                default:
                                  const path = `/base` + getRoutePrefix(columnMapping.type);
                                  const searchableColumnNames: string[] = getSearchableColumns({modelName: columnMapping.type});
                                  const filter: CompoundFilter<any> = {
                                    operator: CompoundFilterOperator.Or,
                                    filters: searchableColumnNames.map(columnName => ({
                                      property: columnName,
                                      operator: PropertyFilterOperator.Equal,
                                      value: value
                                    }))
                                  };
                                  const params = filterToParams(filter, 'filter', columnMapping.type);
                                  const response = await axios.get<JsonldCollectionResponse<M>>(path, {params});
                                  // @ts-ignore
                                  _item[columnName] = response.data['hydra:member'].at(0);
                              }
                            }
                            // FIXME: Removing spread operator causes duplicated lines
                            data.push({..._item});
                          }
                          // console.log(data);
                          // @ts-ignore
                          await setValue([...data, ...items]);
                          setImporting(false)
                        }}
                      />
                      <IconButton
                        path='/general/gen035.svg'
                        variant='primary'
                        size='2x'
                        onClick={() => push(initialValues)}
                      />
                      <IconButton
                        path='/files/fil010.svg'
                        variant='primary'
                        size='2x'
                        onClick={() => fileInputRef.current?.click()}
                        loading={importing}
                        loadingLabel={false}
                      />
                      <IconButton
                        path='/files/fil009.svg'
                        variant='primary'
                        size='2x'
                        onClick={() => {
                          const data: string[][] = [Object.values(mapping)];
                          const workSheet = utils.aoa_to_sheet(data);
                          const workBook = utils.book_new();
                          utils.book_append_sheet(workBook, workSheet, 'Sheet1');

                          const fileName = `${trans({id: stringToI18nMessageKey(plural(modelName))})}.xlsx`;
                          writeFile(workBook, fileName);
                        }}
                      />
                    </div>
                  )}
                </th>
                {rootColumnNames.map(columnName => {
                  const column = columnDef[columnName] as ColumnMapping<M> | undefined;

                  return (
                    <th
                      key={columnName.toString()}
                      className={clsx('text-truncate', column?.type === ColumnTypeEnum.Number && 'w-75px')}
                      style={{width: (column?.type === ColumnTypeEnum.String && column.format !== StringFormat.Select) ? undefined : '1%'}}
                    >
                      <TitleContent
                        columnName={columnName.toString()}
                        {...column}
                      />
                    </th>
                  );
                })}
              </tr>
              </thead>
              <tbody>
              {items.map((item, itemIndex) => {
                return (
                  <tr key={item._index}>
                    <td className='align-middle'>
                      <div className='d-flex align-items-center'>
                        <div className='badge badge-secondary badge-square rounded'>
                          {itemIndex + 1}
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
                      const column = columnDef[columnName] as ColumnMapping<M> | undefined;

                      const nestedName = `${name}.${item._index}.${columnName.toString()}`;
                      const fieldProps = {
                        name: nestedName,
                        className: clsx(
                          'border-1'
                        )
                      };

                      return (
                        <td key={nestedName} className={clsx(!render && '-align-top')}>
                          {render ?
                            render({item, fieldProps}) :
                            column && (
                              <ValueField
                                {...fieldProps}
                                column={column}
                                size='sm'
                              />
                            )
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
                    const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
                    if (!columnMapping) return <td key={columnName.toString()}/>;
                    let value: any = '';
                    switch (columnMapping.type) {
                      case ColumnTypeEnum.Number:
                        value = items.reduce(
                          (count, currentValue) => {
                            const _value = currentValue[columnName as keyof Model<M>];
                            if (typeof _value !== 'number') return count

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