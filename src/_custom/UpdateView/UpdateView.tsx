import React from 'react';
import {useMapping} from '../hooks/UseMapping';
import {UpdateViewType, ViewEnum} from '../types/ModelMapping';
import {UpdateViewProps} from './UpdateView.types';
import {ModelEnum} from '../../app/modules/types';
import {FormView} from '../FormView/FormView';
import {useUri} from '../hooks/UseUri';


export const DEFAULT_UPDATE_VIEW: UpdateViewType<any> = {
  type: ViewEnum.Update
};

export const UpdateView = <M extends ModelEnum>({modelName}: UpdateViewProps<M>) => {
  const {views} = useMapping<M>({modelName});
  const view = (views?.find(view => view.type === ViewEnum.Update) || DEFAULT_UPDATE_VIEW) as UpdateViewType<M>;
  // const uri = useUri({modelName});
  // const { item, isLoading } = useItemQuery<M>({
  //   modelName,
  //   path: '/update' + uri
  //   // enabled: isOverview || (typeof column !== 'boolean' && column?.as === 'TAB')
  // });

  return (
    <FormView
      view={view}
      modelName={modelName}
      // initialValues={item}
    />
  );
};