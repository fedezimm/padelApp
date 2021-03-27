import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users, { User } from '../db/schemas/user';
import { sendError, validateId } from '../utils/responseUtils';
import Clubs from '../db/schemas/club';



const getUsers = async (req:Request, res:Response):Promise<void> => {
  const users = await Users.find().select({
    password:0,
    __v:0
  });
  res.send(users);
};

const getUserById = async (req:Request, res:Response):Promise<void> => {
  try{
    const { userId } = req.params;
    validateId(userId);

    const user = await Users.findById(userId).select({password:0, __v:0});

    if(user){
      res.send(user);
    }else{
      res.status(404).send({});
    }
  }catch(e){
    sendError(res, e)
  }
  
};

const createUser = async (req:Request, res:Response):Promise<void> =>{
  try{
    const {email, first_name, last_name, user_name, password, padel_category} = req.body;
    const hash:string = await bcrypt.hash(password,15);
    const newUser = await Users.create({
      email,
      first_name,
      last_name,
      user_name,
      password:hash,
      padel_category
    });
    res.send(newUser);
  }catch(e){
    sendError(res, e);
  }
};

const deleteUserById = async (req: Request, res:Response):Promise<void> =>{
  try{
    const {userId}  =req.params;
    validateId(userId);

    const user = await Users.findByIdAndDelete(userId);

    if(user){
      await Clubs.deleteMany({admin: user._id});
      res.send('Usuario eliminado y así también los clubes creados por él');
    }else{
      res.status(404).send({});
    }
  }catch(e){
    sendError(res, e);
  }
}

const updateUserById = async (req:Request, res:Response):Promise<void> => {
  try{
    const userId:string = req.params.userId;
    validateId(userId);
    const {email, first_name, last_name, user_name, password, padel_category} =req.body;
    
    const updatedUser = await Users.findOneAndUpdate(
      {
        _id:userId
      },
      {
        email: email,
        first_name,
        last_name,
        user_name,
        password,
        padel_category
      });
    if(updatedUser){
      res.send(`User ${userId} Succesfully Updated`);
    }else{
      res.status(404).send(`User ${userId} not Found`);
    }
  }catch(e){
    sendError(res, e);
  }
}

const login = async (req: Request, res:Response):Promise<void> => {
  try{
    const { email, password } = req.body;
    const user: User | null = await Users.findOne({ email });
    if(!user){
      throw { code: 404, message:'User not found' };
    }
    const isOK: boolean = await bcrypt.compare(password, user.password);
    if (!isOK) {
      throw {code:401, message:'Invalid Password'}
    }

    const expiresIn = 60 *60;
    const token:string = jwt.sign(
      {
        userId: user._id,
        email:user.email
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_SECRET!,
      {
        expiresIn:expiresIn
      }
    );

    res.send({token, expiresIn:expiresIn })
  }catch(e){
    sendError(res,e);
  }
}

export {
    getUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
    login
}