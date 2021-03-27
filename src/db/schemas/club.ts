import { Schema, model, Document, Types } from 'mongoose';
//import { User } from './user';

export interface Club extends Document{
    name: string;
    owner: string;
    cuit: number;
    address: string;
    courts_quantity: number;
    reserves_in_app: boolean;
    organize_tournaments: boolean;
    //admin: Types.ObjectId | User
}

const schema = new Schema(
    {
        name: {type: String, unique: true, required: true},
        owner: {type: String, required: true},
        cuit: {type: Number},
        address: {type: String, required: true},
        courts_quantity: {type:Number, required: true},
        reserves_in_app: {type: Boolean, required: true},
        organize_tournaments: {type: Boolean}
        //admin: {type: Schema.Types.ObjectId, ref: 'user', required: true}
    });

const Clubs = model<Club>('club',schema);

export default Clubs;