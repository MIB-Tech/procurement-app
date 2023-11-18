import React, { useEffect, useMemo, useState } from 'react';
import { ModelEnum } from '../../app/modules/types';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';
import { ImportViewProps } from './ImportView.types';
import { GoBackButton } from '../components/Button/GoBackButton';
import { Trans } from '../components/Trans';
import { Button } from '../components/Button';
import { ToolbarWrapper } from '../ListingView/ToolbarWrapper';
import { FormikProvider, useFormik } from 'formik';
import { FormGroup } from '../components/FormGroup';
import { useMapping } from '../hooks/UseMapping';
import { Input } from '../Column/String/InputBase/Input';
import { Model } from '../types/ModelMapping';
import { TitleContent } from '../ListingView/TableView/HeaderCell';
import { SelectField } from '../Column/controls/fields/SelectField/SelectField';
import clsx from 'clsx';
import { Pagination } from '../ListingView/Pagination';
import { Bullet } from '../components/Bullet';


export const getWorkSheet = (workbook: WorkBook) => workbook.Sheets[workbook.SheetNames[0]];
export const getData = <M extends ModelEnum>({ workbook, mapping }: Required<Value<M>>) => {
  const workSheet = getWorkSheet(workbook);
  const sheetData = utils.sheet_to_json<Record<string, any>>(workSheet, { raw: false });

  return sheetData.map(row => {
    let transformedRow: Partial<Record<keyof Model<M>, any>> = {};

    for (const currentValue in row) {
      const columnName = (Object.keys(mapping) as Array<keyof Model<M>>).find(key => mapping[key] === currentValue);

      if (columnName) {
        transformedRow[columnName] = row[currentValue];
      }
    }

    return transformedRow;
  });
};

type Value<M extends ModelEnum> = {
  workbook?: WorkBook,
  mapping: Record<keyof Model<M>, any>
}
export const ImportView = <M extends ModelEnum>({ modelName, view }: ImportViewProps<M>) => {
  const { columnDef } = useMapping<M>({ modelName });
  const fields = view.columns;

  const columnNames = fields ? (Object.keys(fields) as Array<keyof Model<M>>).filter(columnName => {
    const field = fields[columnName];

    return typeof field === 'boolean' && field;
  }) : [];


  const formik = useFormik<Value<M>>({
    initialValues: {
      workbook: undefined,
      mapping: columnNames.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          [currentValue]: null
        }),
        {} as Record<keyof Model<M>, string | null>
      )
    },
    onSubmit: ({ workbook, mapping }) => {
      if (workbook) {
        const data = getData({ workbook, mapping });
        console.log(data);
      }
    }
  });

  const { values, setFieldValue, handleSubmit, initialValues } = formik;
  const { workbook, mapping } = values;

  const workSheet = useMemo<WorkSheet | undefined>(() => {
    return workbook ? getWorkSheet(workbook) : undefined;
  }, [workbook]);

  const columns = useMemo<Array<string>>(() => {
    if (!workSheet) return [];

    return utils.sheet_to_json<{}>(workSheet, { header: 1 })[0] as string[];
  }, [workbook]);

  useEffect(() => {
    setFieldValue('mapping', initialValues.mapping);
  }, [workbook]);

  const data = workbook ? getData({ workbook, mapping }) : [];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const partialData = data.slice(startIndex, endIndex);


  return (
    <FormikProvider value={formik}>
      <ToolbarWrapper>
        <div className='text-end'>
          <GoBackButton size='sm' className='me-2'>
            <Trans id='CANCEL' />
          </GoBackButton>
          <Button
            variant='primary'
            size='sm'
            onClick={() => {
              handleSubmit();
            }}
            // loading={mutation.isLoading || query.isLoading}
            // loadingLabel={query.isLoading ? 'LOADING' : undefined}
            // disabled={submittable && !submittable({ item: formik.values })}
          >
            <Trans id='IMPORT' />
          </Button>
        </div>
      </ToolbarWrapper>
      <div className='card'>
        <div className='card-body gap-y-5'>
          <Input
            type='file'
            onChange={event => {
              const file = event.target.files?.[0]
              if(file) {
                file.arrayBuffer().then(file => {
                  setFieldValue('workbook', read(file, { dateNF: 'yyyy-mm-dd' }));
                });
              } else {
                // setFieldValue('workbook', undefined);
              }

            }}
          />
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-dark gy-2 align-middle mb-0'>
              <thead className='fs-7 text-gray-400 text-uppercase'>
              <tr>
                {columnNames.map(columnName => {
                  const columnMapping = columnDef[columnName];

                  return (
                    <th key={columnName.toString()}>
                      <div className={clsx(!columnMapping.nullable && 'required')}>
                        <TitleContent columnName={columnName} {...columnMapping} />
                      </div>
                      <SelectField
                        placeholder='Column'
                        size='sm'
                        name={`mapping.${columnName.toString()}`}
                        options={columns}
                        getOptionDisabled={option => Object.values(mapping).includes(option)}
                        className='w-100px text-truncate p-2 text-xs'
                      />
                    </th>
                  );
                })}
              </tr>
              </thead>
              <tbody>
              {partialData.map((item, index) => (
                <tr key={`${startIndex}.${endIndex}.${index}`}>
                  {columnNames.map(columnName => {
                    const columnMapping = columnDef[columnName];
                    const value = partialData[index][columnName]

                    return (
                      <td
                        key={`${startIndex}.${endIndex}.${index}.${columnName.toString()}`}
                        className={clsx(!value && !columnMapping.nullable && 'bg-light-danger')}
                      >
                        {value || <Bullet />}
                      </td>
                    )
                  })}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            onPageChange={setPage}
            itemsPerPage={itemsPerPage}
            totalCount={data.length}
          />
        </div>
      </div>
    </FormikProvider>
  );
};