import { expect } from "chai";
import supertest from "supertest";
import 'dotenv/config'; // Load environment variables from .env file


const request = supertest(`http://localhost:${process.env.PORT}/api`);
let newProductId = 0; // Initialize newproductid to 0
describe('TESTING: Products API Tests',
    () => {
        it('POST /products should create a product',
            async () => {
                const product = {
                    title: 'Test Product - Supertest',
                    price: 100,
                    stock: 50,
                    onsale: false,
                };
                const response = await request.post('/products').send(product);
                const { status, _body } = response;
                newProductId = response._body.response._id; // Store the created product ID for later tests
                expect(status).to.equal(201);
                expect(_body.response).to.have.property('title', product.title);
                expect(_body.response).to.have.property('price', product.price);
                expect(_body.response).to.have.property('stock', product.stock);
                expect(_body.response).to.have.property('onsale', product.onsale);
            }
        ); // end of POST test
        it(
            'GET /products should retrieve all products',
            async () => {
                const response = await request.get('/products');
                const { status, _body } = response;
                expect(status).to.equal(200);
                expect(_body.response).to.be.an('array');
                expect(_body.response.length).to.be.greaterThan(0);
            }
        )
        // get product by id using newProductId
        it(
            'GET /products/:id should retrieve a product by ID',
            async () => {
                const response = await request.get(`/products/${newProductId}`);
                const { status, _body } = response;
                expect(status).to.equal(200);
                expect(_body.response).to.have.property('_id', newProductId);
            }
        )
        // delete product by id using newProductId
        it(
            'DELETE /products/:id should NOT delete a product by ID',
            async () => {
                const response = await request.delete(`/products/${newProductId}`);
                const { status } = response;
                expect(status).to.equal(401);
            }
        ); // end of DELETE test

        it(
            'PUT /products/:id should update a product by ID',
            async () => {
                const updatedProduct = {
                    title: 'Updated Test Product - UT',
                    price: 150,
                    stock: 60,
                    onsale: true,
                };
                const response = await request.put(`/products/${newProductId}`).send(updatedProduct);
                const { status, _body } = response;
                expect(status).to.equal(200);
                expect(_body.response).to.have.property('title', updatedProduct.title);
                expect(_body.response).to.have.property('price', updatedProduct.price);
                expect(_body.response).to.have.property('stock', updatedProduct.stock);
                expect(_body.response).to.have.property('onsale', updatedProduct.onsale);
            }
        ); // end of PUT test

    }
); //end of describe block

