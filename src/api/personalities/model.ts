import { checkTemplatesBeforeDelete } from './middlewares';
import { PersonalityDocument } from './interfaces/index';
import { Schema, model } from 'mongoose';

const personalitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    maleScores: {
        type: [Object]
    },
    femaleScores: {
        type: [Object]
    }
});

personalitySchema.pre('remove', checkTemplatesBeforeDelete);

export const Personality = model<PersonalityDocument>('Personality', personalitySchema);