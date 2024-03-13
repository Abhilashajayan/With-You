import { matchUsecases } from "../../usecases/match.usecase";

export class matchController {
    private readonly matchUsecase : matchUsecases;
    constructor(matchUsecase : matchUsecases){
        this.matchUsecase = matchUsecase;
    }
}