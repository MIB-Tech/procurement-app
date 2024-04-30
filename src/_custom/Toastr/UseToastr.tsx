import React from 'react'
import {Context} from './Toastr.provider'


export const useToastr = () => React.useContext(Context)