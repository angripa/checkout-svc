var { buildSchema } = require('graphql');

const typeDefs = buildSchema(`
type Item{
  sku: String,
  name: String,
  price: Int!
}
input OrderRequest {
  sku: String!
  qty: Int!
}
type Discount{
  type: String!,
  amount: Int,
  desc: String!,
  item: Item,
}
type Order{
  item: Item!,
  originalPrice : Float!,
  totalPrice: Float!,
  discount: Discount
}

type Query {
  checkout(orderRequest: [OrderRequest]!): Order
}
`);

module.exports = typeDefs;