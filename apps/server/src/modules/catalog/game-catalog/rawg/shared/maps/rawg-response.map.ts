import type { IRawgResponse } from '@src/common/interfaces/rawg-response.interface'
import { Paginated } from 'packages/common'

export const mapRawgResponse = <TData>(data: IRawgResponse<TData>, key: string, pageSize: number): Paginated<TData> => {
  const totalPages = Math.ceil(data.count / pageSize)

  return {
    data: data.results.map(obj => obj[key]),
    totalCount: data.count,
    totalPages: totalPages <= 1000 ? totalPages : 1000,
    hasNextPage: !!data.next && totalPages <= 1000
  } as Paginated<TData>
}
