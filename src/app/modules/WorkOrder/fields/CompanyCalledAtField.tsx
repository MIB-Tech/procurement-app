import React, { useState } from 'react';
import { Checkbox } from '../../../../_custom/Column/Boolean/Chechbox/Checkbox';
import { DatetimeField } from '../../../../_custom/Column/String/DatetimeField';


export const CompanyCalledAtField = () => {
  const [external, setExternal] = useState<boolean>(false);

  return (
    <>
      <Checkbox
        label='IS_EXTERNAL'
        className='mb-5'
        checked={external}
        onChange={() => {
          setExternal(!external);
        }}
      />
      <DatetimeField
        name='workOrder.companyCalledAt'
        disabled={!external}
      />
    </>
  );
};