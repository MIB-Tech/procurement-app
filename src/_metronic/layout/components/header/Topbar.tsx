import clsx from "clsx";
import React, { FC, useState } from "react";
import { KTSVG } from "../../../helpers";
import { HeaderUserMenu, QuickLinks } from "../../../partials";
import { useLayout } from "../../core";
import { ClickAwayListener } from "@mui/material";
import { useAuth } from "../../../../_custom/hooks/UseAuth";
import { Button } from "../../../../_custom/components/Button";
import { Trans } from "../../../../_custom/components/Trans";

const toolbarButtonMarginClass = "ms-1 ms-lg-3";

const Topbar: FC = () => {
  const { config } = useLayout();
  const [userToolbarOpen, setUserToolbarOpen] = useState<boolean>();
  const [clinicLinkOpen, setClinicLinkOpen] = useState<boolean>();
  const { user, clinic } = useAuth();

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <ClickAwayListener
        onClickAway={() => clinicLinkOpen && setClinicLinkOpen(false)}
      >
        <div
          className={clsx(
            "d-flex align-items-center",
            toolbarButtonMarginClass
          )}
        >
          <Button
            flush
            className={clsx()}
            onClick={() => setClinicLinkOpen(!clinicLinkOpen)}
          >
            <div>
              {clinic ? (
                <Button
                  className={clsx(
                    "btn btn-sm bg-light-primary border border-2 border-primary fw-bolder text-primary w-100 px-4"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className='d-sm-none'>{clinic["@title"]}</div>
                  <div className='d-none d-sm-block'>{clinic["@subTitle"]}</div>
                </Button>
              ) : (
                <span className='w-100px text-truncate fw-boldest text-hover-primary'>
                  <Trans id='CLINIC' />
                </span>
              )}
            </div>
          </Button>
          <QuickLinks show={clinicLinkOpen} />
        </div>
      </ClickAwayListener>
      <div
        className={clsx("d-flex align-items-center", toolbarButtonMarginClass)}
      >
        <div className='bullet bg-secondary h-35px w-1px mx-2'></div>
      </div>

      <div
        className={clsx("d-flex align-items-center", toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <ClickAwayListener
          onClickAway={() => {
            if (userToolbarOpen) {
              setUserToolbarOpen(false);
            }
          }}
        >
          <div>
            <div
              className='cursor-pointer'
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
              onClick={() => setUserToolbarOpen(!userToolbarOpen)}
            >
              <div className='d-flex align-items-center'>
                <div className='text-end'>
                  <span className='text-dark fw-bolder text-hover-primary fs-6'>
                    {user["@title"]}
                  </span>
                  {user.role && (
                    <div className='text-muted fw-bold text-muted fs-7'>
                      {user.role?.name}
                    </div>
                  )}
                </div>
                <div className='symbol symbol-40px ms-5'>
                  <div className='symbol-label fs-3 bg-light-primary text-primary'>
                    {(user.firstName[0] || "") + (user.lastName[0] || "")}
                  </div>
                </div>
              </div>
            </div>
            <HeaderUserMenu show={userToolbarOpen} />
          </div>
        </ClickAwayListener>
      </div>

      {config.header.left === "menu" && (
        <div
          className='d-flex align-items-center d-lg-none ms-2 me-n3'
          title='Show header menu'
        >
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG
              path='/media/icons/duotune/text/txt001.svg'
              className='svg-icon-1'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Topbar };
