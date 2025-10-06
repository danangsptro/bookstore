const orderRepo = require('../repositories/orderRepository');
module.exports = {
  callback: async (req, res, next) => {
    try {
      const { orderId, status, providerId } = req.body;
      if (!orderId || !status) return res.status(400).json({ error: 'orderId & status required' });
      await orderRepo.updateStatus(orderId, status);
      res.json({ ok: true });
    } catch (err) { next(err); }
  }
};
