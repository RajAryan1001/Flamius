// order.controller.js
const Order = require('../Models/order.model');

/**
 * Helper: compute total amount from items (unit price * qty)
 */
function computeTotalFromItems(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, it) => {
    const q = Number(it.quantity) || 0;
    const p = Number(it.price) || 0;
    return sum + q * p;
  }, 0);
}

exports.createOrder = async (req, res) => {
  try {
    const { customerName, contact, items, paymentMethod, notes } = req.body;

    // Recalculate total server-side (never trust client)
    const totalAmount = computeTotalFromItems(items);

    const order = new Order({
      customerName,
      contact,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'cash',
      notes
    });

    await order.save();
    return res.status(201).json({ ok: true, order });
  } catch (err) {
    console.error('createOrder error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // Basic pagination & filtering (optional)
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter)
    ]);

    return res.json({ ok: true, page, limit, total, orders });
  } catch (err) {
    console.error('getOrders error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });
    return res.json({ ok: true, order });
  } catch (err) {
    console.error('getOrderById error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If items present in update, recalc total
    if (updates.items) {
      updates.totalAmount = computeTotalFromItems(updates.items);
    }

    const order = await Order.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });
    return res.json({ ok: true, order });
  } catch (err) {
    console.error('updateOrder error:', err);
    // validation errors from mongoose
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, message: err.message });
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });
    return res.json({ ok: true, message: 'Order deleted' });
  } catch (err) {
    console.error('deleteOrder error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
};
