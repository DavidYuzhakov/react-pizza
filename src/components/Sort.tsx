import { memo, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { SortPropertyEnum, TSort } from "../redux/slices/filter/types"
import { setSort } from "../redux/slices/filter/slice"

interface ISortProps {
  sort: TSort
}

export const list: TSort[] = [
  {name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC},
  {name: 'популярности (ASK)', sortProperty: SortPropertyEnum.RATING_ASK},
  {name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC},
  {name: 'цене (ASK)', sortProperty: SortPropertyEnum.PRICE_ASK},
  {name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC},
  {name: 'алфавиту (ASK)', sortProperty: SortPropertyEnum.TITLE_ASK},
]

export const Sort = memo(({ sort }: ISortProps) => {
  const dispatch = useDispatch()

  const sortRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  function clickHandler (obj: TSort) {
    dispatch(setSort(obj))
    setOpen(false)
  }

  useEffect(() => {
    function handleClickOutside (e: MouseEvent) {
      if (! (e.target as HTMLBodyElement).closest('.sort')) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => { // вызывается если компонент размонтируется (когда не рендерится этот компонент)
      document.body.removeEventListener('click', handleClickOutside)
    }
  } , [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(prev => !prev)}>{ sort.name }</span>
      </div>
      {open && <div className="sort__popup">
        <ul>
          {
            list.map((obj, i) => (
              <li 
                key={i}
                className={obj.sortProperty === sort.sortProperty ? 'active' : ''}
                onClick={() => clickHandler(obj)}
              >{ obj.name }</li>
            ))
          }
        </ul>
      </div>}
    </div>
  )
})