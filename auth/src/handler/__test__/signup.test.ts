import request from "supertest";
import { app } from "../../app"

it("expert a successful signup with code 201", () => {
    return request(app)
    .post("/api/user/signup")
    .send({
        email: "nhat@gmail.com",
        password: "123456789"
    })
    .expect(201)
})