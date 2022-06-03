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

