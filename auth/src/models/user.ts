import mongoose, { Schema } from "mongoose";

interface UserAttrs {
    email: string,
    password: string,
    avatar: string
}

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    avatar: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
})

userSchema.statics.build = function (attrs: UserAttrs) {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)


export { User }