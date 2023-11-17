import { SVG } from '../../components/SVG/SVG';
import React from 'react';
import { useMapping } from '../../hooks/UseMapping';
import { Trans } from '../../components/Trans';
import { stringToI18nMessageKey } from '../../utils';
import { HydraItem } from '../../types/hydra.types';
import { ModelLink } from './ModelLink';
import { fr } from '../../i18n/messages/fr';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { ModelEnum } from '../../../app/modules/types';


export type ModelCellProps<M extends ModelEnum> = {
  item: HydraItem<M>
  readOnly?: boolean
  svgClassName?:string
}
export const ModelCell = <M extends ModelEnum>({
  item,
  readOnly,
  svgClassName }: ModelCellProps<M>) => {
  const { '@type': modelName, '@subTitle': subTitle } = item;
  const { icon, hydraTitle, hydraSubtitle } = useMapping<M>({ modelName });

  return (
    <div className='d-flex align-items-center'>
      {icon && (
        <div className='symbol symbol-30px me-3'>
        <span className='symbol-label bg-light-primary'>
          <SVG path={icon} size='2' variant='primary' className={svgClassName} />
        </span>
        </div>
      )}
      <div>
        {hydraSubtitle ?
          hydraSubtitle(item):
          <div className='text-muted fs-9 text-truncate'>
            {subTitle}
          </div>
        }

        {readOnly ?
          <span className='text-gray-800 text-hover-primary text-truncate'>
            {hydraTitle?.(item) || item['@title']}
          </span>:
          <ModelLink item={item} className='text-gray-800 text-hover-primary text-truncate' />
        }
      </div>
    </div>
  );
};