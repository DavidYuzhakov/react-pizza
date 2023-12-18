import { useCallback, useRef, useState } from "react"
import debounce from 'lodash.debounce'
import { useDispatch } from "react-redux"

import styles from "./Search.module.scss"
import { setSearchValue } from "../../redux/slices/filter/slice";

export function Search () {
  const dispatch = useDispatch(); 
  const [value, setValue] = useState('')
  const [isActive, setIsActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  function onClickClear () {
    setValue('')
    dispatch(setSearchValue('')) 
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} onClick={() => setIsActive(prev => !prev)} height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"/></svg>
      <input
        ref={inputRef}
        className={`${styles.input} ${isActive ? styles.active : ''}`} 
        type="search" 
        value={value} 
        onChange={onChangeInput}
        placeholder="Поиск пиццы..." 
      />
      {value && <div onClick={onClickClear} className={styles.iconClear}>&times;</div>}
    </div>
  )
}