import { HydraItem } from '../../types/hydra.types';
import { useMapping } from '../../hooks/UseMapping';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import React from 'react';
import { ModelEnum } from '../../../app/modules/types';


type ModelLinkProps<M extends ModelEnum> = {
  item: HydraItem<M>
  className?: string
}
export const ModelLink = <M extends ModelEnum>({ item, className }: ModelLinkProps<M>) => {
  const { '@title': title, '@id': uri, '@type': modelName } = item;
  const { detailable, hydraTitle } = useMapping({ modelName });

  if (detailable) {
    return (
      <Link
        to={uri}
        className={clsx('text-hover-primary', className)}
      >
        {hydraTitle?.(item) || title}
      </Link>
    );
  }

  return (
    <span className={className}>
      {title}
    </span>
  );
};