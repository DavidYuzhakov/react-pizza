import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import ContentLoader from "react-content-loader"

// useParams - вытаскиваем динамический парам. из path в роуте (:nameparams)

export default function FullPizza () {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
    rating: number,
    sizes: number[],
    types: number[],
    desc: string
  }>()

  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchFullPizza () {
      try {
        const { data } = await axios.get(`https://655c22f0ab37729791a9e447.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (err) {
        alert("Не удалось данную пиццу :-)")
        console.warn(err)
        navigate('/')
      }
    }
    fetchFullPizza()
  }, []) // its not necessary to specify the id in deps

  if (!pizza) {
    return (
      <div className="container">
        <ContentLoader 
          speed={2}
          width={500}
          height={500}
          viewBox="0 0 500 500"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="100" cy="100" r="100" /> 
          <rect x="20" y="222" rx="6" ry="6" width="170" height="30" /> 
          <rect x="218" y="40" rx="3" ry="3" width="150" height="25" /> 
          <rect x="220" y="0" rx="3" ry="3" width="150" height="25" /> 
          <rect x="220" y="80" rx="3" ry="3" width="150" height="25" /> 
          <rect x="220" y="120" rx="3" ry="3" width="150" height="25" /> 
          <rect x="219" y="172" rx="3" ry="3" width="226" height="80" />
        </ContentLoader>
    </div>
    )
  }
  const typesNames = ['тонкое', 'традиционное']

  return (
    <div className="container fullPizza">
      <div>
        <img src={pizza.imageUrl} alt='pizza' />
        <h2>{ pizza.title }</h2>
      </div>
      <div className='fullPizza-info'>
        <h4>Цена: { pizza.price }₽</h4>
        <h4>Рейтинг: { pizza.rating } / 10</h4>
        <h4>Размер пиццы: { pizza.sizes.join('см, ') }см </h4>
        <h4>Тип пиццы: {pizza.types.length > 1 ? 'тонкое, трандиционное' : typesNames[pizza.types[0]]}</h4>
        <p>Описание: { pizza.desc }</p>
      </div>      
    </div>
  )
}
