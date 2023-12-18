export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASK = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASK = '-title',
  PRICE_DESC = 'price',
  PRICE_ASK = '-price',
}

export type TSort = {
  name: string,
  sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  pageCount: number
  sort: TSort
}