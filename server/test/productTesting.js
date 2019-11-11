const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);


describe('Product Testing', () => {

    describe('getAllProduct', () => {
        it("it should get all data product", () => {
            return chai.request(app)
                .get("/product")
                .then(res => {
                    expect(res).to.have.status(200);
                })
        })
    });


    describe('createProduct', () => {
        it("it should success create a product", () => {
            return chai.request(app)
                .post("/product")
                .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzkzMTY0MTdhZDY5MDk1NDIzZTgzOCIsImlhdCI6MTU3MzQ2NjQ5NH0.yAlMkrVMM7rFfOBJjR9w_M72euHUbyU_629mvMfrmQA")
                .send({
                    name: "chocolate Ice Cream",
                    price: 20,
                    img: "https://images.pexels.com/photos/40819/ice-cream-dessert-cold-beverages-40819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                })
                .then(res => {
                    expect(res).to.have.status(201);
                })
                .catch(err => {
                    throw err
                })
        })
    });


    describe('updateProduct', () => {
        it("it should success update a product", () => {
            return chai.request(app)
                .put("/product/5dc9320217ad69095423e839")
                .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzkzMTY0MTdhZDY5MDk1NDIzZTgzOCIsImlhdCI6MTU3MzQ2NjQ5NH0.yAlMkrVMM7rFfOBJjR9w_M72euHUbyU_629mvMfrmQA")
                .send({
                    name: "coconut butter ice cream",
                    price: 35
                })
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    throw err
                })
        })
    });


    describe('deleteProduct', () => {
        it("it should success delete a product", () => {
            return chai.request(app)
                .delete("/product/5dc9320217ad69095423e839")
                .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzkzMTY0MTdhZDY5MDk1NDIzZTgzOCIsImlhdCI6MTU3MzQ2NjQ5NH0.yAlMkrVMM7rFfOBJjR9w_M72euHUbyU_629mvMfrmQA")
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    throw err
                })
        })
    });





});