import React from 'react';
import { FieldProps } from '../../controls/fields';
import {
  ColumnDef,
  FormFields,
  FormViewType,
  Model,
  MutationMode,
  ViewEnum
} from '../../../types/ModelMapping';
import { FieldArray, useField } from 'formik';
import { useMapping } from '../../../hooks/UseMapping';
import { Trans } from '../../../components/Trans';
import { singular } from 'pluralize';
import { getInitialValues, stringToI18nMessageKey } from '../../../utils';
import { ConfirmButton } from '../../../components/Button/ConfirmButton';
import { ItemView } from '../../../components/ItemView';
import { Button } from '../../../components/Button';
import { SVG } from '../../../components/SVG/SVG';
import { ValueField } from '../../ValueField';
import { I18nMessageKey } from '../../../i18n/I18nMessages';
import { ColumnTypeEnum } from '../../../types/types';
import { ModelEnum } from '../../../../app/modules/types';


export const NestedArrayField = <M extends ModelEnum>({ name, modelName }: FieldProps & { modelName: M }) => {
  const [{ value: items }] = useField<Array<Model<M>>>({ name });
  const { views, columnDef } = useMapping<M>({ modelName });
  return (
    <FieldArray
      name={name}
      render={({ remove, push }) => (
        <div>
          {items.map((item, index) => {
            const view = views?.find(view => {

              return view.type === ViewEnum.Form /*&& (
                item.id ? view.mode === MutationMode.Put : view.mode === MutationMode.Post
              )*/
              // if (view.type !== ViewEnum.Form || view.routeKey) {
              //   return false;
              // }
              //
              // return item.id ? view.mode === MutationMode.Put : view.mode === MutationMode.Post;
            }) as FormViewType<M> | undefined;

            const fields = view?.fields ?
              view.fields :
              (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
                if (columnName === 'id') {
                  return false;
                }
                const def = columnDef[columnName];
                switch (def.type) {
                  case ColumnTypeEnum.String:
                  case ColumnTypeEnum.Number:
                  case ColumnTypeEnum.Boolean:
                    return true;
                  default:
                    return false;
                }
              }).reduce(
                (obj, columnName) => ({ ...obj, [columnName]: true }),
                {} as FormFields<M>
              );

            const def = Object.keys(fields).reduce(
              (prev, curr) => ({ ...prev, [curr]: columnDef[curr as keyof Model<M>] }),
              {} as ColumnDef<M>
            );


            return (
              <div key={index} className='card card-flush card-bordered border-2 mb-5'>
                <div className='card-header'>
                  <div className='card-title'>
                    <div className='text-truncate mw-300px'>
                      {'@title' in item ?
                        item['@title'] :
                        (<><Trans id={singular(stringToI18nMessageKey(modelName)) as I18nMessageKey} /> #{index + 1}</>)
                      }
                    </div>
                  </div>
                  <div className='card-toolbar'>
                    <ConfirmButton
                      size='sm'
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </div>
                </div>
                <div className='card-body'>
                  <ItemView
                    modelName={modelName}
                    columnDef={def}
                    renderContent={({ columnName }) => {
                      const field = fields[columnName];
                      const render = typeof field !== 'boolean' && field?.render;
                      if (render) {
                        return render({ item });
                      }

                      return (
                        <ValueField
                          name={`${name}.${index}.${columnName.toString()}`}
                          column={def[columnName]}
                          size='sm'
                        />
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div>
            <Button
              variant='light-primary'
              size='sm'
              className='w-100'
              onClick={() => {
                const view = views?.find((view) => {
                  return view.type === ViewEnum.Form && view.mode === MutationMode.Post;
                }) as FormViewType<M> | undefined;

                const fields = view?.fields ||
                  (Object.keys(columnDef) as Array<keyof Model<M>>).filter(columnName => {
                    if (columnName === 'id') {
                      return false;
                    }
                    const def = columnDef[columnName];
                    switch (def.type) {
                      case ColumnTypeEnum.String:
                      case ColumnTypeEnum.Number:
                      case ColumnTypeEnum.Boolean:
                        return true;
                      default:
                        return false;
                    }
                  }).reduce(
                    (obj, columnName) => ({ ...obj, [columnName]: true }),
                    {} as FormFields<M>
                  );

                push(getInitialValues({ columnDef, fields }));
              }}
            >
              <SVG path='/general/gen035.svg' />
              <Trans id='ADD' />
            </Button>
          </div>
        </div>
      )}
    />
  );
};