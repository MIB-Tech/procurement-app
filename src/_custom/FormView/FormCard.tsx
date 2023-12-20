import { ColumnMapping, FormViewType, Model, MutationMode } from '../types/ModelMapping';
import { useMapping } from '../hooks/UseMapping';
import { useAuth } from '../hooks/UseAuth';
import clsx from 'clsx';
import { TitleContent } from '../ListingView/views/Table/HeaderCell';
import { ValueField } from '../Column/ValueField';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomQuery } from '../hooks/UseCustomQuery';
import { getDefaultFields } from '../utils';
import { ModelEnum } from '../../app/modules/types';
import { Grid } from '@mui/material';
import { isLocationColumn } from '../ListingView/ListingView.utils';


export const FormCard = <M extends ModelEnum>({ modelName, item, setItem, name, view, className }: {
  name?: string
  modelName: M
  item: Model<M>
  setItem: (item: Model<M>) => void
  view: Omit<FormViewType<M>, 'type'>,
  className?: string
}) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { isGranted, location } = useAuth();
  const {inlineForm, fields = getDefaultFields(columnDef)} = view
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

    return !grantedRoles || isGranted(grantedRoles);
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


  // return (
  //   <div className='flex-grow-1'>
  //     <Grid container spacing={2}>
  //       <Grid item xs={6}>
  //         <span>xs=8</span>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <span>xs=4</span>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <span>xs=4</span>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <span>xs=8</span>
  //       </Grid>
  //     </Grid>
  //   </div>
  // )
  return (
    <div className={clsx('card', className)}>
      <div className='card-body'>
        <Grid container spacing={1} {...view.slotProps?.root}>
          {columnNames.map((columnName, index, columnNames) => {
            const field = fields[columnName];
            const columnMapping = columnDef[columnName] as ColumnMapping<M> | undefined;
            const render = typeof field !== 'boolean' && field?.render;
            const gridProps = typeof field !== 'boolean' && field?.slotProps?.root;
            if (!field || !columnMapping) {
              return <></>;
            }

            return (
              <Grid key={index} item xs={12} {...view.slotProps?.item} {...gridProps}>
                <div className={clsx(inlineForm && 'row')}>
                  <label
                    className={clsx(
                      'd-flex fw-semibold text-truncate text-muted',
                      inlineForm && 'col-sm-3 mt-2',
                      !('multiple' in columnMapping) && !columnMapping.nullable && 'required'
                    )}
                  >
                    <TitleContent columnName={columnName} {...columnMapping} />
                  </label>
                  <div className={clsx(inlineForm && 'col-sm-9')}>
                    {render ?
                      render({ item }) :
                      <ValueField
                        name={`${name ? `${name}.` : ''}${columnName.toString()}`}
                        column={columnMapping}
                        size='sm'
                      />
                    }
                  </div>
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  );
};