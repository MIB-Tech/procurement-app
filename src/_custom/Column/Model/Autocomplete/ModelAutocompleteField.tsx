import { UndefinedBool } from '../../controls/base/Autocomplete';
import React, { useEffect } from 'react';
import {
  CompoundFilter,
  CompoundFilterOperator,
  PropertyFilterOperator
} from '../../../ListingView/Filter/Filter.types';
import { AutocompleteField, AutocompleteFieldProps } from '../../controls/fields/AutocompleteField';
import { Model } from '../../../types/ModelMapping';
import { useField } from 'formik';
import { useMapping } from '../../../hooks/UseMapping';
import { getRoutePrefix } from '../../../utils';
import { HydraItem } from '../../../types/hydra.types';
import { Trans, useTrans } from '../../../components/Trans';
import { fr } from '../../../i18n/messages/fr';
import { I18nMessageKey } from '../../../i18n/I18nMessages';
import { ModelCell } from '../../../ListingView/TableView/ModelCell';
import clsx from 'clsx';
import { Popper } from '../../controls/base/Autocomplete/Tag';
import { Pagination } from '../../../ListingView/Pagination';
import { useCollectionQuery } from '../../../hooks/UseCollectionQuery';
import { PaginationInput } from '../../../ListingView/Pagination/Pagination.types';
import { ModelEnum } from '../../../../app/modules/types';


type ModelAutocomplete<M extends ModelEnum, Multiple extends UndefinedBool> =
  {
    modelName: M
    name: string
    getParams?: (filter: CompoundFilter<M>) => CompoundFilter<M>
  }
  & Pick<AutocompleteFieldProps<Model<M>, Multiple, false, false>, 'size' | 'className' | 'bg' | 'placeholder' | 'multiple' | 'autoSelect'>
export const ModelAutocompleteField = <
  M extends ModelEnum,
  Multiple extends UndefinedBool
>({ modelName, autoSelect, getParams = filter => filter, ...props }: ModelAutocomplete<M, Multiple>) => {
  const { trans } = useTrans();
  const [{ value }, , { setValue }] = useField<HydraItem>({ name: props.name });
  const [inputValue, setInputValue] = React.useState<string>('');
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<Required<PaginationInput>>({
    page: 1,
    itemsPerPage: 5
  });
  const { searchableColumnNames } = useMapping<M>({ modelName });

  const { collection, isLoading, totalCount } = useCollectionQuery<M>({
    modelName,
    path: getRoutePrefix(modelName) + '/autocomplete',
    options: { enabled },
    params: {
      filter: getParams({
        operator: CompoundFilterOperator.Or,
        filters: searchableColumnNames.map(columnName => ({
          property: columnName,
          operator: PropertyFilterOperator.Contain,
          value: inputValue
        }))
      }),
      ...pagination
    }
  });

  useEffect(() => {
    if (value) {
      if (!props.multiple) {
        setInputValue(value['@title']);
      }
      setEnabled(false);
    }
  }, [value]);

  useEffect(() => {
    if (autoSelect) {
      const item = collection.find(item => item['@title'].toLowerCase() === inputValue.toLowerCase());
      if (item) {
        setValue(item);
      }
    }
  }, [autoSelect, collection]);
  
  const getOptionLabel = (option: string | HydraItem<M>) => {
    if (typeof option === 'string') {
      return option;
    }
    let label = option['@title'];

    const subTitle = option['@subTitle'];
    if (subTitle) {
      label += ` (${Object.keys(fr).includes(subTitle) ? trans({ id: subTitle as I18nMessageKey }) : subTitle})`;
    }

    return label;
  }

  return (
    <AutocompleteField
      {...props}
      placeholder={trans({ id: 'SEARCH' })}
      filterOptions={x => x}
      isOptionEqualToValue={(option, value1) => option['@id'] === value1['@id']}
      getOptionLabel={getOptionLabel}
      options={collection}
      inputValue={inputValue}
      onInputChange={(e, value, reason) => {
        if (reason === 'input') {
          setInputValue(value);
          setPagination({ ...pagination, page: 1 });
          setEnabled(true);
        }
      }}
      onFocus={() => {
        setEnabled(true);
      }}
      loading={isLoading}
      renderPopper={({ options, getOptionProps, ...listboxProps }) => (
        <Popper {...listboxProps} >
          {!isLoading && options.length === 0 && (
            <li className='d-flex py-2 px-3'>
              <Trans id='NO_ITEM_FOUND' />
            </li>
          )}
          {isLoading && (
            <li className='d-flex py-2 px-3'>
              <Trans id='LOADING' />
            </li>
          )}
          {(options.map((option, index) => (
            <li
              key={option.id}
              {...getOptionProps({ option, index })}
              className={clsx(
                props.className,
                'px-2 py-1 bg-hover-light',
                getOptionProps({ option, index })['aria-selected'] && 'bg-light'
              )}
            >
              <ModelCell item={option} readOnly />
            </li>
            // <Option
            //   label={getOptionLabel(option)}
            //   {...getOptionProps({ option, index })}
            // />
          )))}
          {(!isLoading && options.length > 0) && (
            <div className='border-top'>
              <Pagination
                boundaryCount={0}
                siblingCount={0}
                size='sm'
                page={pagination.page}
                itemsPerPage={pagination.itemsPerPage}
                totalCount={totalCount}
                className='m-1 mx-2'
                onPageChange={page => {
                  setPagination({ ...pagination, page });
                }}
              />
            </div>
          )}
        </Popper>
      )}
      // renderOption={(props, option, { selected }) => (
      //   <li
      //     {...props}
      //     className={clsx(
      //       props.className,
      //       'px-2 py-1 bg-hover-light',
      //       selected && 'bg-light'
      //     )}
      //   >
      //     <ModelCell item={option} readOnly />
      //   </li>
      // )}
    />
  );
};
