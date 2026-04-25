import { gql, type TypedDocumentNode } from '@apollo/client'
import type {
    IGetAllGenresData,
    IGetAllGenresVariables,
    IGetAllPlatformsData,
    IGetAllPlatformsVariables,
    IGetRawgGamesData,
    IGetRawgGamesVariables
} from '@src/core/features/interfaces/rawg.interface.ts'

export class RawgRequest {
  public static readonly GET_RAWG_GAMES: TypedDocumentNode<IGetRawgGamesData, IGetRawgGamesVariables> = gql`
      query GetRawgGames($input: GetRawgGamesInput!) {
          getRawgGames(input: $input) {
              data {
                  rawgId
                  name
                  backgroundImage
              }
              totalPages
              totalCount
              hasNextPage
          }
      }
  `

  public static readonly GET_PLATFORMS: TypedDocumentNode<IGetAllPlatformsData, IGetAllPlatformsVariables> = gql`
      query GetPlatforms($input: GetAllPlatformsInput!) {
          getAllPlatforms(input: $input) {
              data
              totalPages
              totalCount
              hasNextPage
          }
      }
  `

  public static readonly GET_GENRES: TypedDocumentNode<IGetAllGenresData, IGetAllGenresVariables> = gql`
      query GetGenres($input: GetAllGenresInput!) {
          getAllGenres(input: $input) {
              data
              totalPages
              totalCount
              hasNextPage
          }
      }
  `
}