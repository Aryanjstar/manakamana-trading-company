const Order = require('../models/orderSchema.js');

const newOrder = async (req, res) => {
    try {

        const {
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            productsQuantity,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            paidAt: Date.now(),
            productsQuantity,
            totalPrice,
        });

        return res.send(order);

    } catch (err) {
        res.status(500).json(err);
    }
}

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });

        if (orders.length > 0) {
            const orderedProducts = orders.reduce((accumulator, order) => {
                accumulator.push(...order.orderedProducts);
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getCustomerOrders = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id }).sort({ createdAt: -1 });

        if (orders.length > 0) {
            res.send(orders);
        } else {
            res.send({ message: "No orders found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const orders = await Order.find({
            'orderedProducts.seller': sellerId
        }).sort({ createdAt: -1 });

        if (orders.length > 0) {
            // Filter to only include orders that have products from this seller
            const filteredOrders = orders.map(order => ({
                ...order.toObject(),
                orderedProducts: order.orderedProducts.filter(product => 
                    product.seller.toString() === sellerId
                )
            }));
            res.send(filteredOrders);
        } else {
            res.send({ message: "No orders found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.seller': sellerId
        });

        if (ordersWithSellerId.length > 0) {
            const orderedProducts = ordersWithSellerId.reduce((accumulator, order) => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        // If product already exists, merge quantities
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        // If product doesn't exist, add it to accumulator
                        accumulator.push(product);
                    }
                });
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getCustomerOrders,
    getSellerOrders,
    getOrderedProductsBySeller
};
