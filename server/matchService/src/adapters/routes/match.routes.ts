import { Router, Request, Response } from "express";
import { matchController } from "../controllers/match.controller";
import { matchUsecases } from "../../usecases/match.usecase";
import { MatchRepository } from "../../framework/repositories/match.repo";
import { MatchModel } from "../../framework/models/match.model";
// import { Rabiitmq } from "../../frameworks/messageBroker/rabbitmq";


export class matchRouters {

  router = Router();
//   rabbitMq = new Rabiitmq();
  matchRepo = new MatchRepository(MatchModel);
  matchUsecase = new matchUsecases(this.matchRepo);
  matchController = new matchController(this.matchUsecase);

  constructor() {
  }
}

export const matchRouter = new matchRouters().router;