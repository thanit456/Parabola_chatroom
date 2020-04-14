import mongoose from 'mongoose';
const { Schema, Document } = mongoose; 
import ChatMessage from './chatmessage.model.js';

const ChatRoomSchema = new Schema({
    roomname: { type: String, required: [true, 'roomname cannot be blank'] },
    participants: [{ type: Schema.Types.ObjectId, required: [true, 'participant user._id required'], unique: true }],
    createTime: { type: Date, required: [true, 'required'] },
});

export default mongoose.model('ChatRoom', ChatRoomSchema);