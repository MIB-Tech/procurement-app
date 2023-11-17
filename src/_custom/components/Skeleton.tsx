import React, { FC, HTMLAttributes } from 'react';
import { Skeleton } from '@mui/material';
import clsx from 'clsx';

export const LoadingLabel = () => <>Loading...</>;
export const Loading: FC<{ loading?: boolean } & HTMLAttributes<HTMLDivElement>> = ({
  loading,
  className
}) => loading ? (
  <div className={clsx('card card-bordered', className)}>
    <div className='card-body text-center'>
      <span className='spinner-border spinner-border-sm align-middle me-2' />
      <LoadingLabel />
    </div>
  </div>
) : <></>;

type Props = {
  bodyProps?: HTMLAttributes<HTMLDivElement>
}

export const CardSkeleton: FC<Props> = ({ bodyProps }) => {

  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title align-items-start flex-column'>
            <span className='card-label'>
              <Skeleton width={200} height={30} />
            </span>
        </h3>
        <div className='card-toolbar'>
          <Skeleton width={20} height={30} />
        </div>
      </div>
      <div {...bodyProps} className={clsx('card-body', bodyProps?.className)}>
        <LoadingLabel />
      </div>
    </div>
  );
};