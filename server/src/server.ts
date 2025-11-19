import app from "./app";
import { PORT } from "./utils/config";

if (PORT) {
    app.listen(PORT, () => console.log(`Server is running on:- http://localhost:${PORT}`));
} else {
    console.log('PORT is not specified in the environment variables.');
}
