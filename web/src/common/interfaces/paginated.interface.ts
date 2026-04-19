export interface IPaginated<TData> {
  data: TData[]
  totalPages: number
  totalCount: number
  hasNextPage: boolean
}