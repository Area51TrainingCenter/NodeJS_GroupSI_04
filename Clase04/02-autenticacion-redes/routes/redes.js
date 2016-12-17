var express = require("express"),
	router = express.Router(),
	passport = require("passport")

// RUTAS FACEBOOK
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

// RUTAS GOOGLE
router.get("/google/login", 
	passport.authenticate(
		"google",
		{
			scope: [
				"https://www.googleapis.com/auth/plus.login",
				"https://www.googleapis.com/auth/plus.profile.emails.read"
			]
		}
	)
)
router.get("/google/callback",
	passport.authenticate(
		"google",
		{
			successRedirect: "/home",
			failureRedirect: "/"
		}
	)
)

// RUTAS TWITTER
router.get("/twitter/login", passport.authenticate("twitter"))
router.get("/twitter/callback",
	passport.authenticate(
		"twitter",
		{
			successRedirect: "/home",
			failureRedirect: "/"
		}
	)
)

// RUTAS GITHUB
router.get("/github/login", passport.authenticate("github"))
router.get("/github/callback",
	passport.authenticate(
		"github",
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