    import express from 'express'
    import cookieParser from 'cookie-parser'
    import dotenv from 'dotenv'
    import mongoose from 'mongoose'
    import userRoute from './routes/user.route.js'
    import cors from 'cors'
    import messageRoute from './routes/message.route.js'
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser(
  
));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3011', // Your frontend origin
  methods: 'GET,POST',
  allowedHeaders: 'Authorization,Content-Type',
  credentials: true
}));

const PORT=process.env.PORT || 3002;
const URI=process.env.MONGODB_URI;
try{
    mongoose.connect(URI);
    console.log("db connected");
}
catch(e){
console.log("error",e);
}

app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})