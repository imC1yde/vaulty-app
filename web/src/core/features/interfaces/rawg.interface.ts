import type { IPaginated } from '@src/common/interfaces/paginated.interface.ts'
import type { IRawgGame } from '@src/common/interfaces/rawg-game.interface.ts'

export interface IGetRawgGamesData {
  getRawgGames: IPaginated<IRawgGame>
}

export interface IGetRawgGamesVariables {
  input: {
    search: string
    page: number
    pageSize: number
  }
}

export interface IGetAllPlatformsData {
  getAllPlatforms: IPaginated<string>
}

export interface IGetAllPlatformsVariables {
  input: {
    search: string
    page: number
    pageSize: number
  }
}

export interface IGetAllGenresData {
  getAllGenres: IPaginated<string>
}

export interface IGetAllGenresVariables {
  input: {
    search: string
    page: number
    pageSize: number
  }
}