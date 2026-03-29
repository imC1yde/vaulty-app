export interface IRawgResponse<TResults> {
  results: TResults[]
  count: number
  next: string
  previous: string
}