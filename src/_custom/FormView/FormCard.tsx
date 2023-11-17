import { ColumnMapping, FormViewType, Model, MutationMode } from '../types/ModelMapping';
import { useMapping } from '../hooks/UseMapping';
import { useAuth } from '../hooks/UseAuth';
import clsx from 'clsx';
import { TitleContent } from '../ListingView/TableView/HeaderCell';
import { ValueField } from '../Column/ValueField';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomQuery } from '../hooks/UseCustomQuery';
import { getDefaultFields } from '../utils';
import { ModelEnum } from '../../app/modules/types';
import { isLocationColumn } from '../ListingView/ListingView';


export const FormCard = <M extends ModelEnum>({ modelName, item, setItem, name, view, inlineFormGroup, className }: {
  name?: string
  modelName: M
  item: Model<M>
  setItem: (item: Model<M>) => void
  view: Omit<FormViewType<M>, 'type' | 'routeKey'>,
  inlineFormGroup?: boolean
  className?: string
}) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { isGrantedOneOf, location } = useAuth();
  const fields = view.fields || getDefaultFields(columnDef);

  const columnNames = (Object.keys(fields) as Array<keyof Model<M> | string>).filter(columnName => {
    if (location && isLocationColumn({ modelName, columnName })) {
      return false;
    }

    const field = fields[columnName];
    if (typeof field === 'boolean') {
      return field;
    }

    const display = field?.display;
    if (display) {
      return display({ item })
    }

    const grantedRoles = field?.grantedRoles;

    return !grantedRoles || isGrantedOneOf(grantedRoles);
  });

  const { pathname } = useLocation();
  const url = pathname.split('/').slice(0, 3).join('/') + '/update';
  const query = useCustomQuery({
    modelName,
    url,
    enabled: view.mode === MutationMode.Put
  });

  useEffect(() => {
    if (query.item) {
      setItem(query.item);
    }
  }, [query.item]);


  return (
    <div className={clsx('card', className)}>
      <div className='card-body'>
        {columnNames.map((columnName, index, columnNames) => {
          const field = fields[columnName];
          const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
          const render = typeof field !== 'boolean' && field?.render;
          if (!field || !columnMapping) {
            return <></>;
          }

          return (
            <div
              key={index}
              className={clsx(
                inlineFormGroup && 'row',
                columnNames.length > index + 1 && 'mb-5'
              )}
            >
              <label
                className={clsx(
                  'd-flex fw-semibold text-muted mt-2',
                  inlineFormGroup && 'col-sm-3',
                  !('multiple' in columnMapping) && !columnMapping.nullable && 'required'
                )}
              >
                {/*<ColumnIcon {...columnMapping} size='2' className='me-2' />*/}
                <div className='text-truncate text-muted'>
                  <TitleContent columnName={columnName} {...columnMapping} />
                </div>
              </label>
              <div className={clsx(inlineFormGroup && 'col-sm-9')}>
                {render ?
                  render({ item }) :
                  <ValueField
                    name={`${name ? `${name}.` : ''}${columnName.toString()}`}
                    column={columnMapping}
                  />
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};