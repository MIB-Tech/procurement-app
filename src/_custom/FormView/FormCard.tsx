import {ColumnMapping, CreateViewType, Model, UpdateViewType, ViewEnum} from '../types/ModelMapping';
import {useMapping} from '../hooks/UseMapping';
import {useAuth} from '../hooks/UseAuth';
import clsx from 'clsx';
import {TitleContent} from '../ListingView/views/Table/HeaderCell';
import {ValueField} from '../Column/ValueField';
import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useCustomQuery} from '../hooks/UseCustomQuery';
import {getDefaultFields} from '../utils';
import {ModelEnum} from '../../app/modules/types';
import {Grid} from '@mui/material';
import {isClinicColumn} from '../ListingView/ListingView.utils';


export const FormCard = <M extends ModelEnum>({ modelName, item, setItem, name, view, className }: {
  name?: string
  modelName: M
  item: Model<M>
  setItem: (item: Model<M>) => void
  view: CreateViewType<M> | UpdateViewType<M>,
  className?: string
}) => {
  const { columnDef } = useMapping<M>({ modelName });
  const { isGranted, clinic } = useAuth();
  const {inlineForm, fields = getDefaultFields(columnDef)} = view
  const columnNames = (Object.keys(fields) as Array<keyof Model<M> | string>).filter(columnName => {
    if (clinic && isClinicColumn({ modelName, columnName })) {
      return false;
    }

    const field = fields[columnName];
    if (typeof field === 'boolean') {
      return field;
    }

    const display = field?.display;
    const grantedRoles = field?.grantedRoles;

    return (!display || display({ item })) && (!grantedRoles || isGranted(grantedRoles));
  });

  const { pathname } = useLocation();
  // const url = '/update' + pathname.split('/').slice(0, 3).join('/');
  const query = useCustomQuery({
    modelName,
    // url,
    enabled: view.type === ViewEnum.Update
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
            if (!field || !columnMapping) {
              return <></>;
            }

            const render = typeof field === 'object' && field?.render;
            const gridProps = typeof field === 'object' && field?.slotProps?.root;
            const helperText = typeof field === 'object' ? field?.helperText : undefined;
            const fieldProps = {
              name: `${name ? `${name}.` : ''}${columnName.toString()}`
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
                      render({ item, fieldProps }) :
                      <ValueField
                        {...fieldProps}
                        column={columnMapping}
                        size='sm'
                        feedbackLabel={helperText}
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