import { gql } from '@apollo/client'

export class AuthRequest {
  static readonly REGISTER = gql`
      mutation Register($input: RegisterUserInput!) {
          registerUser(input: $input) {
              id
              email
              username
          }
      }
  `

  static readonly AUTHORIZE = gql`
      mutation Authorize($input: AuthorizeUserInput!) {
          authorizeUser(input: $input) {
              id
              email
              username
              token
          }
      }
  `
}