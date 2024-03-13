import { MatchRepository } from "../framework/repositories/match.repo";
import { ImatchUsecaes } from "../adapters/interface/Imatch.usecase";
import { MatchEntity } from "../entity/match.entity";

export class matchUsecases implements ImatchUsecaes{
    constructor(private  matchRepository:MatchRepository){}

    async getAllmatch(userData: MatchEntity): Promise<void> {
        
    }
}