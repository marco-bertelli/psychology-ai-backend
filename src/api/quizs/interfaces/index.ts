import { Document } from 'mongoose';

export interface QuizsDocument extends Document {
    imageUrl: String,
    question: String,
    answers: [{
        id: String,
        text: String,
    }],
    correctAnswerId: String,
}