import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import session from "express-session";
import passport from "./config/passport.js";

const app = express()
const port = process.env.PORT || 4000

connectDB();

app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser())
app.use(cors({
  origin: 'https://shivagreen-frontend.onrender.com',  // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // allow cookies
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.json())

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Ha chl rha h')
})


app.listen(port, () => {
    console.log(`Backend chl rha h is wale port pe : ${port}`)
})