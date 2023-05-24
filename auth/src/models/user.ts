import mongoose, { Schema } from "mongoose";
import { Password } from "../utilites/password";

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
    }, 
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret.password
                delete ret._id
                delete ret.__v
            }
        }
    })

userSchema.pre('save', function(done) {
    if(this.isModified()) {
        const hash = Password.hash(this.get('password'))
        this.set('password', hash)
    }
    done()
})

userSchema.statics.build = function (attrs: UserAttrs) {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)


export { User }