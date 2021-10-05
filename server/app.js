/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/

//Using Express to handle requests to server
var express = require('express');
var app = express();
const data = require('./data');
var PORT = 3035;

//Extending the String type to add "toProperCase" function
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
 
//In this example requests are made to the root (no specific endpoint)
app.get('/', function(req, res){
    //Grab the search query parameter from request and convert it to Proper Case to match the format given in the data
    let search = req.query.search.toProperCase();
    //Filters only the active items
    let activeItems = data.filter(item => item.isActive == "true");
    //Filters only the items that contain the search query (searches the name and tags of the products)
    let results = activeItems.filter(item => item.name.includes(search) || item.tags.includes(req.query.search));
    //Header to accept requests from the front-end in localhost:3030
    res.header("Access-Control-Allow-Origin", "http://localhost:3030");
    //Return the results
    res.json(results);
});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
