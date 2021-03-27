/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';

import Clubs from '../db/schemas/club';
import { sendError, validateId } from '../utils/responseUtils';


const getClubs = async (req:Request, res:Response):Promise<void> => {
  const clubs = await Clubs.find().select({__v:0,});
  res.send(clubs);
};

const getClubById = async (req:Request, res:Response):Promise<void> => {
  try{
    const { clubId } = req.params;
    validateId(clubId);

    const club = await Clubs.findById(clubId).populate({
      path:'admin',
      select:{
        password:0,
        __v:0
      }
    }).select({__v:0});

    if(club){
      res.send(club);
    }else{
      res.status(404).send({});
    }
  }catch(e){
    sendError(res, e);
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
      organize_tournaments,
      //admin: 
    });
    res.send(newClub);
  }catch(e){
    sendError(res, e);
  }
};

const deleteClubById = async (req:Request, res:Response):Promise<void> =>{
  try{
    const {clubId} =req.params;
    validateId(clubId);

    const deleted = await Clubs.deleteOne({_id:clubId});

    if (deleted.deletedCount! > 0){
      res.send('Club eliminado');
    }else{
      res.status(404).send('Club no encontrado');
    }
  }catch(e){
    sendError(res, e);
  }
};

const updateClubById = async (req:Request, res:Response):Promise<void> =>{
  try{
    const clubId:string = req.params.clubId;
    validateId(clubId);

    const {name, owner, cuit, address, courts_quantity, reserves_in_app, organize_tournaments} =req.body;

    const updatedClub = await Clubs.findByIdAndUpdate(clubId ,
      {
        name,
        owner,
        cuit,
        address,
        courts_quantity,
        reserves_in_app,
        organize_tournaments
    });

    if(updatedClub){
      res.send(`Club ${clubId} successfully updated`);
    }else{
      res.status(404).send(`Club ${clubId} not found.`)
    }
  }catch(e){
    sendError(res, e);
  }
}

export {
    getClubs,
    getClubById,
    createClub,
    deleteClubById,
    updateClubById
}