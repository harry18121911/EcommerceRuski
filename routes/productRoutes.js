import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import  formidable  from 'express-formidable'
import { createOrder, receiveWebhook } from '../controllers/paymentController.js'
const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin,formidable(),  createProductController)

//update-product
router.put('/update-product/:pid', requireSignIn, isAdmin,formidable(),  updateProductController)

//get products
router.get('/get-product', getProductController)

//get single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post('/product-filters', productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get('/search/:keyword', searchProductController)

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController)

//payment routes


router.post('/cart/create-order', createOrder)
router.get('/cart/success', (req, res) => res.send('success'))
router.get('/cart/failure', (req, res) => res.send('failure'))
router.get('/cart/pending', (req, res) => res.send('pending'))

router.post('/webhook', receiveWebhook)


export default router