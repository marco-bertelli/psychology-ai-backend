import { Schema, model } from 'mongoose';
import { PersonalityDocument } from './interfaces/index';

const personalitySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

export const Personality = model<PersonalityDocument>('Personality', personalitySchema);