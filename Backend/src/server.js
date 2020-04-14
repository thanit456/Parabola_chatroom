import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from './models/user.model.js';
import UserController from './controllers/user.controller.js';
import ChatController from './controllers/chat.controller.js';
import { asyncHandler } from './utils/handlers.js';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import session from 'express-session';
import http from 'http';
import socketio from 'socket.io';

const port = 8080;

export default class ParabolaApp {
    
    constructor() {
        const app = express();
        const httpServer = http.createServer(app);
        try{
            mongoose.connect('mongodb://mongo:27017/parabola', { useNewUrlParser: true });
        }catch(err){
            console.log('Connection to MongoDB Failed\n',err);
        }
        mongoose.connection.on('error', err => {
            cosole.log(err);
        });

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
            // res.send('Hello World!');
            res.sendFile('/usr/src/app/src/test_socket/index.html');
        });
        //----------------- user routing -----------------    
        app.post('/login', passport.authenticate('local'), (req, res) => {
            res.json({ status: "success" });
        });

        app.get('/whoami', UserController.ensureLoggedIn,UserController.whoami);

        app.post('/register', asyncHandler(UserController.createUser));

        app.get('/logout', async (req, res) => {
            await req.logout();
            res.json({ status: "success" });
        });
        //////////////////////////////////////////////////

        //----------------- chat routing -----------------    
        app.post('/createroom', UserController.ensureLoggedIn, ChatController.createChatRooom);
        app.get('/join', UserController.ensureLoggedIn, ChatController.joinChatRoom);

        //////////////////////////////////////////////////
        
        
        httpServer.listen(port, () => {
            console.log('Parabola listening on port',port);
        });

        //TODO: SOCKET IO
        const io = socketio(httpServer);
        io.on('connection', function(socket){
            console.log('a user connected');
            //on `chat message` event
            socket.on('chat message', function(msg){
                console.log('message: ' + msg);

                //Save message to MongoDB

            });
            //on client disconnect event
            socket.on('disconnect', function(){
                console.log('user disconnected');
            });
        });

    }
}