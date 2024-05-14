import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { SearchComponent } from "../../../assets/ts/components";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { useAuth } from "../../../../_custom/hooks/UseAuth";
import { useDispatch } from "react-redux";
import { HydraItem } from "../../../../_custom/types/hydra.types";
import * as auth from "../../../../app/pages/auth/redux/AuthRedux";
import { Trans } from "../../../../_custom/components/Trans";
import clsx from "clsx";
import { Button } from "../../../../_custom/components/Button";
import { ClickAwayListener } from "@mui/material";

const QuickLinks: FC<{ show?: boolean }> = ({ show }) => {
  const { clinic: activeClinic, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<HydraItem>>([
    ...user.clinics,
  ]);

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
        "menu menu-sub menu-sub-dropdown p-3 w-325px w-md-375px",
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
      <div
        // className={`${show ? "" : "d-none"}`}
        className={``}
        // ref={wrapperElement}
        // data-kt-search-element='wrapper'
      >
        <form
          // data-kt-search-element='form'
          className='w-100 position-relative mb-3'
          autoComplete='off'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0'
          />

          <input
            type='text'
            className='form-control form-control-flush ps-10'
            name='search'
            placeholder='Search...'
            // data-kt-search-element='input'
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

        <div
          // ref={suggestionsElement}
          className='mb-4'
          // data-kt-search-element='main'
        >
          <div className='scroll-y mh-200px mh-lg-325px'>
            {(searchResults as Array<HydraItem>).map((clinic) => {
              const active = clinic.id === activeClinic?.id;

              // console.log(active);

              return (
                <div
                  className={`d-flex align-items-center mb-3 p-2 rounded-2 bg-hover-lighten ${
                    active && " bg-primary bg-opacity-10"
                  }`}
                  key={clinic["@id"]}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      auth.actions.setClinic(active ? undefined : clinic)
                    );
                  }}
                >
                  <div className='symbol symbol-40px me-4'>
                    <span className='symbol-label bg-light'>
                      <KTSVG
                        path={`/media/icons/duotune/${clinic["@icon"]}`}
                        className='svg-icon-2 svg-icon-primary'
                      />
                    </span>
                  </div>

                  <div className='d-flex flex-column'>
                    <a
                      href='/#'
                      className={`fs-6 text-gray-700 text-hover-primary fw-bold ${
                        active && "text-primary "
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          auth.actions.setClinic(active ? undefined : clinic)
                        );
                      }}
                    >
                      {clinic["@title"]}
                    </a>
                    <span className='fs-7 text-muted fw-bold'>
                      {clinic["@subTitle"]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*<div*/}
      {/*  ref={resultsElement}*/}
      {/*  data-kt-search-element='results'*/}
      {/*  className='d-none'*/}
      {/*>*/}
      {/*  <div className='scroll-y mh-200px mh-lg-325px'>*/}
      {/*    {(searchResults as Array<HydraItem>).map((clinic) => {*/}
      {/*      const active = clinic.id === activeClinic?.id;*/}

      {/*      // console.log(active);*/}

      {/*      return (*/}
      {/*        <div*/}
      {/*          className={`d-flex align-items-center mb-3 p-2 rounded-2 bg-hover-lighten ${*/}
      {/*            active && " bg-primary bg-opacity-10"*/}
      {/*          }`}*/}
      {/*          key={clinic["@id"]}*/}
      {/*          onClick={(e) => {*/}
      {/*            e.preventDefault();*/}
      {/*            dispatch(*/}
      {/*              auth.actions.setClinic(active ? undefined : clinic)*/}
      {/*            );*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <div className='symbol symbol-40px me-4'>*/}
      {/*            <span className='symbol-label bg-light'>*/}
      {/*              <KTSVG*/}
      {/*                path={`/media/icons/duotune/${clinic["@icon"]}`}*/}
      {/*                className='svg-icon-2 svg-icon-primary'*/}
      {/*              />*/}
      {/*            </span>*/}
      {/*          </div>*/}

      {/*          <div className='d-flex flex-column'>*/}
      {/*            <a*/}
      {/*              href='/#'*/}
      {/*              className={`fs-6 text-gray-700 text-hover-primary fw-bold ${*/}
      {/*                active && "text-primary "*/}
      {/*              }`}*/}
      {/*              onClick={(e) => {*/}
      {/*                e.preventDefault();*/}
      {/*                dispatch(*/}
      {/*                  auth.actions.setClinic(active ? undefined : clinic)*/}
      {/*                );*/}
      {/*              }}*/}
      {/*            >*/}
      {/*              {clinic["@title"]}*/}
      {/*            </a>*/}
      {/*            <span className='fs-7 text-muted fw-bold'>*/}
      {/*              {clinic["@subTitle"]}*/}
      {/*            </span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export { QuickLinks };
