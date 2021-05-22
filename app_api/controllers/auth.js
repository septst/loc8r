const passport = require('passport');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

const register = (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(300)
            .json({ "message": "All fields are required" });
    }
    const newUser = new userModel();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    console.log("New user =>", newUser);
    newUser.save((err) => {
        if (err?.code === 11000) {
            return res.status(300)
                .json({ "message": "The user already exists." });
        } else if (err) {
            return res.status(500)
                .json({ "error": err });
        } else {
            const token = newUser.generateJwt();
            return res.status(200)
                .json({ token });
        }
    })

};
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(300)
            .json({ "message": "All fields are required" });
    }

    passport.authenticate("local",
        (err, authUser, info) => {
            if (err) {
                return res.status(404).json(err);
            }

            if (authUser) {
                let token = authUser.generateJwt();
                res.status(200).json({ token });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
};

module.exports = {
    register,
    login
};