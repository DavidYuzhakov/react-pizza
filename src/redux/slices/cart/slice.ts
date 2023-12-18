import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getCartFromLS } from "../../../utils/getCartFromLS"
import { calcTotalPrice } from "../../../utils/calcTotalPrice"

import { CartSliceState, TCartItem } from "./types"



const initialState: CartSliceState = {
  items: getCartFromLS(),
  totalPrice: calcTotalPrice(getCartFromLS())
}

const cartSlice = createSlice({
  name: 'cart', //нужно для того чтобы redux мог коректно задать определенную команду
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(item => item.id === action.payload)

      if (findItem) {
        findItem.count--
      }
      
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  }
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer