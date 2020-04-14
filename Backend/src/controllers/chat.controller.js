import HttpErrors from 'http-errors';
import Types from 'mongoose';
import User from '../models/user.model.js';
import ChatRoom from '../models/chatroom.model.js';
import ChatMessage from '../models/chatmessage.model.js';

export default class ChatController {

    static async createChatRooom(req, res){
        if(!req.body.roomname){
            //roomname is null or undefined
            throw new HttpErrors.BadRequest();
        }
        const new_room = new ChatRoom({
            roomname: req.body.roomname,
            participants: [req.user._id],
            createTime: new Date()
        })
        await new_room.save();
        res.json({ status: 'success' });
    }

    static async joinChatRoom(req, res){
        req.body.
    }

    static async exitChatRoom(req, res){

    }

    static async getAllMessageByRoom(req, res){
        
    }

    static async sendMessage(req, res){

    }


}