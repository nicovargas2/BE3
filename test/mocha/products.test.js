import 'dotenv/config'; // Load environment variables from .env file
import assert from 'assert';
import { describe, it } from 'mocha';
import { productsManager } from '../../src/dao/manager.mongo.js';
import dbConnect from '../../src/helpers/dbConnect.helper.js';
import logger from "../../src/helpers/logger.helper.js"; //para manejar los logs

describe('TESTING: Products Manager Tests', () => {
    before(async () => {
        await dbConnect(process.env.LINK_DB_LOCAL);
        logger.INFO('running Mocha tests for productsManager');
    });

    let productId = null;

    it('POST /api/products should create a product', async () => {
        const product = {
            title: 'Test Product - UT',
            description: 'This is a test product',
            category: 'Virtual Reality',
            image: 'http://example.com/image.jpg',
            price: 100,
            stock: 50,
            onsale: true
        };
        const createdProduct = await productsManager.createOne(product);
        productId = createdProduct._id; // Store the created product ID for later tests
        assert.strictEqual(createdProduct.title, product.title);
    }); // end of POST test

    it('POST /api/products should NOT create a product',
        async () => {
            try {
                const response = await productsManager.createOne({});
            } catch (error) {
                assert.ok(error.errors);
                assert.strictEqual(error.errors.title.message, 'Path `title` is required.');
            }
        }); // end of POST test

    it('GET /api/products should read all products', async () => {
        const products = await productsManager.readAll({});
        assert(Array.isArray(products));
        assert.ok(products.length > 0);
    }); // end of read all products test


    // Note: Replace 'someProductId' with an actual product ID from your database for the tests to work correctly.
    it('GET /api/products/:id should read a product by ID', async () => {
        //const product = await productsManager.readById('someProductId');
        const product = await productsManager.readById(productId);
        assert(product);
    }); // end of read by ID test

    it('PUT /api/product/:id should update a product', async () => {
        const updatedData = { price: 999 };
        //const updatedProduct = await productsManager.updateONe('someProductId', updatedData);
        const updatedProduct = await productsManager.updateONe(productId, updatedData);
        assert.strictEqual(updatedProduct.price, updatedData.price);
    }); // end of update product test

    it('DELETE api/products/:id should delete a product', async () => {
        //const deletedProduct = await productsManager.destroyOne('someProductId');
        const deletedProduct = await productsManager.destroyOne(productId);
        assert(deletedProduct);
    }); // end of delete product test

} //end of describe block
); // end of productsManager tests
