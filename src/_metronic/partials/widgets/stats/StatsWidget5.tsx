/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { KTSVG } from "../../../helpers";

type Props = {
  className: string;
  innerPadding?: string;
};

const StatsWidget5: React.FC<Props> = ({ className, innerPadding = "" }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Section */}
        <div className='d-flex align-items-center'>
          {/* begin::Symbol */}
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-warning'>
              <KTSVG
                className='svg-icon-2x svg-icon-warning'
                path='/media/icons/duotune/general/gen025.svg'
              />
            </span>
          </div>
          {/* end::Symbol */}

          {/* begin::Title */}
          <div>
            <a
              href='#'
              className='fs-4 text-gray-800 text-hover-primary fw-bolder'
            >
              Chat Application
            </a>
            <div className='fs-7 text-muted fw-bold mt-1'>RractJS, .NET</div>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Section */}

        {/* begin::Info */}
        <div className='fw-bolder text-muted pt-7'>
          <span className='d-block'>26 Authors</span>
          <span className='d-block pt-2'>140 Comments</span>
        </div>
        {/* end::Info */}

        {/* begin::Progress */}
        <div className='progress h-6px  bg-light-warning mt-7'>
          <div
            className='progress-bar bg-warning'
            role='progressbar'
            style={{ width: "60%" }}
            aria-valuenow={50}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        {/* end::Progress */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatsWidget5 };
