var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");

//COMMENTS NEW

router.get("/new", isLoggedIn, function(req, res){
  //FIND CAMPGROUND BY ID
  console.log(req.params.id);
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
       res.render("comments/new", {campground: campground});
    }
  })
});

//COMMENTS CREATE
router.post("/",isLoggedIn,function(req, res){
   //LOOKUP CAMPGROUND USING ID
   Campground.findById(req.params.id, function(err, campground) {
       if(err){
         console.log(err);
         res.redircet("/campgrounds");
       } else {
         console.log(req.body.Comment);
        Comment.create(req.body.comment, function(err,comment){
          if(err){
            console.log(err);
          } else {
            //ADD USERNAME AND ID TO  COMMENT
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //SAVE COMMENT
            comment.save();
            campground.comments.push(comment)
            campground.save();
            console.log(comment);
            res.redirect('/campgrounds/' + campground._id);
          }
        });
       }
   });
   
});
//MIDDLEWARE
function  isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;