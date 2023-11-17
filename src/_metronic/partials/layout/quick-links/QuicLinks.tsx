/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import clsx from 'clsx';
import { getRoutePrefix } from '../../../../_custom/utils';
import { Button } from '../../../../_custom/components/Button';
import { ModelCell } from '../../../../_custom/ListingView/TableView/ModelCell';
import { SVG } from '../../../../_custom/components/SVG/SVG';
import { useCollectionQuery } from '../../../../_custom/hooks/UseCollectionQuery';
import { ModelEnum } from '../../../../app/modules/types';
import { useAuth } from '../../../../_custom/hooks/UseAuth';
import { useDispatch } from 'react-redux';
import * as auth from '../../../../app/pages/auth/redux/AuthRedux';


const QuickLinks: FC<{ show?: boolean }> = ({ show }) => {
  const dispatch = useDispatch();
  const { location: activeLocation, user } = useAuth();
  const modelName = ModelEnum.Location;
  const { collection, isLoading } = useCollectionQuery<ModelEnum.Location>({
    options: {
      enabled: !user.location
    },
    modelName,
    path: getRoutePrefix(modelName) + '/autocomplete'
  });

  return (
    <div
      className={clsx('menu menu-sub menu-sub-dropdown menu-column w-250px -w-lg-325px p-2', { show })}
      style={{
        zIndex: 107,
        position: 'fixed',
        inset: '0px 0px auto auto',
        margin: 0,
        transform: 'translate(-129px, 70px)'
      }}
      data-kt-menu='true'
    >
      {/*<div*/}
      {/*  className='d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10'*/}
      {/*  style={{ backgroundImage: `url('${toAbsoluteUrl('/media/misc/pattern-1.jpg')}')` }}*/}
      {/*>*/}
      {/*  <h2 className='text-white fw-bold mb-3'>*/}
      {/*    COC*/}
      {/*  </h2>*/}

      {/*  <span className='text-center py-2 px-3'>*/}
      {/*    CENTRE INTER D'ONCOLOGIE DE CASABLANCA*/}
      {/*  </span>*/}
      {/*</div>*/}

      <div className='row g-2'>
        {collection.map(location => {
          const active = location.id === activeLocation?.id;

          return (
            <div
              key={location['@id']}
              className='col-4'
            >
              <a
                href="#"
                className={clsx(
                  'btn bg-light btn-color-gray-600 btn-active-text-gray-800 border border-2 border-gray-100 border-active-primary btn-active-light-primary w-100 px-4',
                  active && 'active'
                )}
                onClick={e => {
                  e.preventDefault()
                  dispatch(auth.actions.setLocation(active ? undefined : location));
                }}
              >
                {location['@title']}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export {QuickLinks}
