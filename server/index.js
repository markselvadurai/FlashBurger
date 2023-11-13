import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import userCtrl from './routes/userRoutes.js'
import compress from 'compression'
import morgan from 'morgan'
import authRoute from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compress());

app.use('/', userCtrl);
app.use('/', authRoute);

//used to handle errors thrown by the expressJWT when validating JWT tokens
app.use((err, req, res,next) =>{
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({'error': err.name + ': ' + err.message});
    }
    else if(err){
        res.status(400).json({'error': err.name + ': ' + err.message});
    }
    console.log(err);
});

export default app;