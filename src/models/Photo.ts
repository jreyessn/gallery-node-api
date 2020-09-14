import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
	title: String,
	description: String,
	imagePath: String,
	imagePathComplete: String
})

interface IPhoto extends Document {
	title: string;
	description: string;
	imagePath: string;
	imagePathComplete: string;
}

export default model <IPhoto>('photos', schema)