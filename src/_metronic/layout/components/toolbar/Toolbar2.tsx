import React, { FC } from "react";
import { usePageData } from "../../core";

const Toolbar2: FC = () => {
  const { toolbar } = usePageData();

  if (!toolbar) {
    return <></>;
  }

  return (
    <div className='container mb-5'>
      <div className='card'>
        <div className='card-body'>{toolbar}</div>
      </div>
    </div>
  );
};

export { Toolbar2 };
