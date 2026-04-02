export interface Paginated<TData> {
  data: TData[]
  totalPages: number
  totalCount: number
  hasNextPage: boolean
}