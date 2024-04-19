/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {MenuItem, Select} from "@mui/material";


export const ReceiptCompliance: FC = () => {


  return (

    <>
      <Select
        labelId="demo-simple-select-label"
        value={['test']}
        label="BC"
      >
        <MenuItem value={'Comfore'}>BC1</MenuItem>
        <MenuItem value={'Comfore avec reserve'}>BC2</MenuItem>
        <MenuItem value={'aucun'}>BC3</MenuItem>
      </Select>
    </>
  )
}