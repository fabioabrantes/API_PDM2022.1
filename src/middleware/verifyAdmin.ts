import {Request, Response, NextFunction} from "express";
import {getCustomRepository} from 'typeorm';
import {UsersRepository} from '../Repositories/UsersRepository';

export async function verifyAdmin( 
  request: Request,
  response:Response, 
  next:NextFunction
  ){
    const {user_id} = request;
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findUserById(user_id);
    if(user.admin){
      return next();
    }
    return response.status(401).json({message:"user is not Admin"})
  }