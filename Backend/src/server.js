import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from './models/user.model.js';
import UserController from './controllers/user.controller.js';
import ChatController from './controllers/chat.controller.js';
import { asyncHandler } from './utils/handlers.js';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import { default as connectMongoDBSession } from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
	uri: 'mongodb://mongo:27017/parabola',
	collection: 'sessions'
});
const port = 3001;

export const app = express();
export const httpServer = http.createServer(app);
export const io = socketio(httpServer);

export default class ParabolaApp {

	constructor() {
		try{
			mongoose.connect('mongodb://mongo:27017/parabola', 
				{ useNewUrlParser: true, useUnifiedTopology: true }, 
				err => {
					if(err) console.log('MongoDB Error');
				}
			);
		}catch(err){
			console.log('Connection to MongoDB Failed\n',err);
		}
		mongoose.set('useCreateIndex', true);
		mongoose.set('useFindAndModify', false);
		mongoose.connection.on('error', err => {
			console.log(err);
		});
		app.enable('trust proxy');
		app.use(bodyParser.json());
		app.use(cookieParser());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(
			session({
				secret: 'wanna lick some icecream',
				proxy: true,
				cookie: { secure: false },
				//NEVER use in-memory store for production - I'm using mongoose/mongodb here
				store: store,
				resave: false,
				saveUninitialized: false,
			}),
		);
		app.use(cors({
			credentials: true,
			origin: 'http://localhost:3000',
		}));
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
					const user = await User.findOne({ username: username });
					if (!user) {
						return done(null, false);
					}
					else if (password !== user.password) {
						return done(null, false);
					}
					return done(null, user);
				}
			)
		);

		app.get('/', (req, res) => {
			res.send('Hello World!');
		});

		//----------------- user routing -----------------    
		app.post('/login', passport.authenticate('local'), async (req, res) => {
			// await io.emit('loggedin');
			// console.log(req)
			res.json({ status: 'success' });
		});
		app.get('/whoami', UserController.ensureLoggedIn, UserController.whoami);
		app.post('/register', asyncHandler(UserController.createUser));
		app.get('/logout', async (req, res) => {
			await req.logout();
			res.json({ status: 'success' });
		});
		//////////////////////////////////////////////////

		//----------------- chat routing -----------------    
		app.post('/createroom', UserController.ensureLoggedIn, ChatController.createChatRooom);
		app.get('/getallroom', UserController.ensureLoggedIn, ChatController.getAllChatRoom);
		//////////////////////////////////////////////////


		httpServer.listen(port, () => {
			console.log('Parabola listening on port', port);
		});

		io.on('connection', (socket) => {
			console.log('client connected');
			//on `join room` event
			socket.on('join room', (data) => {
				try {
					data = JSON.parse(data);
					console.log('join room request from', data.userId, 'to room', data.roomId);
					ChatController.joinChatRoom(data.userId, data.roomId).then((messages) => {
						socket.emit('previous message', messages);
						socket.userId = data.userId;
						socket.join(data.roomId);
						console.log('join room succeeded');
					}).catch(err => {
						console.log('join room failed', err);
					});
				} catch (err) {
					console.log('parse failed');
				}

			});
			//on `leave room` event
			socket.on('leave room', (data) => {
				try {
					data = JSON.parse(data);
					console.log('leave room request from', data.userId, 'to room', data.roomId);
					ChatController.leaveChatRoom(data.userId, data.roomId).then(() => {
						socket.leave(data.roomId);
						console.log('leave room succeeded');
					}).catch(err => {
						console.log('leave room failed', err);
					});
				} catch (err) {
					console.log('parse failed');
				}

			});

			//on `chat message` event
			socket.on('chat message', (data) => {
				//record time at which a message arrived at the server
				const timestamp = new Date();
				try {
					data = JSON.parse(data);
					console.log('recv:', data.roomId, data.userId, data.message);
					socket.to(data.roomId).emit('chat message', {
						roomId: data.roomId,
						userId: data.userId,
						message: data.message
					});

					//Save message to MongoDB for getUnread
					ChatController.saveMessageToChatRoom(data.userId, data.roomId, data.message, timestamp)
						.then(() => {
							console.log('chat message save success');
						}).catch(err => {
							console.log('chat message save failed', err);
						});
				} catch (err) {
					console.log('parse failed');
				}
			});

			//on `client disconnect` event
			socket.on('disconnect', () => {
				console.log('client disconnected');
			});
		});

	}
}