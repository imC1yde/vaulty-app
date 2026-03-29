export class Paginated<TData> {
  data: TData[]
  totalPages: number
  totalCount: number
  hasNextPage: boolean
}