import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, PizzaSliceState, Status, TSearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], TSearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortUrl, orderUrl, categoryUrl, pageCount, searchUrl } = params
    const { data } = await axios.get<PizzaItem[]>(`https://655c22f0ab37729791a9e447.mockapi.io/items?page=${pageCount}&limit=4&${categoryUrl}&sortBy=${sortUrl}&order=${orderUrl}${searchUrl}`)

    return data
  }
)

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer