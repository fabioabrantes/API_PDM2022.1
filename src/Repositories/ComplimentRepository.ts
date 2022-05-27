import {EntityRepository, Repository} from "typeorm";
import {Compliment} from '../entities/Compliment';
import {ComplimentRequest} from "../dto/ComplimentRequest";


@EntityRepository(Compliment)
class ComplimentRepository extends Repository<Compliment> {

    
  async createCompliment({message,tag_id,user_receiver,user_sender}:ComplimentRequest): Promise<Compliment>{
     const compliment =this.create({message,tag_id,user_receiver,user_sender});
      await this.save(compliment);
      return compliment;    
  }

}
export {ComplimentRepository}