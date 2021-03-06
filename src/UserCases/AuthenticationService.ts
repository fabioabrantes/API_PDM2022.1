import {getCustomRepository} from "typeorm";
import {compare} from 'bcryptjs';
import {sign} from "jsonwebtoken";

import {UsersRepository} from '../Repositories/UsersRepository';

import { AppErros } from "../errors/AppErros";
import {IDataAuthenticate} from '../dto/IDataAuthenticate';

class AuthenticationService{
  
  async execute({email,password}:IDataAuthenticate): Promise<string>{
    const  usersRepository = getCustomRepository(UsersRepository);
    //verificar se email existe
    const user = await usersRepository.findByEmail(email);
    //console.log(user.email);

    if(!user){
      throw new AppErros("Email/password invalid",400);
    }

    // verificar se senha está correta
    const passwordCompared = await compare(password, user.password);
    if(!passwordCompared){
      throw new AppErros("Email/password invalid",400);
    }
    
    // gerar o token
    const token = sign(
      {
        email:user.email,
      },
       process.env.TOKEN_KEY
      ,
      { expiresIn: '1d', subject:user.id }
    );
    
    return token;
  }
}
export {AuthenticationService}