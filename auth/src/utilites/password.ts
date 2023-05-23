import bcrypt from "bcryptjs"

export class Password {
    private static ROUNDS = 10
    private static PEPPER = "jf730rhc7ejfdhsgcifbswts7ritnb"

    public static hash(password: string): string {
        const SALT = bcrypt.genSaltSync(Password.ROUNDS)
        return bcrypt.hashSync(password + Password.PEPPER, SALT)
    }

    public static compare(password: string, hash: string): boolean {
        return bcrypt.compareSync(password + Password.PEPPER, hash)
    }
}