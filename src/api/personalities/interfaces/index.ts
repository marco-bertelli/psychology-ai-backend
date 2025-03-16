import { Document } from 'mongoose';

export interface PersonalityDocument extends Document {
    name: string,
    maleScores: [Object],
    femaleScores: [Object],
}