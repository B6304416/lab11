const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
const url = 'mongodb://127.0.0.1:27017/db_it'; 
const config = {
    useUnifiedTopology: true,
    autoIndex: true,
    useNewUrlParser: true,
};
var Schema = require("mongoose").Schema;
const userSchema = Schema({
    type: String,
    id: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String,
}, {
    collection: 'products',
}
);
let Product;
try {
    // Product = mongoose.model('products');
    Product = mongoose.model('products');
} catch (error) {
    Product = mongoose.model('products', userSchema);
}

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
});
expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoDB...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MongoDB');
            res.status(501).send('Cannot connect to MongoDB')
        });
});
// const addProduct = (productData) => {
//     return new Promise((resolve, reject) => {
//         var new_product = new Product(productData);
//         new_product.save((err, data) => {
//             if (err) {
//                 reject(new Error('Cannot insert product to DB!'));
//             } else {
//                 resolve({ message: 'Product added successfully' });
//             }
//         });
//     });
// }
const addProduct = (productData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();
            resolve({ message: 'Product added successfully', product: savedProduct });
        } catch (err) {
            reject(new Error('Cannot insert product to DB!'));
        }
    });
}


// const getProducts = () => {
//     return new Promise((resolve, reject) => {
//         Product.find(), (err, data) => {
//             if (err) {
//                 reject(new Error('Cannont get products!'));
//             } else {
//                 if (data) {
//                     resolve(data)
//                 } else {
//                     reject(new Error('Cannont get products!'));
//                 }
//             }
//         }
//     });
// }
const getProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Product.find();
            resolve(data);
        } catch (err) {
            reject(new Error('Cannot get products: ' + err.message));
        }
    });
}


expressApp.post('/products/add', (req, res) => {
    console.log('add');
    addProduct(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.get('/products/get', (req, res) => {
    console.log('get');
    getProducts()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});
expressApp.listen(3000, function () {
});
console.log('Listening on port 3000');