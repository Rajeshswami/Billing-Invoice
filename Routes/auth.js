//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//loading Auth Model
const User = require("../Model/auth");
//@ http method POST
//@description its AUTH get information
//@access PUBLIC
/*=======================LOGIN POST ROUTE =========================*/


/*=======================REGISTER POST ROUTE =========================*/
router.post("/register", (req, res) => {
    console.log(req.body)

    let { username, email, password, } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                res.json({ msg: "Email already Registered please choose another email address " });
                //   res.redirect("/auth/register", 401, {});
            } else {
                let newUser = new User({
                    username,
                    email,
                    password,
                });
                //make password hashed
                bcrypt.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((userData) => {
                                res.json({ msg: "Successfully User Registered" });
                                //   res.redirect("/auth/login", 201, { userData });
                            })
                            .catch((err) => console.log(err));
                    });
                }); //done hashing and save in to database
            }
        })
        .catch((err) => console.log(err));
}
);

module.exports = router;