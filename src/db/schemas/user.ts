import { Schema, model, Document } from 'mongoose';

 export interface User extends Document{
    email: string;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    padel_category: number;
}

const schema = new Schema(
    {
        email: {type: String, unique: true, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required:true},
        user_name: {type:String},
        password: {type: String, required: true},
        padel_category: {type: Number}
    });

const Users = model<User>('user',schema);

export default Users;