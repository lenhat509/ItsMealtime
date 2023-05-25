import request from "supertest";
import { app } from "../../app"

it("expect a successful signup with code 201", async () => {
    const email = "nhat@gmail.com"
    const password = "123456789"

    await global.signup(email, password)
})

it("expect 400 error for using existing email", async () => {
    const email = "nhat@gmail.com"
    const password = "12345678"

    await global.signup(email, password)
    
    return request(app)
    .post("/api/user/signup")
    .send({
        email,
        password
    })
    .expect(400)
})

it("expect 400 error for invalid password", async () => {
    return request(app)
    .post("/api/user/signup")
    .send({
        email: "nhat@gmail.com",
        password: "1234567"
    })
    .expect(400)
})

it("expect 400 error for invalid email", async () => {
    return request(app)
    .post("/api/user/signup")
    .send({
        email: "nhatgmail.com",
        password: "12345678"
    })
    .expect(400)
})