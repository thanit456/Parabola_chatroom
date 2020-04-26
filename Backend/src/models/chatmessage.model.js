import mongoose from 'mongoose';
const { Schema } = mongoose; 

const ChatMessageSchema = new Schema({
	chatroomId: { type: Schema.Types.ObjectId, required: [true, 'roomId required'] },
	userId: { type: Schema.Types.ObjectId, required: [true, 'sender cannot be blank']},
	username: { type: String, required: [true, 'username cannot be blank']},
	message: { type: String, required: [true, 'message cannot be blank.'] },
	timestamp: { type: Date, required: [true, 'required'], unique: true},
});
ChatMessageSchema.index({userId: 1, timestamp: 1});
export default mongoose.model('ChatMessage', ChatMessageSchema);