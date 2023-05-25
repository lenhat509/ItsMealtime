import request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app"

let mongo: MongoMemoryServer | undefined

beforeAll(async () => {
    process.env.JWT_SECRET = "hg83g0bnwhgobs5d83905bsyw92nd"
    const mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()
    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) 
        await collection.deleteMany({})
})

afterAll(async () => {
    if(mongo) {
        await mongo.stop()
    }
    await mongoose.connection.close()
})

declare global {
    var signin: (email: string, password: string) => Promise<request.Response>
    var signup: (email: string, password: string) =>  Promise<request.Response>
}

global.signin = async (email: string, password: string) => {
    return request(app)
    .post("/api/user/login")
    .send({
        email,
        password
    })
    .expect(200)
}

global.signup = async (email: string, password: string) => {
    return request(app)
    .post("/api/user/signup")
    .send({
        email,
        password
    })
    .expect(201)
}