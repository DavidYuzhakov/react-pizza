export type TCartItem = {
  id: string
  title: string
  price: number
  size: number
  count: number
  imageUrl: string
  type: string
}

export interface CartSliceState {
  totalPrice: number
  items: TCartItem[]
}
