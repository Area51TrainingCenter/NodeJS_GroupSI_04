var express = require("express"),
	router = express.Router(),
	passport = require("passport")

router.get("/facebook/login", passport.authenticate("facebook"))
router.get("/facebook/callback",
	passport.authenticate(
		"facebook",
		{
			successRedirect: "/home",
			failureRedirect: "/"
		}
	)
)


module.exports = router