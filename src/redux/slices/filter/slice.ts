import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, SortPropertyEnum, TSort } from "./types"

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярности (DESC)', 
    sortProperty: SortPropertyEnum.RATING_DESC
  }
}

const filterSlice = createSlice({
  name: 'filters', //нужно для того чтобы redux мог коректно задать определенную команду
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload // payload - хранит то что будем передавать параметром при вызове функции
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort
      state.pageCount = Number(action.payload.pageCount)
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})



export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer