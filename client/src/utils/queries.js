import { gql } from '@apollo/client'

export const QUERY_CATEGORIES = gql`
    query Categories {
        categories {
        name
        _id
        }
    } 
`

export const QUERY_ALL_ARTS = gql`
    query ArtForSale {
        artForSale {
            _id
            title
            description
            image
            price
            category {
                name
            }
        }
    }
`

export const QUERY_ARTS = gql`
    query Arts($category: ID, $title: String, $artsId: ID){
        artForSale(category: $category, title: $title, id: $artsId){
            _id
            title
            description
            image
            price
            category {
                _id
                name
            }
        }
    }

`

export const QUERY_USER = gql`
    query Users($id: ID) {
        users(_id: $id) {
        firstName
        lastName
        username
        _id
        email
        password
        orders
        }
    }    
`

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;


