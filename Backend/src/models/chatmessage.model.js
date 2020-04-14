import mongoose from 'mongoose';
const { Schema, Document } = mongoose; 

const ChatMessageSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, required: [true, 'group._id required'] },
    username: { type: String, required: [true, 'sender cannot be blank'], unique: true },
    message: { type: String, required: [true, 'message cannot be blank.'] },
    timeStamp: { type: Date, required: [true, 'required'] },
});

export default mongoose.model('ChatMessage', ChatMessageSchema);