import mongoose from 'mongoose';
const { Schema, ObjectId } = mongoose; 

const UserSchema = new Schema({
	username: { type: String, required: [true, 'email cannot be blank'], unique: true },
	password: { type: String, required: [true, 'password cannot be blank.'] },
	createTime: { type: Date, required: [true, 'required'] },
	chatRooms: [{
		id: { type: ObjectId, ref: 'ChatRoom', required: [true, 'required'] },
		lastActive: { type: Date }
	}],
});

export default mongoose.model('User', UserSchema);
