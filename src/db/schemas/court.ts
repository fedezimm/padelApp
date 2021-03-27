import { Schema, model, Document, Types } from 'mongoose';
import { Club } from './club';

interface Court extends Document{
    court_number: number;
    name: string;
    address: string;
    wall: "blindex" | "pared";
    floor: "cemento" | "sintético";
    club: Types.ObjectId | Club
}

const schema = new Schema(
    {
        court_number: {type: Number, unique: true, required: true},
        name: {type: String, required: true},
        address: {type: String, required:false},
        wall: {type:String, required:true},
        floor: {type: String, required: true},
        club: {type: Schema.Types.ObjectId, ref:'club', required:true}
    });

const Courts = model<Court>('court',schema);

export default Courts;