import type { IUserCatalogItem } from '@src/common/interfaces/user-catalog-item.interface.ts'

export interface IGetAllItemsData {
  getAllItems: {
    data: IUserCatalogItem[]
    totalPages: number
    totalCount: number
    hasNextPage: boolean
  }
}

export interface IGetAllItemsVariables {
  input: {
    page: number
    pageSize: number
  }
}