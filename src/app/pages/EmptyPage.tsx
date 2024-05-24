/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";

const EmptyPage: FC = ({ ...props }) => {
  return (
    <>
      This page has no content
      {/*<div className='card card-custom'>*/}
      {/*  <div className='card-body p-9'>*/}
      {/*    THIS PAGE IS {currentRoute?.routeKey}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export { EmptyPage };
