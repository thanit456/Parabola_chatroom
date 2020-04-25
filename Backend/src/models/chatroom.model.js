import mongoose from 'mongoose';
const { Schema, ObjectId } = mongoose;

const ChatRoomSchema = new Schema({
	roomname: { type: String, required: [true, 'roomname cannot be blank'] },
	participants: [{
		userid: { 
			type: ObjectId, 
			ref: 'User'
		},
		nickname: { type: String }
	}],
	createTime: { type: Date, required: [true, 'required'] },
});

export default mongoose.model('ChatRoom', ChatRoomSchema);