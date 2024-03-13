import { Model } from "mongoose";
import { MatchModel } from "../../framework/models/match.model";
import { IMatchSchema } from "../../adapters/interface/Imatch.Schema";
import { matchUsecases } from "../../usecases/match.usecase";
import { ImatchUsecaes } from "../../adapters/interface/Imatch.usecase";
import { MatchEntity } from "../../entity/match.entity";
import { Console } from "console";


export class MatchRepository implements ImatchUsecaes {
    private readonly MatchModel: Model<IMatchSchema>;
    // private readonly RabbitMq: Rabiitmq;
  
    constructor(matchModel: Model<IMatchSchema>) {
      this.MatchModel = matchModel;
    }

    async getAllmatch(userData: MatchEntity): Promise<void> {
        console.log("hello");
    }

}