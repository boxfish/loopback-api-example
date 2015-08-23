module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('admin', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    var User = app.models.user;
    User.findById(userId, function(err, user) {
      if (err || !user)
        return reject();
      // if role is set to admin
      cb(null, user.role === "admin");
    });
  });
}
