import { memo } from "react"

type CategoriesProps = {
  value: number
  onClickCategory: (idx: number) => void 
}

export const Categories = memo(({ value, onClickCategory }: CategoriesProps) => {
  const categories = [
    {text: 'Все', id: 0},
    {text: 'Мясные', id: 1},
    {text: 'Вегетарианская', id: 2},
    {text: 'Гриль', id: 3},
    {text: 'Острые', id: 4},
    {text: 'Закрытые', id: 5}
  ]

  return (
    <div className="categories">
      <ul>
        {
          categories.map(({text, id}) => (
            <li onClick={() => onClickCategory(id)} key={id} className={value === id ? 'active' : ''}>{ text }</li>
          ))
        }
      </ul>
    </div>
  )
})