const errorRepo = require('../repositories/errorLogRepository');

module.exports = async function errorHandler(err, req, res, next) {
  try {
    console.error(err);
    try {
      await errorRepo.create({
        message: err.message || 'Unknown',
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        userId: req.user?.id || null,
        meta: { body: req.body, params: req.params, query: req.query }
      });
    } catch (e) { console.error('Failed to save error log', e); }

    if (res.headersSent) return next(err);
    const code = err.statusCode || 500;
    res.status(code).json({ error: err.message || 'Internal server error' });
  } catch (e) {
    console.error('Error handler fatal', e);
    res.status(500).json({ error: 'Fatal error in error handler' });
  }
};
