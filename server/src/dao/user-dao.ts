import User from "../models/user-model";
import bcrypt from "bcryptjs";
import Authorization from "../middleware/auth";

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    location: {
        coordinates: string
    }
}

interface LoginRequest {
    email: string;
    password: string;
}

class AuthDao {
    private middleware: Authorization;
    constructor() {
        this.middleware = new Authorization();
    }

    async registerUser(data: RegisterRequest) {
        const { name, email, password, location } = data;

        const existing = await User.findOne({ email });
        if (existing) throw new Error("Email already exists");

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            location: {
                type: "Point",
                coordinates: location.coordinates
            }
        });

        return user;
    }

    async loginUser(data: LoginRequest) {
        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid Email or Password");

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error("Invalid Email or Password");

        const token = this.middleware.jwtSign(user);

        const { passwordHash, ...userData } = user;
        return { token, user: userData };
    }
}

export default AuthDao;
