import {ModelEnum} from '../../../../app/modules/types';
import {FieldProps} from '../../controls/fields';
import {HydraItem} from '../../../types/hydra.types';
import {useField, useFormikContext} from 'formik';
import React, {useMemo, useState} from 'react';
import {useMapping} from '../../../hooks/UseMapping';
import {AbstractModel, ColumnTypeEnum} from '../../../types/types';
import {ColumnMapping, CreateViewType, Model, UpdateViewType, ViewEnum} from '../../../types/ModelMapping';
import {DEFAULT_UPDATE_VIEW} from '../../../UpdateView/UpdateView';
import {DEFAULT_CREATE_VIEW} from '../../../CreateView/CreateView';
import {getDefaultFields} from '../../../utils';
import {StringFormat} from '../../String/StringColumn';
import {IconButton} from '../../../components/Button/IconButton';
import {Modal} from 'react-bootstrap';
import clsx from 'clsx';
import {TitleContent} from '../../../ListingView/views/Table/HeaderCell';
import {ValueField} from '../../ValueField';

export const NestedColumnsButton = <M extends ModelEnum>({name, modelName, item, index}: FieldProps & {
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