import { gql } from '@apollo/client'

export class GameInventoryRequest {
  public static readonly GET_GAME = gql`
      query GetGame($id: String!) {
          getGameById(id: $id) {
              id
              name
              rawgId
              isCompleted
              description
              backgroundImage
              rating
              released
              genres
              platforms
              esrbRating
          }
      }
  `

  public static readonly GET_ALL_GAMES = gql`
      query GetGames($input: GetAllGamesInput!, $filter: GetAllGamesFilterInput!) {
          getAllGames(input: $input, filter: $filter) {
              data {
                  id
                  name
                  isCompleted
                  backgroundImage
                  rating
                  genres
                  platforms
                  esrbRating
              }
              totalPages
              totalCount
              hasNextPage
          }
      }
  `

  public static readonly CREATE_GAME = gql`
      mutation CreateGame($id: Float!) {
          createGame(id: $id) {
              id
              name
              rawgId
              isCompleted
              description
              backgroundImage
              rating
              released
              genres
              platforms
              esrbRating
          }
      }
  `

  public static readonly UPDATE_GAME = gql`
      mutation UpdateGame($input: UpdateGameInput!) {
          updateGame(input: $input) {
              id
              name
              rawgId
              isCompleted
              description
              backgroundImage
              rating
              released
              genres
              platforms
              esrbRating
          }
      }
  `

  public static readonly DELETE_GAME = gql`
      mutation DeleteGame($id: String!) {
          deleteGame(id: $id) {
              id
              name
              rawgId
              isCompleted
              description
              backgroundImage
              rating
              released
              genres
              platforms
              esrbRating
          }
      }
  `
}