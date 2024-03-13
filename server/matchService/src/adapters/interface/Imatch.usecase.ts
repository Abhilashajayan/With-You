import { MatchEntity } from "../../entity/match.entity";

export interface ImatchUsecaes {
    getAllmatch(userData: MatchEntity):Promise<void>
}