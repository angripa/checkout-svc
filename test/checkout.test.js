const assert = require('assert').strict;
const resolvers = require('../graphql/resolvers.js');
describe("checkout test", function () {
    it("checkout product with sku IP12PM9 and should return a free 20W Apple USB-C Power Adapter", function () {
        var param = {
            "orderRequest": [{
                "sku": "IP12PM9",
                "qty": 1
            }]
        }
        var result = resolvers.checkout(param)
        assert.equal(result.discount.item.sku, 'CIP20CP')
    });
});

describe("checkout test", function () {
    it("Buy 3 AirPods Pro($249) for the price of 2", function () {
        var param = {
            "orderRequest": [{
                "sku": "APP20E",
                "qty": 3
            }]
        }
        var result = resolvers.checkout(param)
        assert.equal(result.totalPrice, (param.orderRequest[0].qty - 1) * 249)
    });
});

describe("checkout test", function () {
    it("Buying more than 3 HomePod mini($99) will have a 10% discount on all HomePod mini", function () {
        var param = {
            "orderRequest": [{
                "sku": "AHPM2",
                "qty": 4
            }]
        }
        var result = resolvers.checkout(param)
        var expectedPrice = (param.orderRequest[0].qty * 99) - (param.orderRequest[0].qty * 99 * 0.1)
        assert.equal(result.totalPrice, expectedPrice)
    });
});