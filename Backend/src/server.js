import express from 'express';
import mongoose from 'mongoose';
import io from 'socket.io';
import passport from 'passport';
import User from './models/user.model.js';
import UserController from './controllers/user.controller.js';
import { asyncHandler } from './utils/handlers.js';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import session from 'express-session';

const port = 3001;

export default class ParabolaApp {
    
    constructor() {
        const app = express();
        try{
            mongoose.connect('mongodb://mongo:27017/parabola', { useNewUrlParser: true });
        }catch(err){
            console.log('Connection to MongoDB Failed\n',err);
        }
        mongoose.connection.on('error', err => {
            console.log(err);
        });

        //TODO: SOCKET IO
        // io.on('connection', function(socket){
        //     console.log('a user connected');
        // });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(
            session({
                secret: 'wanna lick some icecream',
                resave: false,
                saveUninitialized: false,
            }),
        );
        passport.serializeUser(async (user, done) => {
            return done(null, user.username);
        });
        passport.deserializeUser(async (username, done) => {
            const user = await User.findOne({ username: username });
            return done(null, user);
        });

        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'username',
                    passwordField: 'password',
                },
                async (username, password, done) => {
                    console.log(username, password);
                    const user = await User.findOne({ username: username });
                    if(!user){
                        return done(null, false);
                    }
                    else if (password !== user.password){
                        return done(null, false);
                    }
                    return done(null, user);
                }
            )
        );


        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        
        app.post('/login', passport.authenticate('local'), (req, res) => {
            res.json({ status: "success" });
        });

        app.get('/whoami', UserController.ensureLoggedIn,UserController.whoami);

        app.post('/register', asyncHandler(UserController.createUser));

        app.get('/logout', async (req, res) => {
            await req.logout();
            res.json({ status: "success" });
        });

        app.listen(port, () => {
            console.log('Parabola listening on port',port);
        });

    }
}