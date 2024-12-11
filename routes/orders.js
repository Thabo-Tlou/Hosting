import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order.status !== 'Shipped') {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedOrder);
        } else {
            res.status(400).json({ error: 'Cannot update shipped order' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json(deletedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
