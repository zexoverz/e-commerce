const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);



describe('User Testing', () => {

    describe('LoginSuccess', () => {
        it("it should success to login", () => {
            return chai.request(app)
                .post("/user/login")
                .send({
                    email: "rendo@gmail.com",
                    password: "1234"
                })
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    throw err
                })
        })
    });





    // describe('RegisterSuccess', () => {
    //     it("it should success to create a user", () => {
    //         return chai.request(app)
    //             .post("/user/register")
    //             .send({
    //                 name: "royhan",
    //                 email: "royhan@gmail.com",
    //                 password: "1234"
    //             })
    //             .then(res => {
    //                 expect(res).to.have.status(201);
    //                 expect(res.body).to.have.property("email");
    //                 expect(res.body).to.have.property("password");
    //             })
    //             .catch((err) => {
    //                 throw err
    //             })
    //     })

    // });


    describe('LoginError', () => {
        it("it should Error to login", () => {
            return chai.request(app)
                .post("/user/login")
                .send({
                    email: "rendo2",
                    password: "1234"
                })
                .then((err) => {
                    expect(err).to.have.status(400);
                })
                .catch(err => {
                    throw err
                })
        })
    });


    describe('RegisterError', () => {
        it("it should error to create a user", () => {
            return chai.request(app)
                .post("/user/register")
                .send({
                    name: "rendo",
                    email: "",
                    password: "1234"
                })
                .then((err) => {
                    expect(err).to.have.status(400);
                })
                .catch((err) => {
                    throw err
                })
        })

    });


    describe('RegisterError2', () => {
        it("it should error to create a user", () => {
            return chai.request(app)
                .post("/user/register")
                .send({
                    name: "rendo",
                    email: "rendo123",
                    password: "1234"
                })
                .then((err) => {
                    expect(err).to.have.status(400);
                })
                .catch((err) => {
                    throw err
                })
        })

    });

    describe('RegisterError3', () => {
        it("it should error to create a user", () => {
            return chai.request(app)
                .post("/user/register")
                .send({
                    name: "rendo",
                    email: "rendo@gmail.com",
                    password: "1234"
                })
                .then((err) => {
                    expect(err).to.have.status(500);
                })
                .catch((err) => {
                    throw err
                })
        })

    });



});