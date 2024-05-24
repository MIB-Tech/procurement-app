import React, { FC, useEffect, useState } from "react";
import { KTSVG } from "../../../helpers";
import { useAuth } from "../../../../_custom/hooks/UseAuth";
import { useDispatch } from "react-redux";
import { HydraItem } from "../../../../_custom/types/hydra.types";
import * as auth from "../../../../app/pages/auth/redux/AuthRedux";
import { Trans, useTrans } from "../../../../_custom/components/Trans";
import clsx from "clsx";
import { Button } from "../../../../_custom/components/Button";
import { ModelCell } from "../../../../_custom/ListingView/views/Table/ModelCell";
import { Input } from "../../../../_custom/Column/String/InputBase/Input";

const QuickLinks: FC<{ show?: boolean }> = ({ show }) => {
  const { clinic: activeClinic, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<HydraItem>>([
    ...user.clinics,
  ]);

  const { trans } = useTrans();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      setSearchResults(
        (user.clinics as Array<HydraItem>).filter((clinic) =>
          clinic["@title"].toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([...user.clinics]);
    }
  }, [searchQuery, user.clinics]);

  return (
    <div
      className={clsx(
        "menu menu-sub menu-sub-dropdown p-2 w-250px w-md-300px",
        { show }
      )}
      style={{
        zIndex: 107,
        position: "fixed",
        inset: "0px 0px auto auto",
        margin: 0,
        transform: "translate(-50px, 50px)",
      }}
      data-kt-menu='true'
    >
      <div className={``}>
        <div className=' d-flex  '>
          <form
            className='w-100 position-relative mb-2 mx-2'
            autoComplete='off'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-1 position-absolute top-50 translate-middle-y ms-0'
            />

            <Input
              className='form-control-flush ps-10'
              size='sm'
              placeholder={trans({ id: "SEARCH" })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <span
              className='position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1'
              data-kt-search-element='spinner'
            >
              <span className='spinner-border h-15px w-15px align-middle text-gray-400' />
            </span>
          </form>
          <Button
            icon
            variant='light-primary'
            size='sm'
            onClick={(e) => {
              e.preventDefault();
              dispatch(auth.actions.setClinic(undefined));
            }}
          >
            <KTSVG
              path='/media/icons/duotune/arrows/arr029.svg'
              className='svg-icon-3 '
            />
          </Button>
        </div>

        {searchResults.length === 0 && (
          <div className='text-center '>
            <div className='pt-10 pb-10'>
              <KTSVG
                path='/media/icons/duotune/files/fil024.svg'
                className='svg-icon-4x opacity-50'
              />
            </div>

            <div className='pb-15 fw-bold'>
              <h3 className='text-gray-600 fs-5 mb-2'>
                <Trans id='NOT_FOUND' />
              </h3>
            </div>
          </div>
        )}

        <div className='scroll-y mh-200px mh-lg-325px'>
          {(searchResults as Array<HydraItem>).map((clinic) => {
            const active = clinic.id === activeClinic?.id;

            return (
              <div
                key={clinic["@id"]}
                className={clsx(
                  "d-flex align-items-center mb-2 p-1 rounded-2 bg-hover-light",
                  active &&
                    "bg-light-primary border border-primary border-opacity-50"
                )}
                onClick={() => {
                  dispatch(auth.actions.setClinic(active ? undefined : clinic));
                }}
              >
                <ModelCell
                  item={clinic}
                  readOnly
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { QuickLinks };
