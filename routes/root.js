const express = require('express'); 
const router = express.Router(); 
const path = require('path'); 


router.get('/{index{.html}}', (req, res) => {//any get request that looks for the root '/' (index) and runs the function. res means response
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); //join at root, then views, then index
})

module.exports = router;