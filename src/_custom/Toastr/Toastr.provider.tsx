import React, {createContext, FC} from 'react'
import {useTrans} from '../components/Trans'
import {ToastContextModel, ToastProviderProps, ToastrTypes} from './Toastr.types'
import {Toastr} from './Toastr'


export const Context = createContext<ToastContextModel>({
  toast: () => {
  },
  error: () => {
  },
  success: () => {
  },
  remove: () => {
  },
  createMutationSuccess: () => {
  },
  createMutationError: () => {
  },
  deleteMutationSuccess: () => {
  },
  deleteMutationError: () => {
  },
  updateMutationSuccess: () => {
  },
  updateMutationError: () => {
  },
  itemNotFoundError: () => {
  },
})


export const ToastProvider: FC<ToastProviderProps> = ({children}) => {
  const {trans} = useTrans()
  const [toasts, setToasts] = React.useState<ToastrTypes[]>([])

  const toast = (_toast: ToastrTypes) => {
    setToasts([...toasts, _toast])
  }
  const error = (_toast: ToastrTypes) => {
    toast({..._toast, variant: 'danger'})
  }
  const success = (_toast: ToastrTypes) => {
    toast({..._toast, variant: 'success'})
  }
  const remove = (index: number) => {
    const newToasts = toasts.filter((t, i) => i !== index)
    setToasts(newToasts)
  }
  const createMutationSuccess = () => {
    success({title: trans({id: 'MUTATION.CREATE.SUCCESS'})})
  }
  const createMutationError = () => {
    error({title: trans({id: 'MUTATION.CREATE.ERROR'})})
  }
  const deleteMutationSuccess = () => {
    success({title: trans({id: 'MUTATION.DELETE.SUCCESS'})})
  }
  const deleteMutationError = () => {
    error({title: trans({id: 'MUTATION.DELETE.ERROR'})})
  }
  const updateMutationSuccess = () => {
    success({title: trans({id: 'MUTATION.UPDATE.SUCCESS'})})
  }
  const updateMutationError = () => {
    error({title: trans({id: 'MUTATION.UPDATE.ERROR'})})
  }
  const itemNotFoundError = () => {
    error({title: trans({id: 'ITEM.NOT.FOUND'})})
  }


  return (
    <Context.Provider value={{
      toast,
      remove,
      error,
      success,
      createMutationSuccess,
      createMutationError,
      deleteMutationSuccess,
      deleteMutationError,
      updateMutationSuccess,
      updateMutationError,
      itemNotFoundError,
    }}>
      {children}
      <div>
        {toasts.map(({...rest}, index) => (
          <Toastr
            key={index}
            onDismiss={() => {
              remove(index)
            }}
            {...rest}
          />
        ))}
      </div>
    </Context.Provider>
  )
}


