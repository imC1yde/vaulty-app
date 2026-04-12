import { gql } from '@apollo/client'

export class UserRequest {
  public static readonly DELETE_USER = gql`
      mutation DeleteUser($input: DeleteUserInput!) {
          deleteUser(input: $input) {
              id
              email
              username
          }
      }
  `

  public static readonly UPDATE_USER = gql`
      mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
              id
              email
              username
          }
      }
  `

  public static readonly GET_USER = gql`
      query GetUser($input: GetUserInput!) {
          getUser(input: $input) {
              id
              email
              username
          }
      }
  `
}