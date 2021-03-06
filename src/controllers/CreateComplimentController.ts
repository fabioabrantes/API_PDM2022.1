import {Request, Response} from 'express';
import {CreateComplimentService} from '../UserCases/CreateComplimentService';
import {ComplimentRequest} from "../dto/ComplimentRequest";


class CreateComplimentController{

  async handle(request: Request, response: Response):Promise<Response>{
    const {message,user_receiver,tag_id} = request.body as ComplimentRequest;
    const user_sender = request.user_id;
    
    const createComplimentService = new CreateComplimentService();
    const compliment = await createComplimentService.execute({
      message,
      user_sender,
      user_receiver,
      tag_id  
    });

    return response.status(201).json(compliment);
  }
}

export {CreateComplimentController}