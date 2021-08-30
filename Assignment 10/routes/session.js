const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userData = require("./users")

router.get('/', async (req, res) => {
    const sessionData = req.session
    if(sessionData.user){
        res.redirect("/private")
    } 
    else {
       res.render("login")
      }
  });


router.post('/login', async (req,res)=> {
  user = await req.body
  console.log(user)
  finduser = null
  for (i = 0; i < userData.length; i++){
    if (req.body.username == userData[i].username){
      finduser = userData[i]
      break
    }
  }
  temp = false
  if (finduser !== null) {
    temp = await bcrypt.compare(req.body.password,finduser.hashedPassword)
    if (temp == true) {
      req.session.user = req.body.username;
    }
    if (temp == false)
    {
      res.status(401).render("login", {error: " Invalid Entry of Username and Password"})
    }
  } else {
    res.status(401).render("login", {error: " Invalid Entry of Username and Password"})
  }
});

let checkAuth = (req, res, next)=> {
  if (req.session.user) {
    next()
  }
  else{
    res.status(403).render("noAccess");
  }
}


router.get('/private', checkAuth, async (req,res) => {
  console.log("reached private")
  const user = req.session.user
  if(user) {
    for (i = 0; i<= userData.length; i++) {
      if(user == userData[i].username){
        res.render('info', {
          username: userData[i].username,
          firstName: userData[i].firstName,
          lastName: userData[i].lastName,
          profession: userData[i].profession,
          bio: userData[i].bio
        })
        break
      }
    }
  } else res.status(403).render("noAccess");
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.clearCookie('AuthCookie')
    res.render('logout')
  });

module.exports = router;