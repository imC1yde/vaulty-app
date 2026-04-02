import { gql } from '@apollo/client'

export class CustomInventoryRequest {
  public static readonly GET_ITEM = gql`
      query GetItem($id: String!) {
          getItemById(id: $id) {
              id
              name
              description
              image
          }
      }
  `

  public static readonly GET_ALL_ITEM = gql`
      query GetItems($input: GetAllItemsInput!) {
          getAllItems(input: $input) {
              data {
                  id
                  name
                  description
                  image
              }
              totalCount
              totalPages
              hasNextPage
          }
      }
  `

  public static readonly CREATE_ITEM = gql`
      mutation CreateItem($input: CreateItemInput!, $file: Upload!) {
          createItem(input: $input, image: $file) {
              id
              name
              description
              image
          }
      }
  `

  public static readonly UPDATE_ITEM = gql`
      mutation UpdateItem($input: UpdateItemInput!, $file: Upload!) {
          updateItem(input: $input, image: $file) {
              id
              name
              description
              image
          }
      }
  `

  public static readonly DELETE_USER = gql`
      mutation DeleteItem($id: String!) {
          deleteItem(id: $id) {
              id
              name
              description
              image
          }
      }
  `
}