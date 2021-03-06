import {getCustomRepository} from "typeorm";
import {hash} from 'bcryptjs';

import {UsersRepository} from '../Repositories/UsersRepository';
import {User} from "../entities/User";
import { AppErros } from "../errors/AppErros";
import {UserRequest} from "../dto/UserRequest";

class CreateUserService{
  
  async execute({name, email, password,admin}:UserRequest): Promise<User>{

    const usersRepository = getCustomRepository(UsersRepository);

    if(!email){
      throw new AppErros('Email invalid!', 400);
    }

    const userUserExists = await usersRepository.findByEmail(email);
    if(userUserExists){
      throw new AppErros('User already exists!',400);
    }
    
    const passwordCripto = await hash(password,8);
    const user= await usersRepository.createUser({
      name, 
      email, 
      password:passwordCripto,
      admin
    });

    return user;

  }
}
export {CreateUserService}