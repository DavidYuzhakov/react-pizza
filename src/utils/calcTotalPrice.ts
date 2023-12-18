import { TCartItem } from "../redux/slices/cart/types";

export function calcTotalPrice (items: TCartItem[]) {
  return items.reduce((sum: number, obj) => obj.price * obj.count + sum, 0)
}