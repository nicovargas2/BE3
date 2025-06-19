import 'dotenv/config'; // Load environment variables from .env file
import { expect } from "chai";
import { productsManager } from '../../src/dao/managers/mongo.manager.js';
import dbConnect from '../../src/helpers/dbConnect.helper.js';
import logger from "../../src/helpers/logger.helper.js"; //para manejar los logs


describe('TESTING: Products Manager Tests', () => {
    before(async () => {
        await dbConnect(process.env.LINK_DB_LOCAL);
        logger.INFO('running Chai tests for productsManager');
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
        expect(createdProduct).to.have.property('title', product.title);
        expect(createdProduct).to.have.property('price', product.price);
        expect(createdProduct).to.have.property('stock', product.stock);
        expect(createdProduct).to.have.property('onsale', product.onsale);
    }); // end of POST test

    it('POST /api/products should NOT create a product',
        async () => {
            try {
                await productsManager.createOne({});
                // Si no lanza error, forzamos fallo
                expect.fail('Debería lanzar un error de validación');
            } catch (error) {
                expect(error).to.have.property('errors');
                expect(error.errors).to.have.property('title');
                expect(error.errors.title.message).to.equal('Path `title` is required.');
            }
        }); // end of POST test

    it('GET /api/products should read all products', async () => {
        const products = await productsManager.readAll({});
        expect(products).to.be.an('array');
        expect(products.length).to.be.greaterThan(0);
    }); // end of read all products test

    it('GET /api/products should NOT read any product', async () => {
        const products = await productsManager.readAll({ title: 'Nonexistent Product' });
        expect(products).to.be.an('array');
        expect(products.length).to.equal(0);
    }); // end of read all products test


    // Note: Replace 'someProductId' with an actual product ID from your database for the tests to work correctly.
    it('GET /api/products/:id should read a product by ID', async () => {
        //const product = await productsManager.readById('someProductId');
        const product = await productsManager.readById(productId);
        expect(product).to.exist;
        expect(product).to.have.property('_id');
    }); // end of read by ID test

    it('PUT /api/product/:id should update a product', async () => {
        const updatedData = { price: 999 };
        //const updatedProduct = await productsManager.updateONe('someProductId', updatedData);
        const updatedProduct = await productsManager.updateONe(productId, updatedData);
        expect(updatedProduct).to.have.property('price', updatedData.price);
    }); // end of update product test

    it('DELETE api/products/:id should delete a product', async () => {
        //const deletedProduct = await productsManager.destroyOne('someProductId');
        await productsManager.destroyById(productId);
        const deletedProduct = await productsManager.readById(productId);
        expect(deletedProduct).to.not.exist;
    }); // end of delete product test

} //end of describe block
); // end of productsManager tests
