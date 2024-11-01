import dotenv from "dotenv"

dotenv.config();

export default {
    PORT_APP: process.env.PORT,
    FIREBASE_REALTIME_URL: process.env.FIREBASE_REALTIME_URL || "",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
    PUBLIC_kEY: process.env.PUBLIC_KEY || ""    
}