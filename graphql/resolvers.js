var checkout = require('../services/checkout.js')
const resolvers = {
    checkout:(param) => {
        if(param.orderRequest.length > 0){
            const item = checkout.getItem(param.orderRequest[0].sku)
            return checkout.calculate(item, param.orderRequest[0].qty)
        }
        throw new Error("Bad Request")
    }

};

module.exports = resolvers;