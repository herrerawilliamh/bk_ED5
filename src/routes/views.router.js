/*IMPORTS*/
const express = require('express');
const ProductManager = require('../dao/ProductManager');

/*VARS*/
const router = express.Router();
const productManager = new ProductManager();

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realtimeproducts', {title: "WILLY Ecommerce - RealTime", products: products} )
});

router.post('/realtimeproducts', async (req, res) => {
   const {title, description, price, thumbnail, code, stock} = req.body; 
   try {
    const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);
    io.emit('product-created', newProduct);
    res.redirect('/realtimeproducts');
   } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al crear el producto');
   }
});

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};

const checkNotAuth = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/profile");
    } else {
        next();
    }
};

router.get("/login", checkNotAuth, (req, res) => {
    res.render("login");
});

router.get("/register", checkNotAuth, (req, res) => {
    res.render("register");
});
router.get('/profile', (req, res) => {
    const { first_name, last_name, email, age } = req.session.user
    res.render('profile', {title: "WILLY Ecommerce - Profile", first_name, last_name, email, age});
})

module.exports = router;