const isAdminMiddleware = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next()
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth for this user failed'
    })
  }
}

const isAuthMiddleware = (req, res, next) => {
  try {
    if (req.user.id === req.session.userId || req.user.isAdmin) {
      next()
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth for this user failed'
    })
  }
}

module.exports = {isAdminMiddleware, isAuthMiddleware}
