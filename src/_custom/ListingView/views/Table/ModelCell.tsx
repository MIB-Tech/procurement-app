import { SVG } from '../../../components/SVG/SVG';
import React, { FC } from 'react';
import { useMapping } from '../../../hooks/UseMapping';
import { HydraItem } from '../../../types/hydra.types';
import { ModelLink } from './ModelLink';
import { ModelEnum } from '../../../../app/modules/types';
import { Skeleton } from '@mui/material';


export type ModelCellProps<M extends ModelEnum> = {
  item: HydraItem<M>
  readOnly?: boolean
  svgClassName?:string
}

export const ModelCellSkeleton:FC<{iconSize?: number, titleHeight?: number, subTitleHeight?: number}> = ({
  iconSize = 30,
  titleHeight = 10,
  subTitleHeight = 20,
}) => (
  <div className='d-flex gap-3'>
    <Skeleton variant='rounded' className='rounded' width={iconSize} height={iconSize}/>
    <div className='flex-grow-1'>
      <Skeleton className='w-50' height={titleHeight} style={{minWidth: 150}}/>
      <Skeleton className='w-100' height={subTitleHeight} style={{minWidth: 150}}/>
    </div>
  </div>
)
export const ModelCell = <M extends ModelEnum>({
  item,
  readOnly,
  svgClassName }: ModelCellProps<M>) => {
  const { '@type': modelName, '@subTitle': subTitle, '@icon': icon } = item;
  const { hydraTitle, hydraSubtitle } = useMapping<M>({ modelName });

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
          <div>
            {hydraSubtitle(item)}
          </div>:
          <div className='text-muted fs-9 text-truncate'>
            {subTitle}
          </div>
        }

        {readOnly ?
          <span className='text-gray-800 text-truncate'>
            {hydraTitle?.(item) || item['@title']}
          </span>:
          <ModelLink item={item} className='text-gray-800 text-truncate' />
        }
      </div>
    </div>
  );
};