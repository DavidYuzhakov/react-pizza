export type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  category: number
  desc: string
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
}

export type TSearchPizzaParams = {
  sortUrl: string  // он не TSort потому что при создании sortUrl используется метод replace тем как бы перебивая тип с TSort в string
  orderUrl: string 
  categoryUrl: string
  pageCount: number
  searchUrl: string
}