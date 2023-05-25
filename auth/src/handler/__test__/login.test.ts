import request from "supertest"
import { app } from "../../app"

it("expect successful login with code 200", async () => {
    const email = "nhat@gmail.com"
    const password = "12345678"

    await global.signup(email, password)
    await global.signin(email, password)
})

it("expect unsuccessful login with code 400, incorrect email", async () => {
    const email = "nhat@gmail.com"
    const password = "12345678"

    await global.signup(email, password)

    return request(app)
    .post("/api/user/login")
    .send({
        email: "nhat1@gmail.com",
        password
    })
    .expect(400)
})

it("expect unsuccesful login with code 400, incorrect password", async () => {
    const email = "nhat@gmail.com"
    const password = "12345678"

    await global.signup(email, password)

    return request(app)
    .post("/api/user/login")
    .send({
        email,
        password: "1234567"
    })
    .expect(400)
})

it("expect token in cookie after succesful login", async () => {
    const email = "nhat@gmail.com"
    const password = "12345678"

    await global.signup(email, password)

    const response = await global.signin(email, password)

    console.log(response.body)

    expect(response.get("Set-Cookie")[0]).toBeDefined()
})