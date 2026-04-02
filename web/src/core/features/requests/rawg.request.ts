import { gql } from '@apollo/client'

export class RawgRequest {
  public static readonly GET_RAWG_GAMES = gql`
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

  public static readonly GET_PLATFORMS = gql`
      query GetPlatforms($input: GetPlatformsInput!) {
          getPlatforms(input: $input) {
              data
              totalPages
              totalCount
              hasNextPage
          }
      }
  `

  public static readonly GET_GENRES = gql`
      query GetGenres($input: GetGenresInput!) {
          getGenres(input: $input) {
              data
              totalPages
              totalCount
              hasNextPage
          }
      }
  `
}