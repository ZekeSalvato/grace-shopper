function requireUser(req, res, next) {
    console.log("in require user")
    console.log(req.user)
    if (!req.user) {
      console.log("no user")
      res.status(401)
      next({
        error: 'No user',
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
    next();
  }
  
  module.exports = {
    requireUser
  }