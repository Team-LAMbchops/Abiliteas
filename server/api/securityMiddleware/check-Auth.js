const isAdminMiddleware = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next()
    }
  } catch (error) {
    res.redirect('/')
  }
}

const isAuthMiddleware = (req, res, next) => {
  try {
    if (req.user.id === req.session.userId || req.user.isAdmin) {
      next()
    }
  } catch (error) {
    res.redirect('/')
  }
}

module.exports = {isAdminMiddleware, isAuthMiddleware}
