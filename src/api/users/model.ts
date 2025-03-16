import { Schema, model } from 'mongoose';
import { UserDocument } from './interfaces/index';

import bcrypt from 'bcryptjs';

export const UserRolesEnum = {
    USER: 'user',
    ADMIN: 'admin',
    BOT: 'bot'
}

export const roles = Object.values(UserRolesEnum);

const UsersSchema = new Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        isOdinSensitive: true
    },
    surname: {
        type: String,
        isOdinSensitive: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    last_login: {
        // last real login
        type: Date
    },
    pre_last_login: {
        // last login showed to the user
        type: Date
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
    },
    age: {
        type: Number
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

UsersSchema.virtual('survey', {
    ref: 'UserSurvey',
    localField: '_id',
    foreignField: 'userId',
    justOne: true,
})

UsersSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    /* istanbul ignore next */
    const rounds = 9;

    bcrypt
        .hash(this.password, rounds)
        .then((hash: any) => {
            this.password = hash;
            next();
        })
        .catch(next);
});

UsersSchema.methods.authenticate = async function (password) {
    const user = await User.findById(this._id).select('password');

    if (!user) {
        return false;
    }

    const result = await bcrypt.compare(password, user.password);

    return result ? this : false;
};

const User = model<UserDocument>('User', UsersSchema);


export { User }