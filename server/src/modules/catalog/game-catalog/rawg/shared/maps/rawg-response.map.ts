import type { IRawgResponse } from '@src/common/interfaces/rawg-response.interface'

export const mapRawgResponse = <TData>(data: IRawgResponse<TData>, key: string, pageSize: number) => {
  const totalPages = Math.ceil(data.count / pageSize)

  return {
    data: data.results.map(obj => obj[key]),
    totalCount: data.count,
    totalPages: totalPages <= 1000 ? totalPages : 1000,
    hasNextPage: !!data.next && totalPages <= 1000
  }
}
