const { buildSchema } = require("graphql");

module.exports = buildSchema(` 
type Booking {
    _id: ID!
    restaurant: Restaurant!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Restaurant {
  id: ID!
  name: String!
  image: String!
  product: [Product!]!
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  mobile: Int
  address: String
  city: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Product {
  id: ID!
  product_name: String!
  product_desc: String!
  price: Int!
  imageUrl: String!
  restaurant: String
}

type Cart {
  id: ID!
  product_name: String!
  product_desc: String!
  price: Int!
  imageUrl: String!
  restaurant: String
  cartQuantity: Int!
}

input RestaurantInput {
  name: String!
  image: String!
}

input UserInput {
  userId: ID
  username: String
  email: String
  password: String
  mobile: Int
  address: String
  city: String
}

input CartInput {
  product_name: String!
  product_desc: String!
  price: Int!
  imageUrl: String!
  restaurant: String
  cartQuantity: Int
}

input ProductInput {
  product_name: String!,
  product_desc: String!,
  price: Int!,
  imageUrl: String!,
  restaurant: String
}

type RootQuery {
  restaurants: [Restaurant!]!
  bookings: [Booking!]!
  products: [Product!]!
  carts: [Cart!]!
}
type CreateUsersPayload {
  order: [Cart],
  total: Int

}

type RootMutation {
    createRestaurant(restaurantInput: RestaurantInput): Restaurant
    register(userInput: UserInput): User
    createProduct(productInput: ProductInput): Product
    login(email: String!, password: String!): AuthData!
    getUser(userId: ID!): User!
    updateUser(userInput: UserInput): User
    addOrder(cartInput: [CartInput!]!, total: Int): CreateUsersPayload

    deleteCart(cartId: ID!): Cart!
    updateCart(cartId: ID): Cart!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
