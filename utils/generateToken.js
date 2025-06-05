import JWT from "jsonwebtoken";

export function generateToken(userId) {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT secret key is not defined");
    }
    const token = JWT.sign({ id: userId }, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION || "7d", // Default to 7 days if not specified
    });
    return token;
}
