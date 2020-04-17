import mongoose from 'mongoose';
const { Schema, Document } = mongoose; 

const UserSchema = new Schema({
	username: { type: String, required: [true, 'email cannot be blank'], unique: true },
	password: { type: String, required: [true, 'password cannot be blank.'] },
	createTime: { type: Date, required: [true, 'required'] },
});

export default mongoose.model('User', UserSchema);
