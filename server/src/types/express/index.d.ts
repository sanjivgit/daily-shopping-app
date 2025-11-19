import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload; // or your custom type
            vendor?: string | JwtPayload; // or your custom type
        }
    }
}
