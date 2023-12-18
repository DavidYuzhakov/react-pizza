import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Paginatoin.module.scss'
import { setPageCount } from '../../redux/slices/filter/slice';

export function Pagination() {
  const dispatch = useDispatch();
  const pageCount = useSelector((state: any) => state.filter.pageCount)

  return (
    <ul className={styles.root}>
      <li
        onClick={() => pageCount !== 1 ? dispatch(setPageCount(pageCount - 1)) : false} 
        className={styles.arrow}
      >&#x2039;</li>
      {[...Array(3)].map((_, i) => ( 
        <li 
          key={i}
          onClick={() => dispatch(setPageCount(i + 1))} 
          className={pageCount === (i + 1) ? 'selected' : ''}
        >{ i + 1 }</li>
      ))}
      <li 
        onClick={() => pageCount !== 3 ? dispatch(setPageCount(pageCount + 1)) : false} 
        className={styles.arrow}
      >&#x203A;</li>
    </ul>
  )
}
