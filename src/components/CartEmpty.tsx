import { Link } from 'react-router-dom'
import empty from '../assets/img/empty-cart.png'

export function CartEmpty () {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>Вероятнее всего, вы не закзывали еще пиццу. <br /> 
      Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={empty} alt="Cart Empty" />
      <Link to={'/'} className='button button--black'>
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}