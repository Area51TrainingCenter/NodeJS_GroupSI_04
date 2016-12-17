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

router.get("/logout", function(req, res){
	req.logout()
	res.redirect("/")
})


module.exports = router