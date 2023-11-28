const express = require('express')
const {postProduct,
       deleteProduct,
       getProduct,
       getproductId,
       getUserProducts,
       updateProduct} = require('../controllers/ProductController')


const router = express.Router()


router.get("/get", getProduct);

router.get("/each", getUserProducts)

router.get('/:id', getproductId);

router.post("/post", postProduct);

router.delete('/:id', deleteProduct);
  
router.patch('/:id', updateProduct);


module.exports=router