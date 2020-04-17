import HttpErrors from 'http-errors';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import ChatRoom from '../models/chatroom.model.js';
import ChatMessage from '../models/chatmessage.model.js';
import { httpServer, io } from '../server.js';

export default class ChatController {

	static async createChatRooom(req, res){
		if(!req.body.roomname){
			//roomname is null or undefined
			throw new HttpErrors.BadRequest('Roomname is null or undefined');
		}
		const new_room = new ChatRoom({
			roomname: req.body.roomname,
			createTime: new Date()
		});
		await new_room.save();
		res.json({ status: 'success' });
	}

	static async joinChatRoom(userId, roomId){
		const chatroom = await ChatRoom.findById(roomId);
		if(!chatroom){
			throw new HttpErrors.NotFound('Chatroom does not exist');
		}
		const user = await User.findById(userId);
		if(!user){
			throw new HttpErrors.Unauthorized('User does not exist.');
		}
		console.log('wants to join room:',chatroom.roomname);
		const messages = await ChatController.getAllMessageFromChatRoom(roomId);
		return messages;
	}

	static async leaveChatRoom(userId, roomId){
		const chatroom = await ChatRoom.findById(roomId);
		if(!chatroom){
			throw new HttpErrors.NotFound('Chatroom does not exist');
		}
		const user = await User.findById(userId);
		if(!user){
			throw new HttpErrors.Unauthorized('User does not exist.');
		}
		console.log('wants to leave room:',chatroom.roomname);
		//OPTIONAL: in case we want to store joined participants or update DB, however, it is unnecessary for now
        
	}

	static async getAllChatRoom(req, res){
		const chatrooms = await ChatRoom.find({}).select('-createTime');
		res.json(chatrooms);
	}

	static async getAllMessageFromChatRoom(roomId){

		const chatroom = await ChatRoom.findById(roomId);
		if(!chatroom){
			throw new HttpErrors.NotFound('Chatroom does not exist');
		}
		const messages = await ChatMessage.find({ chatroomId: chatroom._id });
		return messages;
	}

	static async saveMessageToChatRoom(userId, roomId, message, timestamp){
		const chatroom = await ChatRoom.findById(roomId);
		if(!chatroom){
			throw new HttpErrors.NotFound('Chatroom does not exist');
		}
		const user = await User.findById(userId);
		if(!user){
			throw new HttpErrors.Unauthorized('User does not exist.');
		}
		const chatmessage = new ChatMessage({
			chatroomId: new mongoose.Types.ObjectId(roomId),
			userId: new mongoose.Types.ObjectId(userId),
			message: message,
			timestamp: timestamp
		});
		await chatmessage.save();
	}


}