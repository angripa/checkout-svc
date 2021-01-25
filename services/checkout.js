var items = require('../data/db.js')
function getItem(sku) {
    return items.find(data => data.sku === sku);
}
const checkout = {
    getItem: (sku) => {
        const item = getItem(sku);
        if (item)
            return item;
        throw new Error("Item Not found")
    },
    calculate: (item, qty) => {
        if (item.qty < qty) {
            throw new Error("Item out of stock")
        }
        var order = {};
        var disc;
        var freeItem;
        if (item.sku === 'IP12PM9') {
            freeItem = getItem('CIP20CP');
            disc = freeItem.price * qty;
            order = {
                "item": item,
                "originalPrice": (qty * item.price) + disc,
                "discount": {
                    "type": "FREE_ITEM",
                    "item": freeItem,
                    "amount": qty,
                    "desc": "Each sale of a Iphone 12 Pro Max comes with a free 20W Apple USB-C Power Adapter"
                },
                "totalPrice": qty * item.price
            }
        } else if (item.sku === 'APP20E') {
            var qtyDiscount = parseInt(qty / 3);
            if (qtyDiscount >= 1) {

                freeItem = getItem('APP20E');
                disc = freeItem.price * qtyDiscount;
                order = {
                    "item": item,
                    "originalPrice": disc + (qty * item.price),
                    "discount": {
                        "type": "FREE_ITEM",
                        "item": freeItem,
                        "amount": qtyDiscount,
                        "desc": "Buy 3 AirPods Pro for the price of 2"
                    },
                    "totalPrice": (qty - qtyDiscount) * item.price
                }
            } else {
                order = {
                    "item": item,
                    "originalPrice": qty * item.price,
                    "totalPrice": qty * item.price
                }
            }
        } else if (item.sku === 'AHPM2') {
            let amt = qty * item.price;
            if (qty > 3) {
                order = {
                    "item": item,
                    "originalPrice": qty * item.price,
                    "totalPrice": amt - (0.1 * amt),
                    "discount": {
                        "type": "PERCENTAGE",
                        "amount": 10,
                        "desc": "Buying more than 3 HomePod mini will have a 10% discount on all HomePod mini"
                    },
                }
            } else {
                order = {
                    "item": item,
                    "originalPrice": qty * item.price,
                    "totalPrice": amt
                }
            }
        } else {
            order = {
                "item": item,
                "originalPrice": qty * item.price,
                "totalPrice": qty * item.price
            }
        }
        return order;
    }

};

module.exports = checkout;