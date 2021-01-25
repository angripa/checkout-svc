# checkout-svc
This is a solution for simple checkout schema.
The system should have the following promotions: <br>
● Each sale of a Iphone 12 Pro Max comes with a free 20W Apple USB-C Power Adapter<br>
● Buy 3 AirPods Pro for the price of 2<br>
● Buying more than 3 HomePod mini will have a 10% discount on all HomePod mini<br>

# Technology 
this solution developed using, <br>
● Node 10.13.0
● GraphQL

## Instalation
<i>make sure you have install npm on your machine</i><br>
To run the test<br>
```
npm run test
```
# Test Result 
```
 checkout test
    ✓ checkout product with sku IP12PM9 and should return a free 20W Apple USB-C Power Adapter

  checkout test
    ✓ Buy 3 AirPods Pro($249) for the price of 2

  checkout test
    ✓ Buying more than 3 HomePod mini($99) will have a 10% discount on all HomePod mini
```
To run the service<br>
```npm run start```


#GraphQL schema<br>
```bash
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
    item: Item,
    desc: String!,
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
```
