var mongoose   = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment    = require("./models/comment");

var data = [

      {   
    name: "GROSSGLOCKNER", 
    image: "https://images.unsplash.com/photo-1498855926480-d98e83099315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Quisque elit nibh Nunc et porta metus. Nulla gravida ipsum eu ante vehicula, sit amet aliquam tellus gravida. Integer pulvinar, purus a tristique maximus, eros ligula egestas metus, at convallis nibh velit eu quam. Sed eget feugiat enim. Nam sed fermentum est. Phasellus dignissim libero justo" 
      },
      {   
    name: "KITZSTEINHORN", 
    image: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Quisque elit nibh Nunc et porta metus. Nulla gravida ipsum eu ante vehicula, sit amet aliquam tellus gravida. Integer pulvinar, purus a tristique maximus, eros ligula egestas metus, at convallis nibh velit eu quam. Sed eget feugiat enim. Nam sed fermentum est. Phasellus dignissim libero justo"
      }
]

function seedDB() {
    
//REMOVE ALL CAMPGROUNDS 


  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    
    }
    console.log("removed campgrounds!");
    // ADD A FEW CAMPGROUNDS
   
  data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err)
          } else {
              console.log("added a campgrounds");
              //CREATE A COMMENT
              Comment.create(
                  {
                      text: "This Place Is Great, But I Wish There Was Internet",
                      author: "Homer"
                  }, function(err, comment){
                      if(err){
                          console.log(err);
                      } else {
                          
                          campground.comments.push(comment);
                          campground.save();
                          console.log("Created New Comment");
                          
            }
        });
        }
    });
  });
    
});
 
// // ADD A FEW COMMENTS
  }




module.exports = seedDB;


