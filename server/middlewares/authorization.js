const User = require("../models/user.js");

function authorization(req, res, next) {
    User.findById(req.user.id)
        .then((found) => {
            if (found) {
                if (found.name == "admin") {
                    next();
                } else {
                    let err = {
                        status: 401,
                        messages: `You are not admin.`
                    }
                    next(err);
                }
            } else {
                let err = {
                    status: 404,
                    messages: `User not found.`
                }
                next(err);
            }
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = authorization;