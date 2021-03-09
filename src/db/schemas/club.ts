import { Schema, model, Document } from 'mongoose';

interface Club extends Document{
    name: string;
    owner: string;
    cuit: number;
    address: string;
    courts_quantity: number;
    reserves_in_app: boolean;
    organize_tournaments: boolean;
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
    });

const Clubs = model<Club>('club',schema);

export default Clubs;