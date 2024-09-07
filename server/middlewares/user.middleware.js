import Socket from '#core/socket';

export const isUserMiddleware = (req, res, next) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) throw Error('Headers [user-id] is required');
    const connections = Socket.getConnectionsByUserId(userId);
    if (!connections.length) throw Error('Connection has been closed');
    next();
  } catch (error) {
    return res.status(403).send({ status: 403, message: error.message });
  }
};
