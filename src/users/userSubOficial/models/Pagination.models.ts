export interface Pagination<T> {
  content: T[]
  totalElements: number
  totalPages: number
  last: boolean
  size: number
  number: number
  first: boolean
  numberOfElements: number
  empty: boolean
}
