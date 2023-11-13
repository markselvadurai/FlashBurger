// create a random jwt secret with a cryptographically random string
import crypto from 'crypto'
const random = crypto.randomBytes(32)
const jwtSecret = crypto.randomBytes(32).toString('hex');


const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || jwtSecret, 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://smardan1:zloyG8p3imjubnnW@flashburgerhouse.ugvoe94.mongodb.net/User?retryWrites=true&w=majority"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
    '/flashburger' 
    }
    export default config
    