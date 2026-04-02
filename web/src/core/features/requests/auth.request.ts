import { gql } from '@apollo/client'

export class AuthRequest {
  public static readonly REGISTER = gql`
      mutation Register($input: RegisterUserInput!) {
          registerUser(input: $input) {
              id
              email
              username
          }
      }
  `

  public static readonly AUTHORIZE = gql`
      mutation Authorize($input: AuthorizeUserInput!) {
          authorizeUser(input: $input) {
              id
              email
              username
          }
      }
  `

  public static readonly SIGN_OUT = gql`
      mutation SignOut {
          signOut
      }
  `
}