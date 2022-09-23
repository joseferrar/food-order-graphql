import {gql} from '@apollo/client';

const REGISTER_QUERY = gql`
  mutation Mutation($userInput: UserInput) {
    register(userInput: $userInput) {
      username
      email
    }
  }
`;

const LOGIN_QUERY = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

const GET_USER_ID = gql`
  mutation getUser($userId: ID!) {
    getUser(userId: $userId) {
      username
      email
    }
  }
`;

const GET_PRODUCT = gql`
  query {
    products {
      product_name
      product_desc
      price
      imageUrl
      restaurant
    }
  }
`;

const GET_RESTAURANT = gql`
  query {
    restaurants {
      id
      name
      image
    }
  }
`;
const ADD_CART = gql`
  mutation addOrder($cartInput: [CartInput!]!, $total: Int) {
    addOrder(cartInput: $cartInput, total: $total) {
      order {
        product_name
      }
    }
  }
`;

const GET_CART = gql`
  query {
    carts {
      id
      product_name
      product_desc
      imageUrl
      restaurant
      price
      qty
    }
  }
`;

const UPDATE_CART = gql`
  mutation updateCart(
    $product_name: String!
    $product_desc: String!
    $imageUrl: String!
    $id: ID!
    $restaurant: String!
    $price: Int!
    $qty: Int!
  ) {
    updateCart(
      product_name: $product_name
      product_desc: $product_desc
      imageUrl: $imageUrl
      id: $id
      restaurant: $restaurant
      price: $price
      qty: $qty
    ) {
      id
      product_name
      product_desc
      imageUrl
      restaurant
      price
      qty
    }
  }
`;

export {
  REGISTER_QUERY,
  LOGIN_QUERY,
  GET_USER_ID,
  GET_PRODUCT,
  GET_RESTAURANT,
  ADD_CART,
  GET_CART,
  UPDATE_CART,
};
