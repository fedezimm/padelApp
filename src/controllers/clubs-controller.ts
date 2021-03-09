import { Request, Response } from 'express';
import Clubs from '../db/schemas/club';
//import bcrypt from 'bcrypt';

const getClubs = async (req:Request, res:Response):Promise<void> => {
  const clubs = await Clubs.find();
  res.send(clubs);
};

const getClubById = async (req:Request, res:Response):Promise<void> => {
  const { clubId } = req.params;

  const club = await Clubs.findById(clubId);

  if(club){
    res.send(club);
  }else{
    res.status(404).send({});
  }
};

const createClub = async (req:Request, res:Response):Promise<void> =>{
  try{
    const {name, owner, cuit, address, courts_quantity, reserves_in_app, organize_tournaments} = req.body;
    const newClub = await Clubs.create({
      name,
      owner,
      cuit,
      address,
      courts_quantity,
      reserves_in_app,
      organize_tournaments
    });
    res.send(newClub);
  }catch(e){
    res.status(500).send(e.message)
  }
};

export {
    getClubs,
    getClubById,
    createClub
}