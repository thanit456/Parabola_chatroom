import express from 'express';
import mongoose from 'mongoose';
import io from 'socket.io';
import User from './models/user.model.js';
const port = 8080;

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
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'username',
                    passwordField: 'password',
                },
                (email, password, done) => {
                    const user = await User.findOne({ username });
                    if(!user){
                        return done(null, false);
                    }
                    else if (pasword !== user.password){
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

        app.get('/profile',
            passport.authenticate('basic', { session: false }),
            function(req, res) {
            res.json(req.user);
        });

        app.get('/logout', (req, res) => {
            req.json({ status: "success" });
        });

        app.listen(port, () => {
            console.log('Parabola listening on port',port);
        });

    }
}