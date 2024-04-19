import React, {FC, HTMLAttributes, useEffect, useState} from 'react'
import {Input} from '../../Column/String/InputBase/Input'
import clsx from 'clsx'
import {SVG} from '../../components/SVG/SVG'
import {useTrans} from '../../components/Trans'


type SearchToolbarProps = {
  value: string,
  delay?: number,
  onChange: (value: string) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

// Hook
// T is a generic type for value parameter, our case this will be string
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay], // Only re-call effect if value or delay changes
  )
  return debouncedValue
}


export const SearchToolbar: FC<SearchToolbarProps> = ({value = '', delay = 0, onChange, className, ...props}) => {
  const {trans} = useTrans()
  const [searchTerm, setSearchTerm] = useState<string>(value)
  useEffect(
    () => {
      const handler = setTimeout(() => onChange(searchTerm), delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [searchTerm, delay],
  )
  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  return (
    <div className={clsx('w-100 position-relative', className)} {...props}>
      <SVG
        path="/general/gen021.svg"
        size="2"
        className="position-absolute top-50 translate-middle-y ms-3"
      />
      <Input
        placeholder={trans({id: 'SEARCH'})}
        size="sm"
        className="ps-10"
        // bg='solid'
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
        }}
      />
    </div>
  )
}
