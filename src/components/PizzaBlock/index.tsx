import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCartItemById } from "../../redux/slices/cart/selectors";
import { TCartItem } from "../../redux/slices/cart/types";
import { addItem } from "../../redux/slices/cart/slice";

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

export function PizzaBlock({ id, title, price, imageUrl, sizes, types }: PizzaBlockProps) {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id))

  const [typeActive, setTypeActive] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const typesNames = ['тонкое', 'традиционное']

  const addedCount = cartItem ?  cartItem.count : 0

  function onClickAdd () {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typesNames[typeActive],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  console.log(types)

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
          />
      </Link>
      <h4 className="pizza-block__title">{ title }</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li 
              key={i}
              className={types.length > 1 ? typeActive === type ? 'active' : '' : 'active'}
              onClick={() => setTypeActive(type)}
              >{typesNames[type]}</li> 
          ))}
        </ul>
        <ul>
          {
            sizes.map((size, i) => (
              <li
                key={size} 
                className={activeSize === i ? 'active' : ''}
                onClick={() => setActiveSize(i)}
              >{size} см.</li>
            ))
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от { price } ₽</div>
        <div 
          onClick={onClickAdd}
          className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{ addedCount }</i>}
        </div>
      </div>
    </div>
  );
}
